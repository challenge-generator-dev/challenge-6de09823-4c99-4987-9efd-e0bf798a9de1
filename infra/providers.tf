# Configuración de providers para Terraform
# Este archivo declara los proveedores necesarios para desplegar la infraestructura
# en AWS, asegurando que las versiones sean compatibles y estables.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.31.0"
    }
  }
  
  # Configuración de backend remoto para estado compartido
  # Se recomienda usar Terraform Cloud o S3 + DynamoDB para bloqueo
  backend "s3" {
    bucket         = "tf-state-bucket-orders-app"
    key            = "orders-app/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "tf-state-lock-orders-app"
  }
}

# Configuración del provider AWS
# Las credenciales se obtienen del entorno o de AWS credentials file
provider "aws" {
  region = var.aws_region
  
  # Configuración para evitar throttling en operaciones de DynamoDB
  default_tags {
    tags = {
      Environment = var.environment
      Application = "OrdersApp"
      Terraform   = "true"
    }
  }
}

# Configuración adicional para servicios específicos
# Optimización para DynamoDB
provider "aws" {
  alias = "dynamodb"
  region = var.aws_region
  
  default_tags {
    tags = {
      Service = "DynamoDB"
    }
  }
}