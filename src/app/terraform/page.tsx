'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Cloud, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function TerraformCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-600">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Terraform Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Infrastructure as Code</p>
            </div>
          </div>
          <PDFDownload title="Terraform" sheetId="terraform" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Komutlar</h2>

          <CodeBlock
            language="bash"
            title="CLI Komutlari"
            code={`# Initialize
terraform init

# Format
terraform fmt

# Validate
terraform validate

# Plan
terraform plan
terraform plan -out=plan.tfplan

# Apply
terraform apply
terraform apply plan.tfplan
terraform apply -auto-approve

# Destroy
terraform destroy
terraform destroy -auto-approve

# State
terraform state list
terraform state show aws_instance.example
terraform state mv
terraform state rm

# Output
terraform output
terraform output -json

# Workspace
terraform workspace list
terraform workspace new dev
terraform workspace select prod`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Yapilar</h2>

          <CodeBlock
            title="Provider ve Resource"
            code={`# Provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

# Resource
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }
}

# Data source
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Variables</h2>

          <CodeBlock
            title="Variable Tanimlama"
            code={`# variables.tf
variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "tags" {
  type = map(string)
  default = {
    Environment = "dev"
    Project     = "myproject"
  }
}

variable "availability_zones" {
  type    = list(string)
  default = ["eu-west-1a", "eu-west-1b"]
}

# Kullanim
resource "aws_instance" "web" {
  instance_type = var.instance_type
  tags          = var.tags
}

# terraform.tfvars
region        = "eu-west-1"
instance_type = "t2.small"
environment   = "prod"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Outputs</h2>

          <CodeBlock
            title="Output Tanimlama"
            code={`output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.web.id
}

output "instance_ip" {
  description = "Public IP"
  value       = aws_instance.web.public_ip
}

output "instance_dns" {
  value     = aws_instance.web.public_dns
  sensitive = true
}

# Multiple instances
output "instance_ids" {
  value = aws_instance.web[*].id
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Locals</h2>

          <CodeBlock
            title="Local Values"
            code={`locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }

  name_prefix = "\${var.project_name}-\${var.environment}"
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  tags = merge(local.common_tags, {
    Name = "\${local.name_prefix}-web"
  })
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Count ve For Each</h2>

          <CodeBlock
            title="Multiple Resources"
            code={`# Count
resource "aws_instance" "web" {
  count         = 3
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  tags = {
    Name = "web-\${count.index}"
  }
}

# For each (map)
variable "instances" {
  default = {
    web  = "t2.micro"
    api  = "t2.small"
    db   = "t2.medium"
  }
}

resource "aws_instance" "servers" {
  for_each      = var.instances
  ami           = data.aws_ami.ubuntu.id
  instance_type = each.value

  tags = {
    Name = each.key
  }
}

# For each (set)
resource "aws_iam_user" "users" {
  for_each = toset(["alice", "bob", "charlie"])
  name     = each.key
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Modules</h2>

          <CodeBlock
            title="Module Kullanimi"
            code={`# Module cagirma
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
}

# Local module
module "webserver" {
  source = "./modules/webserver"

  instance_type = "t2.micro"
  vpc_id        = module.vpc.vpc_id
  subnet_id     = module.vpc.public_subnets[0]
}

# Module output kullanimi
output "vpc_id" {
  value = module.vpc.vpc_id
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Conditional ve Dynamic</h2>

          <CodeBlock
            title="Conditional Expression"
            code={`# Ternary
resource "aws_instance" "web" {
  instance_type = var.environment == "prod" ? "t2.large" : "t2.micro"
}

# Count conditional
resource "aws_eip" "web" {
  count    = var.create_eip ? 1 : 0
  instance = aws_instance.web.id
}

# Dynamic blocks
resource "aws_security_group" "web" {
  name = "web-sg"

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Backend</h2>

          <CodeBlock
            title="Remote State"
            code={`terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}

# Remote state data source
data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    bucket = "my-terraform-state"
    key    = "vpc/terraform.tfstate"
    region = "eu-west-1"
  }
}

# Kullanim
resource "aws_instance" "web" {
  subnet_id = data.terraform_remote_state.vpc.outputs.subnet_id
}`}
          />
        </section>
      </div>
    </div>
  )
}
