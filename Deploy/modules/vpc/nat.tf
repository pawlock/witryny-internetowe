resource "aws_nat_gateway" "nat" {
  count         = length(var.public_cidrs)
  allocation_id = aws_eip.eip[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  depends_on    = [aws_internet_gateway.internet_gateway]

  tags = {
    Name = "cdv-project-pokemon-nat-${count.index}"
  }
}