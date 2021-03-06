<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, buttery, twitter_handle, email, project_title, project_description
-->

  <h3 align="center">Mock Financial API</h3>

  <p align="center">
    Node.js API built for Strategic Financial Solutions
    <br>
    &copy; Michael Gann
    <br>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li> <a href="#about-the-api">About The API</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#contact-me">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
# About The API

## Database Schema

<br>

  <img src="https://i.imgur.com/pywvyYv.png" alt="database schema" width="95%">

## Overview

This API was built using express to setup a Node.js server and interacts with a PostgreSQL server using the ORM Sequelize to query and update the database. The app can support the current specifications of updating and creating a "creditor data model", but the way I've internally modeled the app allows the ability to extend the functionality to report information about debtors, or a "debtor data model".

## Video Explanation

  Here is a <a href="https://youtu.be/whXjlwJwfZs"> link</a> to the video

### creditors table

  The creditors table represents a bank or institution that lends out money

### debtors table

  The debtors table represents a debtor that accepts money from a creditor

### creditor_debtors (join/through table)

  The creditor_debtors table represents a super many to many relationship between creditors giving out loans to one or many debtors and debtors accepting loans from one or multiple creditors, with the option for there to be multiple debts with the same creditor and debtor. The balance and minimum payment percentage of each debt is represented here because each creditor needs a record of the balance and minimum payment percentage between each of their debtors.

<!-- GETTING STARTED -->
# Getting Started

