terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.31.0"
    }
  }
}

# Configuracion del provider AWS
# Se utiliza el provider de HashiCorp para provisionar recursos en AWS
# La version 5.31.0 es estable y compatible con los recursos de DynamoDB utilizados
provider "aws" {
  region = var.aws_region

  # Configuracion de credenciales mediante variables de entorno
  # Terraform automaticamente lee AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY
  # Tambien soporta AWS_PROFILE y AWS_CONFIG_FILE para perfiles nombrados
  skip_credentials_validation = false
  skip_requesting_account_id  = false
  skip_metadata_api_check     = true
}

# Configuracion de backend para persistir el estado de Terraform
# El estado se almacena en S3 para permitir colaboracion entre equipos
# y mantener el estado entre ejecuciones
terraform {
  backend "s3" {
    bucket         = "terraform-state-${var.project_name}"
    key            = "infra/dynamodb/terraform.tfstate"
    region         = var.aws_region
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}