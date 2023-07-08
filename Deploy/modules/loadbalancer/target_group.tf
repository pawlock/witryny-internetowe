resource "aws_lb_target_group" "lb" {
  name                 = var.name
  port                 = var.port
  protocol             = var.protocol
  vpc_id               = var.vpc_id
  target_type          = "ip"
  deregistration_delay = 300
  slow_start           = 0
  stickiness {
    enabled = true
    type    = "lb_cookie"
  }
}