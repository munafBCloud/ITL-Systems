output "client_inquiries_table_name" {
  description = "Name of the DynamoDB table for client inquiries"
  value       = aws_dynamodb_table.client_inquiries.name
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.website.domain_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website.id
}
