# Backend code link - https://github.com/Shivam2534/The_Social_Network_Backend

# Social Media Application

A full-featured social media application with functionalities for posting, chatting,searching,updating,deleteing,real time like,comment,follow,unfollow and more. This project is built using modern web technologies including React, Node.js, Express, MongoDB, and WebSocket(Chat Engine) for real-time communication.

## Features

- User Authentication (Login, Signup)
- Create, Read, Update, and Delete Posts
- Real-time Chat one to one or with group chat Functionality
- multiple images/videos can be uploaded at a time
- Like and Comment on Posts
- follow and unfollow any user
- user account can be check by clicking on the profile of user

## Technologies Used

- Frontend: React, Vite, Tailwind CSS,
- Backend: Node.js, Express
- Database: MongoDB
- Real-time Communication: WebSocket(Chat Engine)
- libraries: Shadcn UI
- Deployment: Heroku (Backend) (frontend not deployed)

## Setup Instructions

Follow these steps to set up and run the project locally.

- i have deployed Frontend and Backend in different repositorys.

### Installation

1. **Clone the Frontend of repository**

   ```sh
   
   https://github.com/Shivam2534/The_Social_Network_Frontend.git

   - Install dependencies: npm install

   - run the frontend: npm run dev

   ```

2. **Clone the Backend of repository**

   https://github.com/Shivam2534/The_Social_Network_Backend.git

- Install dependencies: npm install

- Create a `.env` file in the `Backend` directory and add the following environment  variables:

  PORT = 8000
  MONGODB_URI =""
  CORS_ORIGIN = *

  ACCESS_TOKEN_SECRET = 
  ACCESS_TOKEN_EXPIRY = 

  REFRESH_TOKEN_SECRET = 
  REFRESH_TOKEN_EXPIRY = 

  CLOUDINARY_CLOUD_NAME = youtube-cloud-content
  CLOUDINARY_API_KEY = 
  CLOUDINARY_API_SECRET = 

- Start the backend server:

  ```sh
  npm run dev
  ```

3. **Demo Accounts**
    ```sh
   -  fisrt account
   1. usermame - shivam_iitr
   2. email- shivamkanchole2002@gmail.com
   3. pass - 12345
    ```

   ```sh
   -  second account
   1. usermame - lalu_iitr
   2. email- lalu@gmail.com
   3. pass - 12345
   ```

