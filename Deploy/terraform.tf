module "main" {
  source      = "./main"
  region      = "eu-central-1"
  domain = "cdv-project-pokemon.com"
}

terraform {
  backend "s3" {
    bucket = "cdv-project-tf"
    key    = "infrastructure-develop.tfstate"
    region = "eu-central-1"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.5.0"
    }
  }
}