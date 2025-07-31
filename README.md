🌮 FoodShare - Surplus Food Donation Platform
A full-stack web application designed to connect food donors with NGOs to efficiently distribute surplus food, fight hunger, and reduce food waste in the community.

✨ Key Features
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

🚀 Technology Stack
Frontend
Framework: React (via Vite)

Routing: React Router

Styling: Tailwind CSS with the DaisyUI component library

Notifications: React Toastify

Backend & Database
Platform: Firebase

Database: Cloud Firestore (NoSQL)

Authentication: Firebase Authentication