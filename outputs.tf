output "client_inquiries_table_name" {
  description = "Name of the DynamoDB table for client inquiries"
  value       = aws_dynamodb_table.client_inquiries.name
}
