resource "aws_ecs_service" "ecs_service" {
  name                   = var.name
  cluster                = var.ecs_cluster_id
  task_definition        = aws_ecs_task_definition.ecs_task.arn
  desired_count          = 1
  enable_execute_command = true
  launch_type            = "FARGATE"
  scheduling_strategy    = "REPLICA"
  network_configuration {
    security_groups = [var.security_group]
    subnets         = var.subnet_private_ids
  }
  dynamic "load_balancer" {
    for_each = length(var.repository_url_nginx) > 1 ? [""] : []
    content {
      container_name   = "nginx"
      container_port   = var.ports[0]
      target_group_arn = var.target_group_arn
    }
  }
}