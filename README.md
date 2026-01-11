# KPPMCH Patient Register
**Hospital Digital Intake and Pre-Registration System**

A high-performance enterprise solution engineered for Kamphaeng Phet Municipality Community Hospital (KPPMCH). This system digitizes the patient intake process, leveraging a serverless architecture to bridge modern web interfaces with accessible cloud data management.

---

### Project Specification
| Category | Detail |
| :--- | :--- |
| **Project Name** | KPPMCH Patient Register |
| **Organization** | Kamphaeng Phet Municipality Community Hospital (KPPMCH) |
| **Developer** | Ratchanon Noknoy, B.Sc. (Software Engineering) |
| **Primary Framework** | Next.js 14+ (App Router Architecture) |
| **API Middleware** | Google Apps Script (RESTful API Layer) |
| **Database Engine** | Google Sheets (Serverless Data Store) |

---

### System Architecture & Design Patterns

The application is built on a **Decoupled Serverless Architecture**, ensuring high availability and zero-cost infrastructure maintenance for the organization:

#### 1. Presentation Layer (Frontend)
* **Next.js App Router:** Implements advanced routing and Server-Side Rendering (SSR) to ensure rapid initial page loads.
* **Tailwind CSS Architecture:** Utilizes a utility-first styling approach for a fully responsive, mobile-optimized registration interface.
* **Component-Based Design:** Modular UI structure allowing for rapid scaling and integration with existing Hospital Information Systems (HIS).

#### 2. API & Integration Layer (Google Apps Script)
* **RESTful API Proxy:** Google Apps Script (GAS) acts as a secure API gateway, handling `POST` requests from the Next.js frontend.
* **Data Controller:** The GAS layer executes server-side logic to process, sanitize, and append patient data to the repository.
* **Cross-Origin Resource Sharing (CORS):** Managed through GAS to ensure secure communication between the Vercel-hosted frontend and the Google ecosystem.

#### 3. Data Storage Layer
* **Google Sheets Database:** Utilized as a flexible, real-time database, enabling hospital administrative staff to manage patient records through a familiar interface without requiring database management expertise.



---

### Technical Infrastructure
| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core Engine** | Next.js | High-performance React framework for server-side processing. |
| **API Gateway** | Google Apps Script | Serverless function execution for data handling. |
| **Data Storage** | Google Sheets | Headless CMS and database for non-technical administrative access. |
| **Styling Engine** | Tailwind CSS | Utility-first CSS for consistent and maintainable design systems. |
| **Deployment** | Vercel | Edge computing environment with automated CI/CD integration. |

---

### Operational Impact & Objectives
* **Queue Optimization:** Significantly reduced physical counter congestion by enabling pre-arrival remote registration.
* **Workflow Digitization:** Seamlessly transitioned from manual paper-based forms to a secure digital intake pipeline.
* **Administrative Efficiency:** Streamlined data entry workflows for hospital medical records and administrative staff.
* **High Accessibility:** Optimized for low-bandwidth mobile environments to ensure all demographics can access hospital services 24/7.

---

### System Implementation
| Step | Action | Command |
| :--- | :--- | :--- |
| 1 | Clone Repository | `git clone https://github.com/Ratchanon2318/kppmch-patient-register.git` |
| 2 | Install Dependencies | `npm install` |
| 3 | Production Build | `npm run build` |
| 4 | Execute Development | `npm run dev` |

---

### License
This project is licensed under the **MIT License**.
Copyright (c) 2026 Ratchanon Noknoy. All rights reserved.

---

### Contact Information
* **Software Engineer:** Ratchanon Noknoy, B.Sc. (Software Engineering)
* **LinkedIn:** [linkedin.com/in/ratchanon-noknoy](https://www.linkedin.com/in/ratchanon-noknoy/)
* **Portfolio:** [ratchanonnoknoy.vercel.app](https://ratchanonnoknoy.vercel.app/)
