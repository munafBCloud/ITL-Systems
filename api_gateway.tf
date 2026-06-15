resource "aws_apigatewayv2_api" "itl_api" {
  name          = "itl-systems-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id = aws_apigatewayv2_api.itl_api.id

  integration_type = "AWS_PROXY"

  integration_uri = aws_lambda_function.create_inquiry.invoke_arn

  integration_method = "POST"

  payload_format_version = "2.0"
}
resource "aws_apigatewayv2_route" "get_route" {
  api_id = aws_apigatewayv2_api.itl_api.id

  route_key = "GET /"

  target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id = "AllowExecutionFromAPIGateway"

  action = "lambda:InvokeFunction"

  function_name = aws_lambda_function.create_inquiry.function_name

  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.itl_api.execution_arn}/*/*"
}

resource "aws_apigatewayv2_stage" "dev" {
  api_id = aws_apigatewayv2_api.itl_api.id

  name = var.environment

  auto_deploy = true
}

resource "aws_apigatewayv2_route" "post_inquiries" {
  api_id = aws_apigatewayv2_api.itl_api.id

  route_key = "POST /inquiries"

  target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}
