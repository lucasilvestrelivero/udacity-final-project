* frontend URL: http://deliverysenderemail-frontapp.s3-website-sa-east-1.amazonaws.com/
* backend URL: https://ag1oe9hmtc.execute-api.sa-east-1.amazonaws.com/dev/

Project overview
* The purpose of this project is to have a list of customers and send delivery confirmations by e-mail with attached receipts.

Entities
* User: people will be able to use the system.
* Client: company registration with your emails
* Delivery Confirmation: delivery confirmation record

Tips:
* Create a user in login page using the button "register"
* To receive an email register a client with our own email and approve the aws ses confirmation email. (this email confirmation is intended to approve your email to receive email from aws SES)
* Delivery confirmation select the client with our own email to receive the email.