# Variables para el módulo DynamoDB
# Este archivo define los parámetros configurables para crear una tabla DynamoDB
# con características específicas para el manejo de órdenes

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
  
  validation {
    condition     = length(var.table_name) > 3 && length(var.table_name) <= 255
    error_message = "El nombre de la tabla debe tener entre 4 y 255 caracteres."
  }
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB"
  type        = string
  default     = "PAY_PER_REQUEST"
  
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
  
  validation {
    condition     = var.read_capacity >= 1 && var.read_capacity <= 10000
    error_message = "La capacidad de lectura debe estar entre 1 y 10000."
  }
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
  
  validation {
    condition     = var.write_capacity >= 1 && var.write_capacity <= 10000
    error_message = "La capacidad de escritura debe estar entre 1 y 10000."
  }
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla"
  type        = string
  default     = "orderId"
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla (opcional)"
  type        = string
  default     = null
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "orderId"
      type = "S"
    }
  ]
  
  validation {
    condition     = alltrue([for attr in var.attributes : contains(["S", "N", "B"], attr.type)])
    error_message = "El tipo de atributo debe ser S (String), N (Number) o B (Binary)."
  }
}

variable "ttl_attribute" {
  description = "Atributo para Time To Live (opcional)"
  type        = string
  default     = null
}

variable "enable_streams" {
  description = "Habilitar streams para capturar cambios en la tabla"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista para el stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null
  
  validation {
    condition     = var.stream_view_type == null || contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista del stream debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    projection_type = string
    read_capacity   = optional(number)
    write_capacity  = optional(number)
  }))
  default = []
  
  validation {
    condition = alltrue([
      for gsi in var.global_secondary_indexes : contains(["KEYS_ONLY", "INCLUDE", "ALL"], gsi.projection_type)
    ])
    error_message = "El projection_type debe ser KEYS_ONLY, INCLUDE o ALL."
  }
}

variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de los siguientes: dev, staging, prod."
  }
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación de punto en el tiempo para la tabla"
  type        = bool
  default     = true
}

variable "server_side_encryption" {
  description = "Habilitar cifrado del lado del servidor"
  type        = bool
  default     = true
}

variable "deletion_protection_enabled" {
  description = "Habilitar protección contra eliminación accidental"
  type        = bool
  default     = true
}