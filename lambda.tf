data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda/create_inquiry.py"
  output_path = "${path.module}/lambda/create_inquiry.zip"
}

resource "aws_lambda_function" "create_inquiry" {

  function_name = "${var.project_name}-${var.environment}-create-inquiry"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  runtime = "python3.13"
  handler = "create_inquiry.lambda_handler"

  role = aws_iam_role.lambda_execution_role.arn

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.client_inquiries.name
    }
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
