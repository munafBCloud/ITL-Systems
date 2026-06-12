resource "aws_dynamodb_table" "client_inquiries" {
  name         = "${var.project_name}-${var.environment}-client-inquiries"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "inquiryId"

  attribute {
    name = "inquiryId"
    type = "S"
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
