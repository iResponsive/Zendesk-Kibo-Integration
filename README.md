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
### Dependencies
- [Node.js](https://nodejs.org/en/) >= 18.12.1
- [Ruby](https://www.ruby-lang.org/) = 2.6.x

### Setup
1. Clone or fork this repo
2. Run `npm install`

To run your app locally in Zendesk, you need the latest [Zendesk CLI](https://github.com/zendesk/zcli).

### Running locally

To serve the app to your Zendesk instance with `?zcli_apps=true`, open a new terminal and run

```
npm run watch (Seperate Terminal)
```
```
npm run start (Seperate Terminal)
```
## Folder structure

The folder and file structure of the App Scaffold is as follows:

| Name                                    | Description                                                                                  |
|:----------------------------------------|:---------------------------------------------------------------------------------------------|
| [`.github/`](#.github)                  | The folder to store PULL_REQUEST_TEMPLATE.md, ISSUE_TEMPLATE.md and CONTRIBUTING.md, etc     |
| [`dist/`](#dist)                        | The folder in which webpack packages the built version of your app                           |
| [`spec/`](#spec)                        | The folder in which all of your test files live                                              |
| [`src/`](#src)                          | The folder in which all of your source JavaScript, CSS, templates and translation files live |
| [`webpack/`](#src)                      | translations-loader and translations-plugin to support i18n in the application               |
| [`.babelrc`](#packagejson)              | Configuration file for Babel.js                                                              |
| [`.browserslistrc`](#packagejson)       | Configuration file for browserslist                                                           |
| [`jest.config.js`](#packagejson)        | Configuration file for Jest                                                                  |
| [`package.json`](#packagejson)          | Configuration file for Project metadata, dependencies and build scripts                      |
| [`postcss.config.js`](#packagejson)     | Configuration file for PostCSS                                                               |
| [`webpack.config.js`](#webpackconfigjs) | Configuration file that webpack uses to build your app                                       |


## Deploying

Refer this documentation ( `https://developer.zendesk.com/documentation/apps/build-an-app/using-react-in-a-support-app/` ) for deploying the application in organization domain.

To check that your app will pass the server-side validation check, run

```
zcli apps:validate dist
```

If validation is successful, you can upload the app into your Zendesk account by running

```
zcli apps:create dist
```
To update your app after it has been created in your account, run

```
zcli apps:update dist
```
Or, to create a zip archive for manual upload, run

```
zcli apps:package dist
```
taking note of the created filename.

## Steps to create a new zendesk app
For more information on the Zendesk CLI please see the [documentation](https://developer.zendesk.com/documentation/apps/app-developer-guide/zcli/).

# Usage
Refer the documentation (`https://developer.zendesk.com/documentation/apps/getting-started/setting-up-new-apps/`)

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

