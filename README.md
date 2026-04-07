# PathFinder AI: Cognitive Telemetry & Occupational Mapping

### Technical Documentation and Architectural Overview

PathFinder AI is a high-performance career diagnostic engine designed to bypass the inherent biases of self-reported vocational interest surveys. By utilizing real-time behavioral telemetry captured during interactive cognitive tasks, the system maps user performance against the **O*NET (Occupational Information Network)** database and the **RIASEC (Holland Codes)** psychological framework.

---

## 1. Core Methodology

Standard career assessments rely on "self-perception," which is frequently inaccurate. PathFinder AI utilizes **Behavioral Proxy Tasks** to measure objective cognitive output:

* **Algorithmic Sequencing:** Measures deductive reasoning, pattern recognition, and execution speed.
* **Tactical Scenarios:** Evaluates risk tolerance, leadership inclination, and pragmatic decision-making.
* **Telemetry Capture:** The system records millisecond-level latency (hesitation) and accuracy rates, providing a "Cognitive Footprint" rather than just a score.

---

## 2. System Architecture

The application is built on a decoupled, microservice-oriented architecture to ensure scalability and computational efficiency.

### A. Frontend (React.js SPA)
* **State Management:** High-frequency state updates to track user interaction timers.
* **UI/UX:** Component-based architecture utilizing Tailwind CSS for high-fidelity data visualization.
* **Telemetry Stream:** Packages raw interaction data into structured JSON payloads for backend processing.

### B. Backend (Node.js & Express)
* **Authentication:** Secure JWT (JSON Web Token) implementation with bcrypt password hashing.
* **Data Persistence:** MongoDB Atlas implementation for non-relational storage of user profiles and longitudinal performance data.
* **Middleware:** Custom authorization bouncers to protect user telemetry and PII (Personally Identifiable Information).

### C. AI Engine (Gemini 1.5 Flash Integration)
* **Deterministic Logic:** Configured with a temperature of 0.1 to minimize stochastic variance and prevent "hallucinations."
* **Strict Schema Enforcement:** Utilizes JSON-mode output to ensure 100% compatibility with the frontend data visualization layer.
* **Framework Mapping:** Employs prompt engineering to simulate the O*NET occupational database, mapping cognitive metrics to over 900 distinct job profiles.

---

## 3. Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Language** | JavaScript (ES6+), Python (Optional/Microservice) |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Intelligence** | Google Generative AI (Gemini 1.5 Flash) |
| **DevOps** | Git, NPM, Environment Variable Encapsulation |

---

## 4. API Endpoints

### Authentication Service
* `POST /api/auth/register`: User initialization and credential hashing.
* `POST /api/auth/login`: Identity verification and JWT issuance.
* `GET /api/auth/me`: Protected route for session persistence and profile retrieval.

### AI Processing Service
* `POST /api/ai/analyze`: Accepts telemetry arrays (time-to-complete, error rates, trait-selection) and returns a mapped occupational roadmap.

---

## 5. Future Roadmap: V2.0 Integration

The current MVP serves as a proof-of-concept for the data pipeline. Future iterations will include:
1.  **Vector Database Implementation:** Utilizing Pinecone or Weaviate for RAG (Retrieval-Augmented Generation) directly against the raw O*NET SQL dataset.
2.  **Advanced Telemetry:** Implementation of mouse-tracking heatmaps and spatial reasoning games using Three.js.
3.  **Cross-Model Verification:** Routing requests through a Groq/Llama-3 pipeline for cross-validation of occupational confidence scores.

---

**Developed for the 2026 PathFinder Technical Challenge.**
