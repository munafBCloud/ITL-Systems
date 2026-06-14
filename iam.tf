data "aws_iam_policy_document" "lambda_assume_role" {

  statement {

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = [
      "sts:AssumeRole"
    ]
  }
}

resource "aws_iam_role" "lambda_execution_role" {

  name = "${var.project_name}-${var.environment}-lambda-role"

  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

data "aws_iam_policy_document" "lambda_dynamodb_policy" {

  statement {

    effect = "Allow"

    actions = [
      "dynamodb:PutItem"
    ]

    resources = [
      aws_dynamodb_table.client_inquiries.arn
    ]
  }
}

resource "aws_iam_role_policy" "lambda_dynamodb_access" {

  name = "${var.project_name}-${var.environment}-lambda-dynamodb-policy"

  role = aws_iam_role.lambda_execution_role.id

  policy = data.aws_iam_policy_document.lambda_dynamodb_policy.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {

  role = aws_iam_role.lambda_execution_role.name

  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

}
