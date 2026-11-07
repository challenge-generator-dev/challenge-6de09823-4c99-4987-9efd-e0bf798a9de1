output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.name
}

output "table_arn" {
  description = "ARN completo de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.arn
}

output "table_id" {
  description = "ID único de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.id
}

output "table_status" {
  description = "Estado actual de la tabla (ACTIVE, CREATING, DELETING, etc.)"
  value       = aws_dynamodb_table.this.status
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB Streams si está habilitado"
  value       = aws_dynamodb_table.this.stream_arn
  depends_on = [aws_dynamodb_table.this]
}

output "table_stream_label" {
  description = "Etiqueta del stream más reciente"
  value       = aws_dynamodb_table.this.stream_label
  depends_on = [aws_dynamodb_table.this]
}

output "table_size_bytes" {
  description = "Tamaño de la tabla en bytes"
  value       = aws_dynamodb_table.this.table_size_bytes
}

output "item_count" {
  description = "Número de elementos en la tabla"
  value       = aws_dynamodb_table.this.item_count
}

output "billing_mode" {
  description = "Modo de facturación de la tabla (PROVISIONED o PAY_PER_REQUEST)"
  value       = aws_dynamodb_table.this.billing_mode
}

output "hash_key_attribute_name" {
  description = "Nombre del atributo de clave de partición"
  value       = aws_dynamodb_table.this.hash_key
}

output "range_key_attribute_name" {
  description = "Nombre del atributo de clave de ordenamiento"
  value       = aws_dynamodb_table.this.range_key
}

output "global_secondary_indexes" {
  description = "Mapa de índices secundarios globales con sus configuraciones"
  value       = { for gsi in aws_dynamodb_table.this.global_secondary_indexes : gsi.name => gsi }
}

output "local_secondary_indexes" {
  description = "Mapa de índices secundarios locales con sus configuraciones"
  value       = { for lsi in aws_dynamodb_table.this.local_secondary_indexes : lsi.name => lsi }
}

output "read_capacity" {
  description = "Capacidad de lectura aprovisionada (solo si billing_mode es PROVISIONED)"
  value       = try(aws_dynamodb_table.this.read_capacity, null)
}

output "write_capacity" {
  description = "Capacidad de escritura aprovisionada (solo si billing_mode es PROVISIONED)"
  value       = try(aws_dynamodb_table.this.write_capacity, null)
}

output "point_in_time_recovery_enabled" {
  description = "Indica si la recuperación point-in-time está habilitada"
  value       = aws_dynamodb_table.this.point_in_time_recovery.0.enabled
}

output "server_side_encryption_enabled" {
  description = "Indica si el cifrado del lado del servidor está habilitado"
  value       = aws_dynamodb_table.this.server_side_encryption.0.enabled
}

output "server_side_encryption_kms_key_arn" {
  description = "ARN de la clave KMS utilizada para el cifrado"
  value       = try(aws_dynamodb_table.this.server_side_encryption.0.kms_key_arn, null)
}

output "ttl_enabled" {
  description = "Indica si TTL está habilitado"
  value       = aws_dynamodb_table.this.ttl.0.enabled
}

output "ttl_attribute_name" {
  description = "Nombre del atributo TTL"
  value       = try(aws_dynamodb_table.this.ttl.0.attribute_name, null)
}

output "autoscaling_read_target_arn" {
  description = "ARN del target de autoescalado de lectura"
  value       = try(aws_appautoscaling_target.table_read_target[0].arn, null)
}

output "autoscaling_write_target_arn" {
  description = "ARN del target de autoescalado de escritura"
  value       = try(aws_appautoscaling_target.table_write_target[0].arn, null)
}

output "read_throttle_alarm_arn" {
  description = "ARN de la alarma de throttling de lectura"
  value       = try(aws_cloudwatch_metric_alarm.read_throttle[0].arn, null)
}

output "write_throttle_alarm_arn" {
  description = "ARN de la alarma de throttling de escritura"
  value       = try(aws_cloudwatch_metric_alarm.write_throttle[0].arn, null)
}

output "user_errors_alarm_arn" {
  description = "ARN de la alarma de errores de usuario"
  value       = try(aws_cloudwatch_metric_alarm.user_errors[0].arn, null)
}

output "resource_policy" {
  description = "Política de recursos aplicada a la tabla"
  value       = try(aws_dynamodb_resource_policy.this[0].policy, null)
}

output "kms_grant_arn" {
  description = "ARN del grant de KMS"
  value       = try(aws_kms_grant.table_grant[0].id, null)
}

output "tags" {
  description = "Etiquetas aplicadas a la tabla"
  value       = aws_dynamodb_table.this.tags
}

output "tags_all" {
  description = "Todas las etiquetas aplicadas a la tabla incluyendo las gestionadas por Terraform"
  value       = aws_dynamodb_table.this.tags_all
}