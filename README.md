# Every Day Strive Living - Gym Trainer Website

A modern, responsive website for personal trainer Bibhas Dastidar featuring user authentication, appointment booking, and MySQL database integration.

## Features

- **User Authentication**: Email/password registration and login
- **MySQL Database**: Local database integration for user data and bookings
- **Appointment Booking**: Interactive calendar for session booking
- **User Dashboard**: View personal bookings and profile
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT tokens, bcrypt password hashing
- **Icons**: Lucide React

## Prerequisites

- Node.js (version 16 or higher)
- MySQL Server (version 8.0 or higher)
- npm (comes with Node.js)

## Installation & Setup

### 1. Install Node.js
- Visit [nodejs.org](https://nodejs.org/)
- Download and install the LTS version
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Install MySQL
- Download MySQL from [mysql.com](https://dev.mysql.com/downloads/)
- Install MySQL Server and MySQL Workbench (optional GUI)
- Remember your root password during installation

### 3. Setup Database
1. Open MySQL command line or MySQL Workbench
2. Run the SQL commands from `database-setup.sql` file:
   ```sql
   CREATE DATABASE IF NOT EXISTS gym_trainer_db;
   USE gym_trainer_db;
   -- (run all commands from database-setup.sql)
   ```

### 4. Configure Environment Variables
1. Copy the `.env` file and update with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=gym_trainer_db
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3001
   ```

### 5. Install Dependencies
```bash
npm install
```

### 6. Start the Application

**Terminal 1 - Start Backend Server:**
```bash
npm run server
```

**Terminal 2 - Start Frontend Development Server:**
```bash
npm run dev
```

### 7. Access the Website
- Frontend: Open `http://localhost:5173` in your browser
- Backend API: Running on `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Bookings
- `GET /api/bookings` - Get user's bookings (authenticated)
- `POST /api/bookings` - Create new booking (authenticated)
- `GET /api/bookings/all` - Get all booked slots (public)

### User
- `GET /api/user/profile` - Get user profile (authenticated)

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `password` - Hashed password
- `name` - Full name
- `phone` - Phone number (optional)
- `created_at` - Registration timestamp
- `updated_at` - Last update timestamp

### Bookings Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `date` - Booking date
- `time` - Booking time
- `service` - Type of training service
- `status` - Booking status (confirmed/cancelled)
- `created_at` - Booking creation timestamp
- `updated_at` - Last update timestamp

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- SQL injection prevention
- CORS configuration

## Deployment

### For Production Deployment:

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Set up production database:**
   - Create MySQL database on your hosting provider
   - Update `.env` with production database credentials

3. **Deploy backend:**
   - Upload server files to your hosting provider
   - Install dependencies: `npm install --production`
   - Start server: `npm run server`

4. **Deploy frontend:**
   - Upload `dist` folder contents to your web hosting service
   - Configure your web server to serve the React app

## Troubleshooting

### Common Issues:

1. **MySQL Connection Error:**
   - Verify MySQL is running
   - Check credentials in `.env` file
   - Ensure database exists

2. **Port Already in Use:**
   - Change PORT in `.env` file
   - Kill existing processes using the port

3. **Authentication Issues:**
   - Clear browser localStorage
   - Check JWT_SECRET in `.env`
   - Verify token expiration

## Support

For any issues or questions, please contact Bibhas Dastidar at +91 9740130705

## License

© 2025 Every Day Strive Living. All rights reserved.