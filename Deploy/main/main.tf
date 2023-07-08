provider "aws" {
  region = var.region
}

module "vpc" {
  source = "../modules/vpc"

  environment = var.environment
  project     = var.project

  vpc_cidr_block      = "10.0.0.0/16"
  private_cidrs       = ["10.0.100.0/22", "10.0.104.0/22"]
  public_cidrs        = ["10.0.200.0/22", "10.0.204.0/22"]
  domain_name_servers = ["169.254.169.253"]
}

module "loadbalancer" {
  source = "../modules/loadbalancer"

  name              = "cdv-project-pokemon-lb"
  certificate_arn   = module.route53.certificate_arn
  port              = 443
  protocol          = "HTTPS"

  vpc_id            = module.vpc.vpc_id
  security_group_id = aws_security_group.alb.id
  subnet_public_ids = module.vpc.subnet_public_ids
}

module "route53" {
  domain_name       = var.domain
  target_zone_id    = module.loadbalancer.zone_id
  target_dns_name   = module.loadbalancer.dns_name
}

module "ecs" {
    
}
