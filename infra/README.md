# Modulo de Infraestructura DynamoDB

## Descripcion

Este modulo provisiona los recursos de AWS DynamoDB necesarios para gestionar ordenes en el sistema. Proporciona una tabla de DynamoDB optimizada para operaciones CRUD sobre ordenes, con soporte para indices secundarios que facilitan consultas por diferentes atributos.

## Recursos Provisionados

- **Tabla de Ordenes**: Almacena las ordenes con los siguientes atributos:
  - `order_id` (partition key): Identificador unico de la orden
  - `user_id`: Identificador del usuario que creo la orden
  - `status`: Estado actual de la orden (PENDING, PROCESSING, COMPLETED, CANCELLED)
  - `total_amount`: Monto total de la orden
  - `items`: Lista de productos incluidos en la orden
  - `created_at`: Timestamp de creacion
  - `updated_at`: Timestamp de ultima actualizacion

- **Indice secundario global**: Permite consultas por `user_id` y `status`
- **Tabla de bloqueos**: Gestiona el estado de Terraform para despliegues concurrentes

## Uso del Modulo

```hcl
module "dynamodb" {
  source = "./modules/dynamodb"

  project_name = "mi-proyecto"
  environment  = "dev"
  aws_region    = "us-east-1"

  table_name         = "orders"
  billing_mode       = "PAY_PER_REQUEST"
  hash_key           = "order_id"
  range_key          = "created_at"

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

  tags = {
    Environment = "dev"
    ManagedBy   = "terraform"
    Project     = "mi-proyecto"
  }
}
```

## Parametros Requeridos

| Variable            | Tipo       | Descripcion                                      |
|---------------------|------------|--------------------------------------------------|
| project_name        | string     | Nombre del proyecto para nomenclatura de recursos|
| environment         | string     | Entorno de despliegue (dev, staging, prod)      |
| aws_region          | string     | Region de AWS donde se aprovisionan recursos    |
| table_name          | string     | Nombre de la tabla DynamoDB                     |
| billing_mode        | string     | Modo de facturacion (PAY_PER_REQUEST o PROVISIONED)|
| hash_key            | string     | Clave de particion de la tabla                  |

## Parametros Opcionales

| Variable            | Tipo       | Valor por defecto | Descripcion                    |
|---------------------|------------|-------------------|--------------------------------|
| range_key           | string     | null              | Clave de ordenamiento          |
| read_capacity       | number     | 5                 | Capacidad de lectura (PROVISIONED)|
| write_capacity      | number     | 5                 | Capacidad de escritura (PROVISIONED)|
| ttl_enabled         | bool       | true              | Habilitar tiempo de vida       |
| ttl_attribute       | string     | "expires_at"     | Atributo para TTL              |
| enable_deletion_protection | bool | false         | Proteger contra eliminacion    |

## Validacion Local

Para validar la configuracion localmente:

```bash
# Inicializar Terraform
terraform init

# Validar sintaxis y configuracion
terraform validate

# Planificar cambios
terraform plan

# Aplicar cambios (solo en desarrollo)
terraform apply
```

## Consideraciones de Seguridad

- La tabla DynamoDB tiene encryption at-rest habilitado por defecto con AWS managed keys
- Para produccion se recomienda usar customer managed keys (CMK) de KMS
- Habilitar deletion_protection en entornos de produccion
- Los logs de CloudTrail deben estar habilitados para auditoria

## Outputs Exportados

- `table_name`: Nombre de la tabla creada
- `table_arn`: ARN de la tabla para permisos IAM
- `table_id`: ID unico de la tabla
- `table_stream_arn`: ARN del stream de DynamoDB (si esta habilitado)