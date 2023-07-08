variable "vpc_cidr_block" {
  type    = string
  default = "10.0.0.0/16"
}

variable "private_cidrs" {
  type    = list(string)
  default = ["10.0.100.0/22", "10.0.104.0/22", "10.0.108.0/22"]
}

variable "public_cidrs" {
  type    = list(string)
  default = ["10.0.200.0/22", "10.0.204.0/22", "10.0.208.0/22"]
}

variable "domain_name_servers" {
  type    = list(string)
  default = ["169.254.169.253"]
}