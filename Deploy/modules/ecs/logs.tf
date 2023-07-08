resource "aws_cloudwatch_log_group" "logs" {
  name              = "cdv-project-pokemon-ecs"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_stream" "logs_stream" {
  log_group_name = aws_cloudwatch_log_group.logs.name
  name           = "cdv"
}