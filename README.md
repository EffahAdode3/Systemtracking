  Backend Shipment Tracking System 

  
Shipment Tracking System
Description
The Shipment Tracking System is a web application designed to streamline the process of tracking shipments. The system enables both staff members and clients to monitor the status and location of shipments in real-time. The application is built using Vue.js for the frontend, Node.js for the backend, and MySQL for the database, ensuring a robust and scalable solution for tracking shipments efficiently.

     Key Features :
1 User Authentication
Secure login and access for staff members and clients using JWT.
Shipment Tracking

2 Clients can enter a tracking number to view the current status and location of their shipments.
Admin Panel

3 A dashboard for admin users to manage shipments.
Admins can add new shipments, update details, and mark shipments as delivered.
Notifications

4 Automated email  to clients when there are updates on their shipments ( out for delivery, delivered).
Reporting

5 Generate detailed reports on shipment statuses, delivery times, and more.

6 Admins can export reports in multiple formats ( Excel) for further analysis.

Technical Stack

Backend
1 Node.js for RESTful API development.

2 Database
MySQL for data storage and management.
Additional Tools

4. Axios for API calls.
JWT for secure authentication.
Nodemailer for sending email notifications.

Installation of the backend project


Clone the repository
https://github.com/EffahAdode3/Systemtracking.git

Navigate to the project directory:
cd Systemtracking

Install backend dependencies:
npm install


Set up the MySQL database

1 Create a database in MySQL.
2 Update the .env file with your database credentials.

Run the backend server:
npm start

User Authentication:

1 Register and log in as a client or staff member to access the system.
Track Shipments:

2 Enter a tracking number to view the status and location of your shipment.
  Admin Panel:

3 Admin users can manage shipments, view reports, and send notifications from the admin dashboard.


