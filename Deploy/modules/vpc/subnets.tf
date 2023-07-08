resource "aws_subnet" "private" {
  count             = length(var.private_cidrs)
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.private_cidrs[count.index] #["10.0.100.0/22", "10.0.104.0/22", "10.0.108.0/22"]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = {
    Name = "cdv-project-pokemon-subnet-private-${count.index}"
  }
}

resource "aws_subnet" "public" {
  count             = length(var.public_cidrs)
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.public_cidrs[count.index] #["10.0.200.0/22", "10.0.204.0/22", "10.0.208.0/22"]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = {
    Name = "cdv-project-pokemon-subnet-public-${count.index}"
  }
}