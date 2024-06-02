# Cineboxd

Cineboxd is a web application where users can search for their favorite movies, create personal movie lists (both private and public), and explore public lists created by other users. This project is built using React, Firebase, and various other modern web development tools.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)

## Features

- User Authentication (Sign Up, Log In, Log Out)
- Search for movies using OMDB API
- Create and manage personal movie lists
- View public movie lists created by other users
- Responsive design

## Screenshots

![Home Screen](path_to_home_screenshot.png)
![Login Screen](path_to_login_screenshot.png)
![Movie List Screen](path_to_movie_list_screenshot.png)
![Create List Screen](path_to_movie_details_screenshot.png)
![Public Lists Screen](path_to_public_lists_screenshot.png)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cineboxd.git
   ```

2. Install the dependencies:

   ```bash
    cd cineboxd
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
4. Generate a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx) and create a new Firebase project.

5. You can create a `.env` file in the root directory of the project and add the firebase configuration and OMDb API key or you can add them directly in the `Firebase.js` and `App.js` files.

6. Start the development server:
   ```bash
   npm start
   ```
7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Sign up for a new account or log in with an existing account.
2. Search for movies using the search bar.
3. Click on a movie to view more details.
4. Add the movie to your personal list by clicking the "Add to List" button.
5. Create a new list by clicking the "Create List" button.
6. View your personal lists by on the "My Lists" tab.
7. View public lists created by other users on the "Lists" tab on the navigation bar.

## Firebase Configuration

To use Firebase in this project, you need to create a new Firebase project and add the configuration to the `Firebase.js` file. You can also add the configuration directly in the `App.js` file.

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Add a web app to your Firebase project.
3. Copy the Firebase configuration object.
4. Add the configuration object to the `Firebase.js` file or the `App.js` file.
