# Outputs de la infraestructura de DynamoDB para gestión de órdenes
# Expone los atributos necesarios para que las aplicaciones consuman la tabla

output "dynamodb_table_name" {
  description = "Nombre de la tabla de DynamoDB para órdenes"
  value       = module.dynamodb.orders_table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla de DynamoDB para órdenes"
  value       = module.dynamodb.orders_table_arn
}

output "dynamodb_table_id" {
  description = "ID de la tabla de DynamoDB para órdenes"
  value       = module.dynamodb.orders_table_id
}

output "dynamodb_table_status" {
  description = "Estado actual de la tabla de DynamoDB"
  value       = module.dynamodb.orders_table_status
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de DynamoDB para captura de cambios"
  value       = module.dynamodb.orders_table_stream_arn
}

output "dynamodb_table_stream_label" {
  description = "Etiqueta del stream de DynamoDB"
  value       = module.dynamodb.orders_table_stream_label
}

output "dynamodb_region" {
  description = "Región donde está desplegada la tabla de DynamoDB"
  value       = var.aws_region
}

output "dynamodb_endpoint" {
  description = "Endpoint de DynamoDB para conexiones directas"
  value       = "dynamodb.${var.aws_region}.amazonaws.com"
}

output "dynamodb_indexes" {
  description = "Índices secundarios de la tabla de órdenes"
  value       = module.dynamodb.orders_table_indexes
}

output "dynamodb_tags" {
  description = "Tags aplicados a la tabla de DynamoDB"
  value       = module.dynamodb.orders_table_tags
}

output "dynamodb_server_side_encryption" {
  description = "Configuración de cifrado del lado del servidor"
  value       = module.dynamodb.orders_table_server_side_encryption
}

output "dynamodb_point_in_time_recovery" {
  description = "Configuración de recuperación a punto en el tiempo"
  value       = module.dynamodb.orders_table_point_in_time_recovery
}

output "dynamodb_ttl_enabled" {
  description = "Indicador de si TTL está habilitado para la tabla"
  value       = module.dynamodb.orders_table_ttl_enabled
}

output "dynamodb_billing_mode" {
  description = "Modo de facturación de la tabla (PROVISIONED o PAY_PER_REQUEST)"
  value       = module.dynamodb.orders_table_billing_mode
}

output "dynamodb_read_capacity" {
  description = "Capacidad de lectura aprovisionada"
  value       = module.dynamodb.orders_table_read_capacity
}

output "dynamodb_write_capacity" {
  description = "Capacidad de escritura aprovisionada"
  value       = module.dynamodb.orders_table_write_capacity
}

output "environment" {
  description = "Nombre del entorno donde está desplegada la infraestructura"
  value       = var.environment
}

output "dynamodb_table_stream_enabled" {
  description = "Indica si el stream de DynamoDB está habilitado"
  value       = var.enable_dynamodb_streams
}

output "dynamodb_kms_key_arn" {
  description = "ARN de la clave KMS usada para cifrado"
  value       = var.enable_server_side_encryption ? module.dynamodb.orders_table_kms_key_arn : null
}

output "dynamodb_fully_qualified_table_name" {
  description = "Nombre completo de la tabla incluyendo prefijo de entorno"
  value       = "${var.environment}-${var.table_name}"
}

output "dynamodb_table_items_count" {
  description = "Número de elementos en la tabla (solo disponible si hay datos)"
  value       = module.dynamodb.orders_table_items_count
  sensitive   = false
}

output "dynamodb_table_size_bytes" {
  description = "Tamaño de la tabla en bytes (solo disponible si hay datos)"
  value       = module.dynamodb.orders_table_size_bytes
  sensitive   = false
}

output "dynamodb_table_creation_date" {
  description = "Fecha de creación de la tabla"
  value       = module.dynamodb.orders_table_creation_date
}

output "dynamodb_table_restore_summary" {
  description = "Resumen de restauración si la tabla fue restaurada"
  value       = module.dynamodb.orders_table_restore_summary
}

output "dynamodb_table_latest_stream_arn" {
  description = "ARN del stream más reciente"
  value       = module.dynamodb.orders_table_latest_stream_arn
}

output "dynamodb_table_replica_summaries" {
  description = "Resumen de réplicas para tablas globales"
  value       = module.dynamodb.orders_table_replica_summaries
}

output "dynamodb_connected_applications" {
  description = "Lista de aplicaciones que consumen esta tabla"
  value       = var.connected_applications
}

output "dynamodb_access_policy" {
  description = "Política de acceso a la tabla"
  value       = var.table_policy
}

output "dynamodb_backup_enabled" {
  description = "Indica si los backups automáticos están habilitados"
  value       = var.enable_point_in_time_recovery
}

output "dynamodb_disaster_recovery_type" {
  description = "Tipo de recuperación ante desastres configurado"
  value       = var.enable_point_in_time_recovery ? "PITR" : "NONE"
}

output "dynamodb_table_class" {
  description = "Clase de almacenamiento de la tabla"
  value       = var.table_class
}

output "dynamodb_table_deletion_protection" {
  description = "Indica si la protección contra eliminación está habilitada"
  value       = var.enable_deletion_protection
}

output "dynamodb_replication_enabled" {
  description = "Indica si la replicación entre regiones está habilitada"
  value       = var.enable_replication
}

output "dynamodb_replica_regions" {
  description = "Regiones configuradas para replicación"
  value       = var.replica_regions
}

output "dynamodb_audit_logging" {
  description = "Indica si el logging de auditoría está habilitado"
  value       = var.enable_audit_logging
}

output "dynamodb_cost_allocation_tag" {
  description = "Tag de asignación de costos"
  value       = var.cost_allocation_tag
}