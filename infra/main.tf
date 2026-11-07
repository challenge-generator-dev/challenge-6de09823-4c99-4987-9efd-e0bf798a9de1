# Configuracion principal de infraestructura para el sistema de ordenes
# Este archivo coordina los modulos y recursos necesarios para la capa de persistencia

# Modulo de DynamoDB para almacenamiento de ordenes
# Encapsula la creacion de la tabla y sus recursos asociados
module "dynamodb_orders" {
  source = "./modules/dynamodb"

  project_name = var.project_name
  environment  = var.environment
  aws_region    = var.aws_region

  # Configuracion de la tabla
  table_name         = "orders"
  billing_mode       = var.billing_mode
  hash_key           = "order_id"
  range_key          = "created_at"
  read_capacity      = var.dynamodb_read_capacity
  write_capacity     = var.dynamodb_write_capacity

  # Definicion de atributos para la tabla
  # DynamoDB requiere que los atributos se declaren explicitamente
  attributes = [
    {
      name = "order_id"
      type = "S"
    },
    {
      name = "user_id"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    },
    {
      name = "created_at"
      type = "N"
    }
  ]

  # Indices secundarios globales para consultas eficientes
  global_secondary_indexes = [
    {
      name            = "user_status_index"
      hash_key        = "user_id"
      range_key       = "status"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    },
    {
      name            = "status_created_index"
      hash_key        = "status"
      range_key       = "created_at"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]

  # Configuracion de Time-To-Live para limpieza automatica
  ttl_enabled    = true
  ttl_attribute  = "expires_at"

  # Habilitar streams para captura de cambios
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  # Proteccion contra eliminacion en produccion
  enable_deletion_protection = var.environment == "prod"

  tags = var.common_tags
}

# Recurso adicionales para tabla de locks de Terraform
# Esta tabla se usa para bloquear el estado de Terraform
# y prevenir ejecuciones concurrentes que podrian corromper el estado
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = merge(
    var.common_tags,
    {
      Description = "Tabla de bloqueos para estado de Terraform"
    }
  )
}

# Configuracion de SSM Parameter Store para parametros de la aplicacion
# Almacena configuracion sensible de forma segura
resource "aws_ssm_parameter" "dynamodb_endpoint" {
  name  = "/${var.project_name}/${var.environment}/dynamodb/endpoint"
  type  = "String"
  value = "https://dynamodb.${var.aws_region}.amazonaws.com"

  tags = var.common_tags
}

resource "aws_ssm_parameter" "table_names" {
  name  = "/${var.project_name}/${var.environment}/dynamodb/table_names"
  type  = "String"
  value = jsonencode({
    orders = module.dynamodb_orders.table_name
  })

  tags = var.common_tags
}

# Configuracion de IAM para acceso a DynamoDB
# El rol de la aplicacion necesitara permisos para operar sobre la tabla
resource "aws_iam_role" "app_dynamodb_access" {
  name = "${var.project_name}-${var.environment}-dynamodb-access"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = var.common_tags
}

resource "aws_iam_role_policy" "dynamodb_full_access" {
  name = "${var.project_name}-${var.environment}-dynamodb-policy"
  role = aws_iam_role.app_dynamodb_access.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          module.dynamodb_orders.table_arn,
          "${module.dynamodb_orders.table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:GetItem",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.terraform_locks.arn
      }
    ]
  })
}

# Output que expone los valores necesarios para otras partes de la infraestructura
output "dynamodb_config" {
  description = "Configuracion de DynamoDB para la aplicacion"
  value = {
    table_name       = module.dynamodb_orders.table_name
    table_arn        = module.dynamodb_orders.table_arn
    table_endpoint   = "https://dynamodb.${var.aws_region}.amazonaws.com"
    region           = var.aws_region
    iam_role_arn     = aws_iam_role.app_dynamodb_access.arn
  }
}

output "ssm_parameters" {
  description = "Parametros de SSM para la aplicacion"
  value = {
    dynamodb_endpoint = aws_ssm_parameter.dynamodb_endpoint.name
    table_names       = aws_ssm_parameter.table_names.name
  }
}