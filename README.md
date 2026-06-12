	# ITL Systems Infrastructure as Code (Terraform)
	
	## Overview
	
	This project is an Infrastructure as Code (IaC) implementation for ITL Systems.
	
	The objective is to automate the deployment of a secure, low-cost, and scalable AWS environment that supports a public-facing ITL Systems landing page used to collect client service inquiries.
	
	The infrastructure is being built using Terraform and AWS cloud services with a focus on:
	
	* Simplicity
	* Security
	* Automation
	* Cost efficiency
	* Scalability
	
	---
	
	## Business Goal
	
	The ITL Systems website will serve as a landing page where potential clients can:
	
	* Learn about ITL Systems services
	* Request consultations
	* Provide contact information
	* Communicate project requirements
	
	Inquiry data will be securely stored in AWS for future review and customer follow-up.
	
	---
	
	## Project Objectives
	
	* Automate infrastructure deployment using Terraform
	* Eliminate manual AWS resource creation
	* Create repeatable deployment processes
	* Implement cloud security best practices
	* Build a foundation for future business growth
	
	---
	
	## Technologies Used
	
	### Infrastructure as Code
	
	* Terraform
	
	### Cloud Platform
	
	* Amazon Web Services (AWS)
	
	### Planned AWS Services
	
	* Amazon DynamoDB
	* AWS Lambda
	* Amazon API Gateway
	* Amazon S3
	* Amazon CloudFront
	* AWS IAM
	* Amazon CloudWatch
	
	---
	
	## Current Architecture
	
	### Phase 1
	
	Terraform-managed DynamoDB deployment
	
	```text
	Terraform
	↓
	AWS Provider
	↓
	DynamoDB
	```
	
	### Current Resource
	
	```text
	DynamoDB Table
	└── itl-systems-dev-client-inquiries
	```
	
	Purpose:
	
	* Store client inquiry submissions
	* Provide serverless data storage
	* Support future API integrations
	
	---
	
	## Terraform Project Structure
	
	```text
	itl-systems-iac
	├── provider.tf
	├── variables.tf
	├── main.tf
	└── outputs.tf
	```
	
	---
	
	## Deployment Workflow
	
	```bash
	terraform init
	terraform validate
	terraform plan
	terraform apply
	```
	
	---
	
	## Security Considerations
	
	The project is being designed around the principle of least privilege and serverless architecture.
	
	Security objectives include:
	
	* IAM role-based access control
	* Private AWS resources where possible
	* HTTPS-only public access
	* Infrastructure managed through code
	* Auditability through Terraform state tracking
	
	---
	
	### Phase 2
	
	Serverless Inquiry API
	
	```text
	API Gateway
	↓
	Lambda
	↓
	DynamoDB
	```
	
	### Phase 3
	
	Static Website Hosting
	
	```text
	CloudFront
	↓
	S3 Static Website
	```
	
	### Phase 4
	
	Production Deployment
	
	```text
	Client
	↓
	CloudFront
	↓
	S3 Landing Page
	↓
	API Gateway
	↓
	Lambda
	↓
	DynamoDB
	```
	
	### Planned Features
	
	* Client inquiry form
	* Email notifications
	* Administrative dashboard
	* Custom domain integration
	* SSL/TLS encryption
	
	---
	
	* Terraform
	* Infrastructure as Code
* AWS Cloud Services
