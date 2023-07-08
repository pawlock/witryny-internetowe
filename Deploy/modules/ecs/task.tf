resource "aws_ecs_task_definition" "ecs_task" {
  family                   = var.name
  container_definitions    = length(var.repository_url_nginx) > 1 ? local.container_nginx : local.container_workers
  cpu                      = var.cpu
  memory                   = var.memory
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  execution_role_arn       = var.ecs_role_arn
  task_role_arn            = var.ecs_role_arn
}
