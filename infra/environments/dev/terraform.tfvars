# Configuración de variables de entorno para desarrollo
# Este archivo define los valores específicos del entorno de desarrollo
# IMPORTANTE: No incluir valores sensibles ni secretos en este archivo
# Las credenciales deben gestionarse a través de variables de entorno o AWS Vault

environment = "dev"

aws_region = "us-east-1"

# Configuración de la tabla de DynamoDB
table_name                 = "orders"
table_class                = "STANDARD"
enable_deletion_protection = false

# Capacidad de lectura y escritura (entorno de desarrollo - costos reducidos)
read_capacity  = 5
write_capacity = 5

# Habilitar características avanzadas
enable_dynamodb_streams         = true
enable_server_side_encryption   = true
enable_point_in_time_recovery   = false
enable_replication              = false
enable_audit_logging            = false

# Configuración de réplicas (vacío en desarrollo)
replica_regions = []

# Configuración de red y acceso
vpc_id             = "vpc-dev-default"
subnet_ids         = ["subnet-dev-1a", "subnet-dev-1b"]
allowed_cidr_blocks = ["10.0.0.0/16"]

# Etiquetas para identificación y costeo
cost_allocation_tag = "environment:dev"

# Aplicaciones conectadas a esta tabla
connected_applications = ["orders-api-dev", "orders-frontend-dev"]

# Política de acceso a la tabla
table_policy = "read-write"

# Configuración de logs
log_level               = "INFO"
log_retention_days      = 7
enable_access_logging   = true

# Configuración de backup
backup_schedule    = "cron(0 12 ? * * *)"
backup_retention_days = 30

# Configuración de alertas
enable_alerts           = true
alert_email             = "devops-dev@empresa.com"
alert_threshold_read    = 80
alert_threshold_write   = 80
alert_threshold_throttle = 10

# Configuración de escalado automático
enable_autoscaling     = true
min_read_capacity      = 5
max_read_capacity      = 100
target_utilization_read = 70
min_write_capacity     = 5
max_write_capacity     = 100
target_utilization_write = 70

# Configuración de TTL
enable_ttl                    = false
ttl_attribute_name            = "expiresAt"
ttl_delete_after_days         = 90

# Configuración de índices secundarios
secondary_indexes = {
  "by-customer" = {
    partition_key = "customerId"
    sort_key      = "createdAt"
    projection_type = "ALL"
  },
  "by-status" = {
    partition_key = "status"
    sort_key      = "updatedAt"
    projection_type = "KEYS_ONLY"
  }
}

# Configuración de import/export
import_enabled  = false
export_enabled  = true
export_s3_bucket = "exports-dev-empresa"
export_s3_prefix = "orders/"

# Configuración de caching
enable_dax                      = false
dax_node_type                   = "dax.t2.small"
dax_node_count                  = 2

# Configuración de características avanzadas
gsi_on_demand_billing      = true
lsi_on_demand_billing       = true
enable_orphaned_file_cleanup = false

# Configuración de recuperación ante desastres
dr_region                 = "us-west-2"
dr_replication_factor     = 1
dr_failover_enabled       = false

# Configuración de retención de datos
data_retention_days       = 365
archive_enabled           = false
archive_s3_bucket         = "archive-dev-empresa"
archive_after_days        = 90

# Configuración de notificaciones
enable_notifications      = true
notification_topic_arn    = "arn:aws:sns:us-east-1:123456789012:orders-dev-topic"
notification_event_types  = ["INSERT", "MODIFY", "REMOVE"]

# Configuración de etiquetas personalizadas
custom_tags = {
  Environment     = "development"
  ManagedBy       = "terraform"
  Project         = "orders-system"
  CostCenter      = "engineering"
  DataClassification = "internal"
  Compliance      = "SOC2"
  Owner           = "platform-team"
  SupportContact  = "devops@empresa.com"
}

# Configuración de monitoreo
enable_detailed_monitoring = true
metrics_collection_interval = 60
enable_contributor_insights = true
contributor_insights_view_name = "orders-dev-insights"

# Configuración de pruebas y desarrollo
enable_test_mode             = false
test_data_seed_enabled       = true
test_data_sample_count       = 100

# Configuración de rendimiento
performance_mode            = "AUTO"
enable_enhanced_diagnostics  = false
diagnostics_retention_days   = 7