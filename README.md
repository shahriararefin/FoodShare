FoodShare - Surplus Food Donation Platform
FoodShare is a full-stack web application designed to connect food donors (such as individuals, restaurants, and event organizers) with NGOs to efficiently distribute surplus food, fight hunger, and reduce food waste in the community.

Key Features
User Authentication: Secure user sign-up, login, and logout functionality with both email/password and Google Sign-In. Includes email verification and password reset features.

Role-Based Access Control: The application supports three distinct user roles with different permissions:

Donors: Can submit food donation details for review.

NGOs: Can view and claim approved, available donations.

Admins: Can review pending donations and either approve or reject them.

Donation Management: A complete, real-time lifecycle for donations from submission to approval and claiming.

Dashboards & Profiles:

Admin Dashboard: A private dashboard for admins to manage the approval queue.

User Profile: A dedicated page where donors can see the status of their donations and NGOs can see a history of the donations they've claimed.

Real-time Updates: Utilizes Firestore's real-time listeners to instantly update the UI when data changes (e.g., a claimed donation disappears from the available list).

Technology Stack
Frontend:

React (Vite): A modern, fast framework for building user interfaces.

React Router: For client-side routing and navigation.

Tailwind CSS: For utility-first styling.

DaisyUI: A component library for Tailwind CSS.

React Toastify: For user-friendly notifications.

Backend & Database:

Firebase: Used for the entire backend infrastructure.

Firestore: As the NoSQL database for storing user and donation data.

Firebase Authentication: For managing user identity.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18 or later)

A Firebase account (you can create one for free)

Installation
Clone the repository:

Bash

git clone <your-repository-url>
cd <repository-folder>
Install NPM packages:

Bash

npm install
Set up Firebase:

Create a new project in your Firebase Console.

In your project's dashboard, add a new Web App.

You'll be given a firebaseConfig object. Copy these credentials.

Create an environment file:

In the root of your project, create a new file named .env.local.

Copy your firebaseConfig credentials into this file, formatting them as Vite environment variables (prefixed with VITE_).

File: .env.local

Code snippet

VITE_FIREBASE_API_KEY="AIza..."
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="1:..."
Update your firebaseConfig.js file to use these environment variables.

File: src/firebaseConfig.js

JavaScript

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
Run the development server:

Bash

npm run dev
Firebase Project Configuration
For the app to function correctly, you need to configure your Firebase project.

1. Enable Authentication Providers
In your Firebase Console, go to Authentication > Sign-in method.

Enable the Email/Password and Google providers.

2. Set Up Firestore Security Rules
Go to Firestore Database > Rules.

Replace the default rules with the following code and Publish the changes.

JavaScript

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isLoggedIn() { /* ... Helper Functions ... */ }
    function getUserData() { /* ... */ }
    function isAdmin() { /* ... */ }
    function isNgo() { /* ... */ }
    function onlyFieldsChanged(allowedFields) { /* ... */ }

    match /users/{userId} {
      allow read, update: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;
      allow delete: if false;
    }

    match /donations/{donationId} {
      allow read: if isAdmin() 
                   || resource.data.status == 'approved' 
                   || (isLoggedIn() && request.auth.uid == resource.data.donorId)
                   || (isLoggedIn() && request.auth.uid == resource.data.claimedById);

      allow create: if isLoggedIn() && request.resource.data.donorId == request.auth.uid && request.resource.data.status == 'pending';

      allow update: if (isAdmin() && /* ... */) || (isNgo() && /* ... */);

      allow delete: if false;
    }
  }
}
(Note: The full, detailed rules are in our conversation history and should be used here.)

3. Create Firestore Indexes
The application uses several complex queries that require composite indexes. Go to Firestore Database > Indexes and create the following indexes:

Collection: donations | Fields: status (Ascending), createdAt (Ascending)

Collection: donations | Fields: status (Ascending), createdAt (Descending)

Collection: donations | Fields: donorId (Ascending), createdAt (Descending)

Collection: donations | Fields: claimedById (Ascending), createdAt (Descending)