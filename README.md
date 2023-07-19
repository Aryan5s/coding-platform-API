# Event-Specific Coding platform

## Running the code

make sure you have the latest version of the code and filled in the .env file.

```sh
npm install
npm start
```

variables in the .env file:

MONGODB_URL
JWT_ACCESS_TOKEN
JWT_REFRESH_TOKEN
SPHERE_PROBLEMS_URL
SPHERE_SUBMISSIONS_URL
SPHERE_PROBLEMS_TOKEN

## Features

- [Signup](#Signup)
- [Login](#Login)
- [Logout](#Logout)
- [Refresh Auth Token](#Refresh-Auth-Token)
- [List All Questions](#List-All-Questions)
- [List Uploaded Questions](#List-Uploaded-Questions)
- [Add Questions](#Add-Questions)
- [Edit Questions](#Edit-Questions)
- [Delete Questions](#Delete-Questions)
- [Add Test Cases](#Add-Test-Cases)
- [Home Page](#Home-Page)
- [List All Test Cases](#List-Test-Cases)
- [Edit Test Cases](#Edit-Test-Cases)
- [User Submisions](#User-Submisions)
- [List All Submissions](#List-All-Submissions)
- [List Submissions By Users](#List-Submissions-By-Users)
- [List Submissions for Questions](#List-Submissions-for-Questions)
- [List Self Submissions](#List-Self-Submissions)

***Make sure you are using correct Bearer Token for all the requests.***

<a id="Signup"></a>

### Signup

Signup takes a POST request with four parameters name, email, password, role and gives you email, accessToken, refreshToken as response.

Request:

- POST

Parameters:

- name
- email
- password
- role

<a id="Login"></a>

### Login

Login takes a POST request with two parameters email, password and gives you email, accessToken, refreshToken as response

Request:

- POST

Parameters:

- email
- password

<a id="Logout"></a>

### Logout

Logout takes a POST request with refreshToken

Request:

- POST

Parameters:

- refreshToken

<a id="Refresh-Auth-Token"></a>

### Refresh Auth Token

Refresh takes a POST request with refreshToken and gives you accessToken, refreshToken as response

Request:

- POST

Parameters:

- refreshToken

<a id="Home-Page"></a>

### Home Page

Greets the user with the name and role

<a id="List-All-Questions"></a>

displayQuestions takes a GET request and gives you all questions in Sphere Engine as response including uploaded and auto generated

Request:

- GET

Parameters:

- NONE
<a id="List-All-Uploaded-Questions"></a>

### List All Uploaded Questions

displayQuestions takes a GET request and gives you all questions uploaded by admins

Request:

- GET

Parameters:

- NONE

<a id="Add-Questions"></a>

### Add Questions

addQuestion takes a POST request with parameters name, description

Request:

- POST

Parameters:

- name
- description
- masterJudgeID


<a id="Edit-Questions"></a>

### Edit Questions


updateQuestion takes a POST request with parameters new name, new description, id of the question

Request:

- POST

Parameters:

- id
- name
- description

<a id="Delete-Questions"></a>

### Delete Questions

deleteQuestion takes a POST request with id of the question

Request:

- POST

Parameters:

- id

<a id="Add-Test-Cases"></a>

### Add Test Cases

addTestCase takes a POST request with id of the question, input, output, judgeId as the input

Request:

- POST

Parameters:

- id
- input
- output
- judgeId


<a id="Edit-Test-Cases"></a>

### Edit Test Cases

updateTestCase takes a POST request with id of the question, input, output, number of test case as the input

Request:

- POST

Parameters:

- id
- input
- output
- number (test case number)


<a id="List-Test-Cases"></a>

### List Test Cases


listTestCase takes a POST request with id of the question

Request:

- POST

Parameters:

- id

<a id="User-Submisions"></a>

### User Submisions

submission takes a POST request with id of the question, source, compilerId as input

Request:

- POST

Parameters:

- problemId
- source
- compilerId


<a id="List-All-Submissions"></a>

### List All Submissions


listAllSubmissions takes a GET request

Request:

- GET

Parameters:

- NONE


<a id="List-Submissions-By-Users"></a>

### List Submissions By Users

listUserSubmissions takes a POST request with email of the user

Request:

- POST

Parameters:

- email


<a id="List-Submissions-for-Questions"></a>

### List Submissions for Questions


listQuestionSubmissions takes a POST request with id of the question

Request:

- POST

Parameters:

- problemId


<a id="List-Self-Submissions"></a>

### List Self Submissions

listSelfSubmissions takes a GET request with signed in user

Request:

- GET

Parameters:

- NONE

