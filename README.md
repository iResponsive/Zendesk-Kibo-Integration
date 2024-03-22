# Zendesk-Kibo-Integration
This repository provides the codebase for the integration done between Zendesk platform and Kibo OMS. The purpose of this project is to use the Kibo OMS Order related data within the Zendesk Ticketing platform for Order related tickets created in Zendesk.

# Overview 

## Existing Business Challenge :  
At Zendesk, the Support team faces delays in gathering order details manually. Our aim to overcome this challenge by streamlining the process within Zendesk through an integration with Kibo.  

## Objective:  
- Develop a specialized Zendesk application as a direct link to Kibo.  
- Effortlessly retrieve and utilize detailed order information, improving the support workflow.  
- Provide easy handling of Orders based on Customer request.

# Features 
- **Automatic Parsing:**  Applicaiton Intelligently extracts order number and Email Id from ticket descriptions.  
- **Real-time Query:**  Dynamically connects to Kibo OMS to fetch comprehensive order details.  
- **In-ticket Display:**  Presents a detailed overview of Order Information directly within the Zendesk ticket interface.  
- **Actionable Features:**  Edit the Shipping address and Cancel the order upon customer request 

# How the application works
1. When a customer sends an email to the support team for any order related issue, a ticket is created at Zendesk Ticketing System.<br>
2. Our internal application installed within the Zendesk Ticketing system reads the ticket description using the Zendesk API's
3. From the ticket description , the applicaiton parses the email id and order id if provided in the ticket description
4. The application makes API calls to the Middleware application using the order id or Email id.
5. The Middleware inturn makes API requests to Kibo for Authentication, and other Order related and Shipment related API's for fetching the respective data.
6. Kibo returns the API responses to the Middleware, which in turn responds to the Zendesk application.
7. Using the response data, the Order related information is rendered on our application screens
   
# Technical Stack:

## Zendesk Application​
**Framework:** ZAF (Zendesk Apps Framework)<br>
**Library:**  React JS​

## Middleware Application:​
Serves as a proxy application layer to eliminate the CORS policy issue between Zendesk and Kibo<br>
**Backend Framework:** Node.js​<br>
**Hosting:** Azure Cloud​
   
## Integration with Kibo OMS:​
**API Calls:** Utilizes various Kibo OMS API endpoints for retrieving order and shipment details.​<br>
**Authorization:** Connects to Kibo OMS using an API endpoint for obtaining access tokens​ for authorization.​
<br>Kibo is installed with the middleware application to connect with the OMS​
   
## Data Parsing and Manipulation:​
Language: JavaScript

# Installation
Provide detailed steps on how to install and set up your integration. Include any prerequisites, dependencies, or configurations necessary.

# Usage
Explain how to use your integration. Provide code examples, configuration options, or any other relevant information to help users get started.<br>
<You can explain how the application would be added to our account from apps and used by the agent , after the applicaiton installation >

# Configuration
Detail any configuration options or settings users can customize. Include information on where configuration files are located and how to modify them.

# Support
If you need help or have any questions about using the Zendesk-Kibo Integration, there are several resources available:

**Documentation:** Refer to the official documentation for detailed instructions on installation, configuration, and usage of the integration.<br>
**Issue Tracker:** If you encounter a bug or need to report an issue, please open a new issue on our GitHub repository.<br>
**Contact Us:** For further assistance or inquiries, feel free to contact our support team at support@d3v-iresponsivesolutions5151.zendesk.com. We're here to help!<br>

# Disclaimer
Include any disclaimers or limitations of liability for your integration. This may include warnings about potential bugs, security vulnerabilities, or compatibility issues.

# Resources
Provide links to additional resources that may be helpful for users, such as tutorials, API documentation, or related projects.

