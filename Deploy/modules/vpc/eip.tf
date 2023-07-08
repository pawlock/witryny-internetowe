resource "aws_eip" "eip" {
  count = length(var.public_cidrs)
  vpc   = true
}