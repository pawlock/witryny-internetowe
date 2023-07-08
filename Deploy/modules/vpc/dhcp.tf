resource "aws_vpc_dhcp_options" "amazon_dns" {
  domain_name_servers = var.domain_name_servers #["169.254.169.253"]
}

resource "aws_vpc_dhcp_options_association" "amazon_dns" {
  vpc_id          = aws_vpc.vpc.id
  dhcp_options_id = aws_vpc_dhcp_options.amazon_dns.id
}