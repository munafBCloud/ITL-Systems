import json
import os
import uuid
from datetime import datetime, timezone

import boto3

# Connect to DynamoDB
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])


def lambda_handler(event, context):

    try:

        # Determine what type of request API Gateway sent us
        method = event["requestContext"]["http"]["method"]
        path = event["requestContext"]["http"]["path"]

        # Handle GET /
        if method == "GET" and path.endswith("/"):
           return {
              "statusCode": 200,
              "headers": {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "Content-Type",
                  "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
              },
              "body": json.dumps({
                  "message": "ITL Systems API is running."
              })
           }
        if method == "GET" and path.endswith("/inquiries"):
            response = table.scan()
            inquiries = response.get("Items",[])

            return {
               "statusCode": 200,
               "headers": {
                   "Access-Control-Allow-Origin": "*",
                   "Access-Control-Allow-Headers": "Content-Type",
                   "Access-Control-Allow-Methods": "OPTION,GET,POST"
               },
               "body": json.dumps({
                  "count": len(inquiries),
                  "inquiries": inquiries
               })
            }

        # Read the request body
        body = json.loads(event.get("body", "{}"))

        # Simple validation
        if (
            not body.get("contactName") or
            not body.get("email") or
            not body.get("phone") or
            not body.get("serviceType")
        ):
            return {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST"
                },
                "body": json.dumps({
                    "message": "contactName, email, phone, and serviceType are required."
                })
            }

        # Create the inquiry record
        inquiry = {
            "inquiryId": str(uuid.uuid4()),
            "companyName": body.get("companyName", ""),
            "contactName": body.get("contactName"),
            "email": body.get("email"),
            "phone": body.get("phone"),
            "serviceType": body.get("serviceType"),
            "message": body.get("message", ""),
            "status": "New",
            "source": "ITL Systems Website",
            "submittedAt": datetime.now(timezone.utc).isoformat()
        }

        # Save to DynamoDB
        table.put_item(Item=inquiry)

        # Return success
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            "body": json.dumps({
                "message": "Inquiry submitted successfully."
            })
        }

    except Exception as error:

        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            "body": json.dumps({
                "message": "An unexpected error occurred.",
                "error": str(error)
            })
        }
