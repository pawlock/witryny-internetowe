resource "aws_acm_certificate" "ssl" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "ssl_validation" {
  certificate_arn         = aws_acm_certificate.ssl.arn
  validation_record_fqdns = [aws_route53_record.ssl_validation.fqdn]
}

resource "aws_route53_record" "ssl_validation" {
  name    = tolist(aws_acm_certificate.ssl.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.ssl.domain_validation_options)[0].resource_record_type
  zone_id = var.zone_id
  records = [tolist(aws_acm_certificate.ssl.domain_validation_options)[0].resource_record_value]
  ttl     = 60
}