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