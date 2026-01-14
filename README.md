# GigFlow

GigFlow is a freelance marketplace platform where clients can post gigs and freelancers can bid on them.

## Features

- **User Authentication**: Secure signup and login for clients and freelancers.
- **Gig Management**:
  - Clients can create and post new gigs with detailed descriptions and budgets.
  - Users can view a list of available gigs.
  - Detailed view for each gig.
- **Bidding System**:
  - Freelancers can place bids on gigs.
  - Clients can view bids received on their gigs.
- **Responsive Design**: Modern and clean UI built with Tailwind CSS.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installed)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pranshu00000/GigFlow
    cd GigFlow
    ```

2.  **Setup Backend:**

    - Navigate to the server directory:
      ```bash
      cd server
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `server` directory and add your environment variables:
      ```env
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ```
    - Start the server:
      ```bash
      npm start
      ```

3.  **Setup Frontend:**

    - Navigate to the client directory:
      ```bash
      cd ../client
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm run dev
      ```

4.  **Open the App:**

    - Visit `http://localhost:5173` (or the port shown in your terminal) in your browser.

## API Endpoints

- **Auth**:
  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Login user
  - `GET /api/auth/profile`: Get user profile
  - `POST /api/auth/logout`: Logout user

- **Gigs**:
  - `POST /api/gigs`: Create a new gig
  - `GET /api/gigs`: Get all gigs
  - `GET /api/gigs/:id`: Get a specific gig

- **Bids**:
  - `POST /api/bids/:gigId`: Place a bid on a gig
  - `GET /api/bids/:gigId`: Get all bids for a gig
