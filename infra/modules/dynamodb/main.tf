resource "aws_dynamodb_table" "this" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.hash_key_attribute_name
  range_key      = var.range_key_attribute_name != null ? var.range_key_attribute_name : null
  stream_enabled = var.enable_streams
  stream_view_type = var.enable_streams ? var.stream_view_type : null

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = global_secondary_index.value.range_key != null ? global_secondary_index.value.range_key : null
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = global_secondary_index.value.read_capacity
      write_capacity  = global_secondary_index.value.write_capacity
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.local_secondary_indexes
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = local_secondary_index.value.projection_type
    }
  }

  point_in_time_recovery {
    enabled = var.enable_pit_recovery
  }

  server_side_encryption {
    enabled     = var.enable_encryption
    kms_key_arn = var.kms_key_arn
  }

  ttl {
    enabled        = var.enable_ttl
    attribute_name = var.ttl_attribute_name
  }

  tags = merge(
    var.tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "Project"     = var.project
      "ManagedBy"   = "terraform"
    }
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_item" "seed_data" {
  for_each = var.seed_items != null ? { for item in var.seed_items : item[var.hash_key_attribute_name] => item } : {}

  table_name = aws_dynamodb_table.this.name
  hash_key   = each.value[var.hash_key_attribute_name]

  dynamic "range_key" {
    for_each = var.range_key_attribute_name != null ? [each.value[var.range_key_attribute_name]] : []
    content {
      S = range_key.value
    }
  }

  item = jsonencode(each.value)
}

resource "aws_appautoscaling_target" "table_read_target" {
  count = var.enable_autoscaling && var.read_autoscaling_enabled ? 1 : 0

  service_namespace  = "dynamodb"
  resource_id        = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  min_capacity       = var.read_min_capacity
  max_capacity       = var.read_max_capacity
}

resource "aws_appautoscaling_policy" "table_read_policy" {
  count = var.enable_autoscaling && var.read_autoscaling_enabled ? 1 : 0

  name                   = "${var.table_name}-read-scaling"
  service_namespace      = "dynamodb"
  resource_id            = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension     = "dynamodb:table:ReadCapacityUnits"
  policy_type            = "TargetTrackingScaling"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }

    target_value       = var.read_target_value
    scale_in_cooldown  = var.scale_in_cooldown
    scale_out_cooldown = var.scale_out_cooldown
  }
}

resource "aws_appautoscaling_target" "table_write_target" {
  count = var.enable_autoscaling && var.write_autoscaling_enabled ? 1 : 0

  service_namespace  = "dynamodb"
  resource_id        = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  min_capacity       = var.write_min_capacity
  max_capacity       = var.write_max_capacity
}

resource "aws_appautoscaling_policy" "table_write_policy" {
  count = var.enable_autoscaling && var.write_autoscaling_enabled ? 1 : 0

  name                   = "${var.table_name}-write-scaling"
  service_namespace      = "dynamodb"
  resource_id            = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension     = "dynamodb:table:WriteCapacityUnits"
  policy_type            = "TargetTrackingScaling"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }

    target_value       = var.write_target_value
    scale_in_cooldown  = var.scale_in_cooldown
    scale_out_cooldown = var.scale_out_cooldown
  }
}

resource "aws_dynamodb_resource_policy" "this" {
  count = var.resource_policy != null ? 1 : 0

  table_name = aws_dynamodb_table.this.name
  policy     = var.resource_policy
}

resource "aws_kms_grant" "table_grant" {
  count = var.kms_key_arn != null ? 1 : 0

  name             = "dynamodb-table-${var.table_name}-grant"
  key_arn          = var.kms_key_arn
  grantee_principal = var.kms_grantee_principal
  operations       = ["Encrypt", "Decrypt", "ReEncryptFrom", "GenerateDataKey"]
}

resource "aws_cloudwatch_metric_alarm" "read_throttle" {
  count = var.enable_monitoring && var.read_throttle_alarm_threshold > 0 ? 1 : 0

  alarm_name          = "${var.table_name}-read-throttle"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.alarm_evaluation_periods
  metric_name         = "ReadThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = var.alarm_period
  statistic           = "Sum"
  threshold           = var.read_throttle_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB read throttle events for ${var.table_name}"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

resource "aws_cloudwatch_metric_alarm" "write_throttle" {
  count = var.enable_monitoring && var.write_throttle_alarm_threshold > 0 ? 1 : 0

  alarm_name          = "${var.table_name}-write-throttle"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.alarm_evaluation_periods
  metric_name         = "WriteThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = var.alarm_period
  statistic           = "Sum"
  threshold           = var.write_throttle_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB write throttle events for ${var.table_name}"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

resource "aws_cloudwatch_metric_alarm" "user_errors" {
  count = var.enable_monitoring && var.user_errors_alarm_threshold > 0 ? 1 : 0

  alarm_name          = "${var.table_name}-user-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.alarm_evaluation_periods
  metric_name         = "UserErrors"
  namespace           = "AWS/DynamoDB"
  period              = var.alarm_period
  statistic           = "Sum"
  threshold           = var.user_errors_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB user errors for ${var.table_name}"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}