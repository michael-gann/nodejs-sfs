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

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url] -->

<!-- [![Stargazers][stars-shield]][stars-url] -->
<!-- [![Issues][issues-shield]][issues-url] -->
<!-- [![MIT License][license-shield]][license-url] -->
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->

<!-- <br /> -->
<!-- <p align="center">
  <!-- <a href="https://github.com/michael-gann/splitwise-clone"> -->
<!--     <img src="" alt="Logo" width=200" height="200">
  </a> -->

  <h3 align="center">Mock Financial API</h3>

  <p align="center">
    Node.js API built for Strategic Financial Solutions
    <br />
    &copy; Michael Gann
    <br />
    <!-- <a href="https://github.com/michael-gann/buttery"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://kadince-todo-app.herokuapp.com/">View Live Project</a> -->
    <!-- · -->
    <!-- <a href="https://github.com/michael-gann/buttery/issues">Report Bug</a> -->
    <!-- · -->
    <!-- <a href="https://github.com/michael-gann/buttery/issues">Request Feature</a> -->
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li> <a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

### Database Schema

<br>

  <img src="https://i.imgur.com/i2OuCNm.png" alt="database schema" width="80%">

<br>
<br>

<!-- <p align="center">
  <img src="https://i.postimg.cc/kgg0M2cy/Screen-Shot-2021-02-15-at-12-22-49-PM.png" alt="screenshot of app" width="80%">
</p> -->

<!-- ![Alt Text](https://media.giphy.com/media/ClZZPi3QXgXXoNRyyG/giphy.gif) -->

### Built With

<br>

* [Serverless](https://www.serverless.com/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [AWS Lambda](https://us-east-2.console.aws.amazon.com/console/home)
* [AWS RDS](https://us-east-2.console.aws.amazon.com/console/home)
* [AWS API Gateway](https://us-east-2.console.aws.amazon.com/console/home)

<br>
<br>

<!-- GETTING STARTED -->
## Getting Started

You will need npm installed on your machine to install dependencies for this project. You will also need [node](https://nodejs.org/en/) installed.

<br>

  ```sh
  npm install npm@latest -g
  ```
  <br>

### Installation
<br>


To get the project running locally, follow these steps

<br>


1. Clone the repo onto your local machine

    ```sh
      git clone https://github.com/michael-gann/nodejs-sfs
    ```

    <br>

2. Install dependencies for the app

    ```sh
      npm install
    ```

    <br>

3. Create a local database using postgres and a user who owns it

    ```sh
      CREATE USER <userName> WITH PASSWORD <password>;
      CREATE DATABASE <databaseName> WITH OWNER <userYouCreated>;
    ```

    <br>

4. create a .env file and populate it with real values that were created above

    ```js
      DB_USERNAME=username
      DB_PASSWORD=password
      DB_DATABASE=name
      DB_HOST=localhost

    ```

    <br>

5. start the application

    ```sh
     npm start
    ```

    <br>

6. (optional) If you want to setup this project to use AWS lambda functions, you'll need to setup an AWS account and create a database for the lambda function to persist changes to the data. The serverless framework does a lot of the heavy lifting with setting up the API Gateway and lambda functionality.

<!-- ### Prerequisites

 -->

<!-- USAGE EXAMPLES -->
## Usage

Once you have the app running on localhost, you will be able to start making requests to the API.

### Michael Gann

- [Portfolio](https://michael-gann.github.io/michael-gann.github.io/)
- [LinkedIn](https://www.linkedin.com/in/michael-gann-1a2161201/)
- mchlgnn@protonmail.com

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

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
