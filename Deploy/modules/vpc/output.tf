output "subnet_public_ids" {
  value = aws_subnet.public.*.id
}
output "subnet_private_ids" {
  value = aws_subnet.private.*.id
}

output "vpc_id" { value = aws_vpc.vpc.id }
output "vpc_cidr_block" { value = aws_vpc.vpc.cidr_block }

