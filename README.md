![Banner](https://drive.google.com/uc?id=13v4gLZKivlCDC3zjHgKQizo09hUNWZfL)



# Pestpatrol Backend

**PestPatrol** is an Android application designed for early detection of rice crop diseases using advanced machine learning models. The backend, developed using Express.js and auto-deployed to Google Cloud Run, includes 33 REST API endpoints facilitating communication between the app and cloud services.

## Table of Contents

- [Pestpatrol Backend](#pestpatrol-backend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Key Features](#key-features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
  - [Project Structure](#project-structure)
  - [License](#license)
- [API Reference](#api-reference)
      - [Base URL](#base-url)
  - [(+) `POST` Register](#-post-register)
  - [(+) `POST` Login](#-post-login)
  - [(+) `POST` Forgot Password](#-post-forgot-password)
  - [(+) `PUT` Reset Password](#-put-reset-password)
  - [(-) `POST` Predict](#--post-predict)
  - [(-) `GET` All Prediction History](#--get-all-prediction-history)
  - [(-) `GET` All Articles/Blogs](#--get-all-articlesblogs)
  - [(-) `GET` All Articles by Category](#--get-all-articles-by-category)
  - [(-) `GET` Article Detail by `articleId`](#--get-article-detail-by-articleid)
  - [(-) `PUT` Like/Unlike Article/Blog (from 'P-Blog' List Page)](#--put-likeunlike-articleblog-from-p-blog-list-page)
  - [(-) `PUT` Like/Unlike Article/Blog (from Article/BLog Details Page)](#--put-likeunlike-articleblog-from-articleblog-details-page)
  - [(-) `GET` Liked/Favorite Articles/Blogs](#--get-likedfavorite-articlesblogs)
  - [(-) `POST` Create a New Reminder](#--post-create-a-new-reminder)
  - [(-) `GET` All Active Reminders](#--get-all-active-reminders)
  - [(-) `GET` Reminder Detail by `reminderId`](#--get-reminder-detail-by-reminderid)
  - [(-) `PUT` Edit a Reminder](#--put-edit-a-reminder)
  - [(-) `GET` Finish a Reminder](#--get-finish-a-reminder)
  - [(-) `GET` Reminder History](#--get-reminder-history)
  - [(-) `DELETE` Delete a Reminder](#--delete-delete-a-reminder)
  - [(-) `GET` Profile Data](#--get-profile-data)
  - [(-) `PUT` Edit Profile Data](#--put-edit-profile-data)
  - [(-) `POST` Send Chat to Chatbot](#--post-send-chat-to-chatbot)

## Introduction

**PestPatrol** backend is built using the Express.js framework from Node.js. It provides RESTful APIs for user authentication, data management, and communication with the machine learning model for rice disease detection. The backend API is hosted on Google Cloud Run, leveraging Google Cloud Platform for scalable and reliable infrastructure.

## Key Features

- **User Authentication**:  Utilizes JWT (JSON Web Tokens) for token-based authentication and supports Google OAuth2.
- **Rice Leaf Disease Prediction**:  Provides API endpoints for uploading images and returns machine learning inference results using TensorFlow.js.
- **Cloud Data Management**: Utilizes robust storage solutions on Google Cloud Platform (GCP), including Firestore for structured data and Cloud Storage for object data.
- **Cloud Run**:Server is hosted on a serverless container-based infrastructure, ensuring scalability and reliability.
- **Continuous Deployment**:  Integrated with Cloud Run Continuous Deployment on the Main branch for automated deployment.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Git
- Node.js (v20.11.1)
- NPM (Node Package Manager)

### Installation

1. Clone the Repository :
    ```bash
    git clone https://github.com/PestPatrol/pestpatrol-backend.git
    cd pestpatrol-backend
    ```
2. Environment Set Up :
    ```bash
    cp .env.example .env
    ```
3. Install Dependecies :
    ```bash
    npm install
    ```
4. Seed the firestore :
    ```bash
    ./seed.sh
    ```

## Running the Application 
Run application in Development mode :
```bash
npm run start:dev
```
The application will be accessible at http://localhost:3000.

## API Documentation

## Project Structure
```bash
pestpatrol-backend
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── .dockerignore
├── .env.example
├── .gitattributes
├── .gitignore
├── dockerfile
├── eslint.config.mjs
└── src
    ├── app
    ├── configs
    ├── controllers        
    ├── errors
    ├── middlewares        
    ├── routes
    ├── services
    │   ├── articles       
    │   ├── chatbots       
    │   ├── predictions    
    │   ├── reminders      
    │   └── users
    ├── utils
    └── validations
```
## License

This Project is licensed under the MIT License - see the [LICENSE](https://github.com/PestPatrol/pestpatrol-backend/blob/main/LICENSE) file for details.

Thank you for using FreshGrade! If you have any questions or need further assistance, please open an issue in this repository.

# API Reference

The **private endpoints (-)** needs a JWT `token` in every authorization header. This `token` contains database information about the current `user`, such as `email` and `userId` (could be referred by `req.user.userId`). Meanwhile, the **public endpoints (+)** do not need such a way.

PestPatrol API returns the following status codes:

| Status Code | Description             |
| :---------: | :---------------------- |
|     200     | `OK`                    |
|     201     | `CREATED`               |
|     400     | `BAD REQUEST`           |
|     404     | `NOT FOUND`             |
|     500     | `INTERNAL SERVER ERROR` |

Each endpoint's **success response** varies, meanwhile the **failed/error response** are structured as below:
```http
  "success": false,
  "error": "Some error message"
```

#### Base URL
```http
  http://localhost:{{PORT}}
```
`{{PORT}}` will refer `PORT` variable in `.env`. 

## (+) `POST` Register
```http
  POST /register
```

Attempts to register a new user specified by the request body with the structure:
```http
  {
    "email": "sample@example.com",
    "fullName": "Sample User",
    "password": "NewPassword201"
  }
```

Example **success response:**
```http
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "userId": "a1b2c3d4e5",
        "email": "sample@example.com",
        "fullName": "Sample User"
      }
    }
  }
```
## (+) `POST` Login
```http
  POST /login
```
Attempets to log in with the credentials specified in the request body with the structure:
```http
  {
    "email": "sample@example.com",
    "password": "NewPassword201"
  }
```

Example **success response:**
```http
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
      "token": "eyJhbGriO5jLU..."
    }
}
```

## (+) `POST` Forgot Password
```http
  POST /forgot-password
```

Attempts to send a password reset token & link to the specified email in request body, structured as below:
```http
  "email": "sample@example.com"
```

Example **success response:**
```http
  {
    "success": true,
    "message": "Password reset link sent to email successfully",
    "data": {
      "resetToken": "17b6sadfihj23...",
      "resetTokenExpiry": 17187842398683
    }
  }
```

**Note:** make sure to fill the correct values for `GMAIL_USER` & `GMAIL_APP_PASSWORD` in the `.env` file to successfully send the email.

## (+) `PUT` Reset Password
```http
  PUT /reset-password/{{resetToken}}
```

Attempts to do a password change for the user with the specified `{{resetToken}}` (sent by email). Example **request body:**
```http
  {
    "newPassword": "NewPassword200",
    "confirmPassword": "NewPassword200"
  }
```
Example **success response:**
```http
  {
    "success": true,
    "message": "Password reset successfully"
  }
```

## (-) `POST` Predict
```http
  POST /predict
```

Attempts to make a disease prediction from the image specified in `multipart/form-data` request, structured below:
|       Key       |  Type   |
| :-------------: | :-----: |
| `image-predict` | `image` |

Example **success respomse:**
```http
  {
    "success": true,
    "message": "Prediction success",
    "data": {
      "disease": "LeafBlast",
      "confidenceScore": 99.97323155403137,
      "cares": [
        {
          "pictureLink": "https://storage.googleapis.com/...",
          "detail": "Urea, SP-36, ...",
          "title": "Follow the general rice nitrogen fertilisation guidelines"
        },
        {
          "pictureLink": "https://storage.googleapis.com/...",
          "detail": "The SRI planting model ...",
          "title": "Follow general rice spacing guidelines"
        }
      ],
      "impreciseTechniques": [
        {
          "pictureLink": "https://storage.googleapis.com/...",
          "title": "Plant spacing is too tight"
        },
        {
          "pictureLink": "https://storage.googleapis.com/...",
          "title": "Excessive irrigation"
        }
      ],
      "mainCause": {
        "title": "Presence of Pyricularia grisea fungus",
        "pictureLink": "https://storage.googleapis.com/..."
      }
    }
  }
```

## (-) `GET` All Prediction History
```http
  GET /predict/history
```

Attempts to fetch all predictions done for the user.

Example **success response:**
```http
  {
    "success": true,
    "message": "Prediction history fetched successfully",
    "data": [
      {
        "leafPictureLink": "https://storage.googleapis.com/...",
        "createdAt": "2024-06-19T08:08:58.134Z",
        "confidenceScore": 99.97323155403137,
        "disease": "LeafBlast"
      }
    ]
  }
```

Example response if there's **no predictions at all:**
```http
  {
    "success": true,
    "message": "Prediction history fetched successfully",
    "data": []
  }
```

## (-) `GET` All Articles/Blogs
```http
  GET /articles
```

Attempts to fetch all articles/blogs available.

Example **success response:**
```http
  {
    "success": true,
    "message": "Articles fetched successfully",
    "data": [
      {
        "articleId": "aRMsuyf76...",
        "data": {
          "createdAt": {
            "_seconds": 1718765390,
            "_nanoseconds": 201000000
          },
          "pictureLink": "https://storage.googleapis.com/...",
          "category": "News",
          "title": "Sample Title",
          "content": "Lorem ipsum dolor.\\nSit amet consectetur."
        }
      },
      {
        "articleId": "...",
        "data": {
          "createdAt": { ... }
          "pictureLink": "...",
          "category": "...",
          "title": "...",
          "content": "..."
        }
      }
    ]
  }
```

Example response if there's **no articles at all:**
```http
  {
    "success": true,
    "message": "Articles fetched successfully",
    "data": []
  }
```

## (-) `GET` All Articles by Category
```http
  GET /articles?category={{num}}
```
where `{{num}}` represents the categories available (`1` for **"News"** and `2` for **"Care Tips"**).

Attempts to fetch all articles with given category. Success response structure is **the same as "Get All Articles/Blogs"**

## (-) `GET` Article Detail by `articleId`
```http
  GET /articles/{{articleId}}
```
Attempts to fetch a(n) article/blog details by its ID.

Example **success response:**
```http
  {
    "success": true,
    "message": "Articles fetched successfully",
    "data": {
      "articleId": "aRMsuyf76...",
      "data": {
        "createdAt": {
          "_seconds": 1718765390,
          "_nanoseconds": 201000000
        },
        "pictureLink": "https://storage.googleapis.com/...",
        "category": "News",
        "title": "Sample Title",
        "content": "Lorem ipsum dolor.\\nSit amet consectetur."
      }
    }
  }
```

## (-) `PUT` Like/Unlike Article/Blog (from 'P-Blog' List Page)
```http
  PUT /articles/like
```

Attempts to add the specified article/blog to favorites. Example **request body:**
```http
  {
    "articleId": "hjAV4...",
    "userId": "0j8aLW..."
  }
```

Example **success response:**
```http
  {
    "success": true,
    "message": "Article liked/disliked successfully",
    "data": {
      "articleId": "hjAV4..."
    }
  }
```

## (-) `PUT` Like/Unlike Article/Blog (from Article/BLog Details Page)
```http
  PUT /articles/{{articleId}}/like
```

Attempts to add the specified article/blog `{{articleId}}` to favorites. Example **request body & success response** is the same as above "Like/Unlike Article/Blog (from 'P-Blog' List Page)".

## (-) `GET` Liked/Favorite Articles/Blogs
```http
  GET /articles/liked?userId={{userId}}
```

Attempts to fetch all the favorite articles for the user specified with `{{userId}}` query parameter.

Example **success response** is the same as "GET All Articles/Blogs" request.

## (-) `POST` Create a New Reminder
```http
  POST /reminders
```

Attempts to create a new reminder schedule from the specified **request body:**
```http
  {
    "title": "Sample Reminder",
    "activities": ["Water", "Fertilize"],
    "time": "June 19, 2024, 09.49.32.288 PM",
    "repeatEvery": 7,
    "isActive": true
  }
```

Example **success response:**
```http
  {
    "success": true,
    "message": "Reminder created/edited successfully",
    "data": {
      "reminderId": "u92bIno...",
      [ all the request body properties ]
    }
  }
```

## (-) `GET` All Active Reminders
```http
  GET /reminders
```

Attempts to fetch all the active reminders of a user.

Example **success response:**
```http
{
  "success": true,
  "message": "Reminders fetched successsfully",
  "data": [
    {
      "activities": ["Water", "Fertilize"],
      "repeatEvery": 7,
      "time": "June 19, 2024, 09.49.32.288 PM",
      "title": "Sample Reminder",
      "isActive": true
    },
    {
      [ another reminder, if any ]
    }
  ]
}
```

If there's no reminder created yet, then `data` will contain an empty array `[]`.

## (-) `GET` Reminder Detail by `reminderId`
```http
  GET /reminders/{{reminderId}}
```

Attempts to fetch the reminder details for a certain `reminderId`

Example **success response structrue** is the same as above "GET All Active Reminders", but `data` will only contain an object `{}` with reminder properties & values.

## (-) `PUT` Edit a Reminder
```http
  PUT /reminders/{{reminderId}}/edit
```

Attemps to edit a certain `reminderId` data with the new data specified in the **same request body** as "POST Create a New Reminder" request.

## (-) `GET` Finish a Reminder
```http
  GET /reminders/{{reminderId}}/finish
```

Attempts to finish a certain reminder, specified by `{{reminderId}}`.

**Success response structure** is the same as "GET Reminder Detail", but `isActive` property will have `false` value.

## (-) `GET` Reminder History
```http
  GET /reminders/history
```

Attempts to fetch all the finished reminders for a certain user.

Example **success response structure** is the same as "GET All Active Reminders", except the `isActive` properties will all have `false` values.

## (-) `DELETE` Delete a Reminder
```http
  DELETE /reminders/{{reminderId}}
```

Attempts to delete a certain reminder by its `{{reminderId}}`.

Example **success response:**
```http
  {
    "success": true,
    "message": "Reminder deleted successfully"
  }
```

## (-) `GET` Profile Data
```http
  GET /profile
```

Attempts to fetch the user's profile data.

Example **success response:**
```http
  {
    "success": true,
    "message": "Profile fetched successfully",
    "data": {
      "userId": "a1b2c3d4e5",
      "email": "sample@example.com",
      "fullName": "Sample User",
      "profpicLink": "https://storage.googleapis.com/..."
    }
  }
```

## (-) `PUT` Edit Profile Data
```http
  PUT /profile/edit
```

Attempts to edit the user's profile data with the specified data in `multipart/form-data` request:
|       Key       |   Type   |
| :-------------: | :------: |
| `image-profile` | `image`  |
|   `fullName`    | `String` |
|     `email`     | `String` |

Example **success response:**
```http
  {
    "success": true,
    "message": "Profile edited successfully"
  }
```

## (-) `POST` Send Chat to Chatbot
```http
  POST /chat
```

Attempts to send a chat request to Chatbot's API. Example **request body:**
```http
  {
    "message": "How to create a new reminder in this app?"
  }
```

Example **response body structure:**
```http
  {
    "success": true,
    "message": "Success get response from chatbot",
    "data": {
      "response": "To create a new reminder, go to the ..."
    }
  }
```