You will need [npm](https://www.npmjs.com/) installed on your machine to install dependencies for this API. You will also need [Node.js](https://nodejs.org/en/) and [postgreSQL](https://www.postgresql.org/) installed.


## Installation

To get the API running locally, follow these steps

1. Clone the repo onto your local machine

  ```sh
    git clone https://github.com/michael-gann/nodejs-sfs
  ```

2. Install dependencies for the app

  ```sh
    npm install
  ```

3. Create a local database using postgres and a user who owns it

  ```sql
    CREATE USER <username> WITH PASSWORD <password>;
    CREATE DATABASE <database> WITH OWNER <username>;
  ```

4. create a .env file and populate it with the values that were created above

  ```js
    DB_URL="postgres://<username>:<password>@localhost/<database>"
  ```

5. start the application

  ```sh
    npm start
  ```

## Serverless Setup

This API uses [serverless](https://www.serverless.com/) to setup an AWS API Gateway and AWS Lambda. Basically, Serverless wraps the express app with the serverless framework which will allow serverless to deploy the express app as a lambda function. That way anytime a user navigates to one of the defined API routes, the lambda function will be called, executing the express app which will handle all the routing.

Serverless uses AWS so you will need an [AWS](https://aws.amazon.com/) account. I used Amazon [RDS](https://console.aws.amazon.com/rds/home) to create a PostgreSQL database to persist data. The serverless configuration file, serverless.yml, needs the ID's of any security groups or subnets related to the database in order for serverless to know how to configure the API Gateway and Lambda function.

1. Create an AWS account or login to the management console if you have an account.

2. At the top of the page, search for RDS, and from here find and click on the "Create Database" button. Here we're going to create a PostgreSQL database. I used most of the default settings here but feel free to change the settings to your liking. The important information we need here is the database password. Make sure you keep track of it. You'll also need to make sure you click on "Additional configuration" and specify an initial database name, otherwise your database will not be created. It also might be a good idea to allow connections from outside your VPC so you can connect to the database on your local machine.

3. Now that our database is created (It will take a couple minutes) head over to the "serverless.example.yml" and change the name to "serverless.yml". In here, insert the values needed for serverless to setup the lambda function. Use the values from setting up a PostgreSQL production database and the development database locally.
*You'll need to navigate to AWS [RDS](https://console.aws.amazon.com/rds/home), click "Databases" on the left side menu and then click on the link for your unique database instance that you created for this API. On this page, your host is the 'endpoint' listed under the "Connectivity & Security" tab

  ```yml
  custom:
    env:
      production:
        stage: production
        db_dialect: "postgres"
        db_url: <PRODUCTION DATABASE URL>
      development:
        stage: development
        db_dialect: "postgres"
        db_url: <LOCAL DATABASE URL>
  ```

4. Just next to where the endpoint is listed, grab the subnets and VPC's that were setup for the database. Copy those values into the serverless.yml file, in this section of the file. Include the region that makes the most sense.

<br>

  ```yml
  provider:
    name: aws
  runtime: nodejs14.x
  vpc:
    securityGroupIds:
      - <sg-id>
    subnetIds:
      - <subnet-id>
  region: <REGION>
  ```

5. Before moving on, make sure the local development database has some valid data in it. In your terminal, navigate to the root of the API. Run these commands to run the sequelize migrations and seed files.

  ```sh
  npx dotenv sequelize db:migrate
  npx dotenv sequelize db:seed:all
  ```

6. Before deploying to AWS, test out the serverless functionality locally.

  ```sh
  sls offline --stage development
  ```

7.  The output should look like this.

  ```sh
   ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
   ???                                                                       ???
   ???   ANY | http://localhost:3000/development                             ???
   ???   POST | http://localhost:3000/2015-03-31/functions/app/invocations   ???
   ???   ANY | http://localhost:3000/development/{proxy*}                    ???
   ???   POST | http://localhost:3000/2015-03-31/functions/app/invocations   ???
   ???                                                                       ???
   ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  ```

7. Navigate to that first link and append "/api/creditor" to see if there is a successful response from the Express app with a list of the creditor data model.

8. Run the migrations on the AWS PostgreSQL database. Go ahead and run this command.

  ```sh
  npx sequelize-cli db:migrate --url 'postgresql://<PRODUCTION DATABASE_URL>'
  ```

9. Apply the seed data using this command.

  ```sh
  npx sequelize-cli db:seed:all --url 'postgresql://<PRODUCTION DATABASE_URL>'
  ```

8. Now we can deploy the code to AWS as a Lambda function. We'll do that with this command.

  ```sh
  sls deploy --stage production
  ```

9. This will create a .serverless file in the root of the API's file structure and serverless will take care of forming the AWS API Gateway and AWS Lambda. It might take a couple minutes the first time, since it has to build the postgres layer.

10. Once the command is finished running it should say if it was successful or not. If it was successful, the output will look like this.

  ```sh
  Serverless: Stack update finished...
  Service Information
  service: nodejs-sfs
  stage: production
  region: us-east-2
  stack: nodejs-sfs-production
  resources: 13
  api keys:
    None
  endpoints:
    ANY - https://--------.execute-api.us-east-2.amazonaws.com/production
    ANY - https://--------.execute-api.us-east-2.amazonaws.com/production/{proxy+}
  functions:
    app: nodejs-sfs-production-app
  layers:
    pg: arn:aws:lambda:us-east-2:------------:layer:pg:2
  Serverless: Removing old service artifacts from S3...
  ```

11. Navigate to the first endpoint provided and append "/api/creditor". The API is now setup as a lambda function. Read on below for detailed information about using this API.

# Usage

Once you have the API running on localhost, you will be able to start making requests to the API on localhost. If you followed the steps above you can use the url for the serverless version of this API that was created. Or you can follow the example live links below.

## Routes

- [GET, POST, PATCH] "/api/creditor"
- [GET] "/api/creditor/\<creditorName>"
- [GET] "/api/creditor/analysis"

## Example Live Links

- https://4fkdzxbou3.execute-api.us-east-2.amazonaws.com/production/api/creditor
- https://4fkdzxbou3.execute-api.us-east-2.amazonaws.com/production/api/creditor/AMEX
- https://4fkdzxbou3.execute-api.us-east-2.amazonaws.com/production/api/creditor/CBNA
- https://4fkdzxbou3.execute-api.us-east-2.amazonaws.com/production/api/creditor/analysis

### GET /api/creditor


  This endpoint will return a list of all creditor data models

#### Response Payload

  ```js
  [
    {
      "id": number,
      "creditorName": string,
      "firstName": string,
      "lastName": string,
      "minPaymentPercentage": number,
      "balance": number
    }
  ]
  ```

  <br>

### POST /api/creditor/

  This endpoint will allow you to create a new creditor data model. You must provide a first AND last name, an institution name, and a balance and minimum payment percentage in the body of the request like so

  #### Request Payload

  ```js
  {
    "institution": "AMEX",
    "firstName": "firstName",
    "lastName": "lastName",
    "balance": 2500.00,
    "minPaymentPercentage": 5.00
}
  ```

  <br>

### PATCH /api/creditor/

  This endpoint will allow you to edit an existing creditor data model. You must provide the id of the creditor model to edit. All other options are optional except if you are updating the firstName or lastName. You must provide both. Here is an example updating a full record.

  #### Request Payload

  ```js
  {
    "id": 1,
    "institution": "AMEX",
    "firstName": "Suzie",
    "lastName": "Joy",
    "balance": 1254.00,
    "minPaymentPercentage": 2.5
}
  ```
  or a partial update with a new institution

  #### Request Payload

  ```js
  { "id": 1,
    "institution": "ALLY",
    "balance": 2000.00,
    "minPaymentPercentage": 3.0
}
  ```

  <br>

### GET /api/creditor/:institution

  This endpoint will return all creditor model data related to a specific institution

#### Response Payload

  ```js
  [
    {
        "id": 9,
        "creditorName": "CBNA",
        "firstName": "Suman",
        "lastName": "Tester79",
        "minPaymentPercentage": 3.50,
        "balance": 687.00
    },
    {
        "id": 10,
        "creditorName": "CBNA",
        "firstName": "Suman",
        "lastName": "Tester79",
        "minPaymentPercentage": 3.50,
        "balance": 235.00
    }
  ]

  ```

  <br>

### GET /api/creditor/analysis

  This endpoint will return a creditor analysis of institutions and all their loans if the total creditor balance is over $2000.00 and the minimum payment percentage is below 30.00%

#### Response Payload

  ```js
  [
    {
        "id": 2,
        "creditorName": "AMEX",
        "firstName": "Suman",
        "lastName": "Tester79",
        "minPaymentPercentage": 2.00,
        "balance": 2763.00
    },
    {
        "id": 5,
        "creditorName": "DISCOVERBANK",
        "firstName": "Suman",
        "lastName": "Tester79",
        "minPaymentPercentage": 2.00,
        "balance": 2644.00
    }
]
  ```

  <br>

#

## Built With

<br>

* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [Serverless](https://www.serverless.com/)
* [AWS RDS](https://us-east-2.console.aws.amazon.com/console/home)
* [AWS API Gateway](https://us-east-2.console.aws.amazon.com/console/home)
* [AWS Lambda](https://us-east-2.console.aws.amazon.com/console/home)

<br>

## Contact me

### Michael Gann

- [Portfolio](https://michael-gann.github.io/michael-gann.github.io/)
- [LinkedIn](https://www.linkedin.com/in/michael-gann-1a2161201/)
- mchlgnn@protonmail.com

<!-- ACKNOWLEDGEMENTS -->

### Acknowledgements

* [othneildrew/best-README-template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/michael-gann/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/michael-gann/buttery/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/michael-gann/repo.svg?style=for-the-badge
[forks-url]: https://github.com/michael-gann/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/michael-gann/buttery.svg?style=for-the-badge
[stars-url]: https://github.com/michael-gann/buttery/stargazers
[issues-shield]: https://img.shields.io/github/issues/michael-gann/repo.svg?style=for-the-badge
[issues-url]: https://github.com/michael-gann/buttery/issues
[license-shield]: https://img.shields.io/github/license/michael-gann/repo.svg?style=for-the-badge
[license-url]: https://github.com/michael-gann/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/michael-gann-1a2161201/
[react-url]: https://img.shields.io/badge/react


### Technology Shields:
![](https://img.shields.io/badge/Tools-npm-informational?style=flat&logo=NPM&logoColor=white&color=ff8300) ![](https://img.shields.io/badge/Tools-Nodemon-informational?style=flat&logo=Nodemon&logoColor=white&color=ff8300) ![](https://img.shields.io/badge/Tools-Node.js-informational?style=flat&logo=Node.js&logoColor=white&color=ff8300) ![](https://img.shields.io/badge/Tools-Git-informational?style=flat&logo=Git&logoColor=white&color=ff8300) ![](https://img.shields.io/badge/Tools-Postman-informational?style=flat&logo=Postman&logoColor=white&color=ff8300) ![](https://img.shields.io/badge/Tools-PostgreSQL-informational?style=flat&logo=PostgreSQL&logoColor=white&color=ff8300) ![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=JavaScript&logoColor=white&color=ff0000)
