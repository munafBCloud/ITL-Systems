resource "aws_route53_zone" "primary" {
  name = "itlcloudsystems.com"
}

resource "aws_route53_record" "root_domain" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "itlcloudsystems.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_domain" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.itlcloudsystems.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
