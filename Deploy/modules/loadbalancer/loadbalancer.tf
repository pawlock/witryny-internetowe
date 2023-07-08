resource "aws_lb" "lb" {
  name               = "${var.name}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.security_group_id]
  subnets            = var.subnet_public_ids
  enable_http2       = true
}