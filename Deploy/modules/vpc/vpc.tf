resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr_block #"10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "cdv-project-pokemon-vpc"
  }
}

resource "aws_main_route_table_association" "default_routing_rt" {
  vpc_id         = aws_vpc.vpc.id
  route_table_id = aws_route_table.private[0].id
}
