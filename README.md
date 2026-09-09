# 🏥 Hospital Management System (HMS) - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Mantine UI](https://img.shields.io/badge/Mantine_UI-8.3-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-S3_%2F_CloudFront-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <b>A modern, enterprise-grade digital healthcare platform unifying workflows for Doctors, Nurses, Patients, Pharmacists, and Hospital Administrators.</b>
</p>

[Key Features](#-key-features) •
[Tech Stack](#-tech-stack) •
[Architecture](#-project-architecture) •
[Quick Start](#-getting-started) •
[AWS Cloud Deployment](#-aws-cloud-deployment) •
[Backend Setup](#-backend-integration)

</div>

---

## 🌟 Overview

The **HMS Frontend** provides a unified, responsive, and secure digital platform built with **React 19**, **TypeScript**, and **Mantine UI**. Designed for high performance and seamless user experience, it features role-based access control (RBAC), real-time WebSocket communication, interactive appointment scheduling, electronic medical records (EMR), pharmacy stock management, and AI-powered virtual assistance.

---

## ✨ Key Features

### 🔐 1. User Management & Security (RBAC)
- **Multi-Role Portals:** Tailored user dashboards for `Admin`, `Doctor`, `Nurse`, `Patient`, `Pharmacist`, and `Lab Technician`.
- **Authentication:** JWT-based stateless auth with token refresh, password recovery, and secure route guards.

### 📅 2. Smart Appointment Scheduling
- **Doctor Availability:** Time-slot management with interactive calendar views.
- **Booking Flow:** Patient self-service booking, rescheduling, and status tracking (*Scheduled*, *Completed*, *Cancelled*).

### 🩺 3. Electronic Medical Records (EMR)
- Comprehensive patient medical history, diagnostic reports, treatment plans, and digital prescriptions.
- Downloadable PDF & Excel report exports.

### 💊 4. Pharmacy & Inventory Tracking
- Real-time stock level monitoring with automated low-stock and expiry notifications.
- Direct linkage between doctor prescriptions and pharmacy fulfillment orders.

### 🧪 5. Laboratory Management
- Test order workflow, sample status tracking, and direct result uploads to patient records.

### 🤖 6. AI Virtual Assistant & Real-Time Chat
- AI-powered chatbot assistant for patient navigation and automated healthcare inquiries.
- Real-time WebSocket (`STOMP`/`SockJS`) chat between patients and clinical staff.

### 📊 7. Analytics & Executive Dashboards
- Visual metrics for hospital revenue, patient throughput, and department performance.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Core Framework** | React 19, TypeScript, React Router v7 |
| **UI Components** | Mantine UI v8, Tabler Icons, Framer Motion |
| **Styling** | Tailwind CSS v3, Vanilla CSS Design System |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`), React Redux |
| **HTTP & API** | Axios, RESTful API Integration |
| **Real-Time Messaging**| SockJS Client, STOMP.js |
| **Testing** | React Testing Library, Jest |
| **Cloud Hosting** | AWS S3 Static Hosting, Amazon CloudFront CDN |

---

## 📁 Project Architecture

```text
d:/HMS/Frontend/
├── public/                # Static assets & HTML template
├── src/
│   ├── components/        # Shared global UI components & layouts
│   ├── features/          # Feature-sliced domain modules
│   │   ├── authentication/# Login, Register, Protected Routes
│   │   ├── dashboard/     # Role-specific dashboards & widgets
│   │   ├── appointment/   # Booking & scheduling logic
│   │   └── promotion/     # Notifications & engagement cards
│   ├── pages/             # Page route components
│   ├── store/             # Redux Toolkit store & global slices
│   ├── utils/             # Helper utilities & API interceptors
│   ├── App.tsx            # Main application router & theme provider
│   ├── index.tsx          # Application entry point with Redux Provider
│   └── setupTests.ts      # Testing setup & polyfills
├── package.json           # Scripts & dependency definitions
└── tsconfig.json          # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lohith895/hms-frontend.git
   cd hms-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

4. **Run Unit Tests:**
   ```bash
   npm test -- --watchAll=false
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## ☁️ AWS Cloud Deployment

The **HMS Frontend** single-page app (SPA) is optimized for deployment on **AWS S3** and distributed globally via **Amazon CloudFront CDN**.

### 1. Build Static Production Artifacts

```bash
npm run build
```
This generates optimized static files inside the `build/` directory.

### 2. AWS S3 Bucket Configuration

1. Create a new AWS S3 bucket (e.g., `hms-frontend-app`).
2. Enable **Static Website Hosting** under Bucket Properties, setting `index.html` as the index document.
3. Upload the build directory using AWS CLI:
   ```bash
   aws s3 sync build/ s3://hms-frontend-app --delete
   ```

### 3. Amazon CloudFront CDN Setup

1. Create a CloudFront Distribution with the S3 bucket as the origin.
2. Set **Custom Error Responses** for 403/404 HTTP status codes to redirect to `/index.html` with 200 OK (required for React Router single-page app routing).
3. Invalidate CDN cache upon new deployment:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

---

## 🔌 Backend Integration

The frontend seamlessly pairs with the **Spring Boot HMS Backend REST API**.

To launch the backend server:

```powershell
# Navigate to the backend directory
cd D:\HMS\Backend\HMS

# Run the Spring Boot application
.\mvnw.cmd spring-boot:run
```

- **Backend Base URL:** `http://localhost:8080`
- **Database:** PostgreSQL / Supabase (Production) / H2 (Development & Testing)
- **API Documentation:** Swagger UI accessible at `http://localhost:8080/swagger-ui.html`

---

<div align="center">
  <sub>Built with ❤️ for modern healthcare digital transformation.</sub>
</div>