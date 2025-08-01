# Job Application System with CV Upload and Payment Integration

## Overview

This Job Application System allows **Job Seekers** to apply for jobs by uploading their CVs, paying a fee, and submitting their application. **Employees (Recruiters)** can manage job applications by viewing, accepting, or rejecting them. **Admins** have full access to all functionalities.

---

## Features

- **Job Seekers**:

  - View job listings.
  - Apply for jobs by uploading CVs and paying a fee.
  - View their application history.

- **Employees (Recruiters)**:

  - Post jobs.
  - View applications for the jobs they posted.
  - Accept or reject applications.

- **Admin**:
  - Full access to all features (job management, user management, and application management).

---

## Setup

### Prerequisites

- **Node.js**: Download and install from [https://nodejs.org](https://nodejs.org).
- **MongoDB**: Set up a MongoDB database (locally or using MongoDB Atlas).
- **Stripe**: Set up a Stripe account (optional for real payments).
- **Postman or any HTTP Client**: Use Postman to test the API endpoints.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/arifnayan2861/scaleup-assessment.git

   ```

2. **Install Dependencies**:
   Navigate to the project directory and install the required packages:
   ```bash
   cd job-application-system
   npm install

3. **Configure Environment Variables**:
   Create a .env file in the root directory with the following configuration:
   ```bash
   MONGO_URI=mongodb://localhost:27017/job_application_system
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key (optional for real payments)

4. **Run the Application**:
   Start the server using the following command:
   ```bash
   npm start

The application will run on http://localhost:5000.

## API Endpoints

### Job Seeker (User Role: `jobseeker`)

#### 1. **View Job Listings**

- **Endpoint**: `GET /api/job-seeker/jobs`
- **Description**: Retrieve all job listings.

#### 2. **Apply for a Job**

- **Endpoint**: `POST /api/job-seeker/apply/:jobId`
- **Description**: Apply for a job by uploading a CV and making a payment.
- **Body** (form-data):
  - `cv`: File (PDF/DOCX)
  - `jobId`: The ID of the job to apply for.

#### 3. **View Application History**

- **Endpoint**: `GET /api/job-seeker/application-history`
- **Description**: Retrieve all applications made by the job seeker.

---

### Employee (User Role: `employee`)

#### 1. **View Applications for a Job**

- **Endpoint**: `GET /api/employee/applications/:jobId`
- **Description**: Retrieve all applications for a job posted by the employee.

#### 2. **Accept or Reject an Application**

- **Endpoint**: `PUT /api/employee/applications/:applicationId`
- **Description**: Accept or reject a job application.
- **Request Body**:
  - `action`: `"accept"` or `"reject"`

---

### Admin (User Role: `admin`)

Admins have the same access as employees and can also perform additional administrative tasks.

## Payment Flow

1. **Job Seeker** applies for a job by uploading their CV (PDF/DOCX).
2. **Job Seeker** must pay a **100 Taka** application fee.
   - The payment is processed via a mock payment system (simulated with Stripe in this case).
3. After the payment is successful, the application is saved with the **payment status** as **"paid"**.
4. An **invoice** is created, which contains:
   - The user who made the payment.
   - The amount paid.
   - The time the payment was made.
5. **Employee (Recruiter)** can view applications for jobs they posted and can **accept** or **reject** them.
6. **Job Seekers** can view their application history.
