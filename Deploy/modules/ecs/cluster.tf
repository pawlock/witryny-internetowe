resource "aws_ecs_cluster" "aws_ecs_cluster" {
  name = "cdv-project-pokemon-ecs-cluster"
  tags = {
    Name = "cdv-project-pokemon-ecs-cluster"
  }
}

resource "aws_ecs_cluster_capacity_providers" "cluster_provider" {
  cluster_name       = aws_ecs_cluster.aws_ecs_cluster.name
  capacity_providers = ["FARGATE"]
}
