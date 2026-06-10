# Database Schema Documentation

## Overview
Nextgen application uses MongoDB as its database. Below is the complete schema documentation for all collections.

---

## 1. Admin Collection

### Fields:
| Field Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `adminId` | String | ✓ | Unique admin identifier |
| `username` | String | ✓ | Unique username (3-30 chars) |
| `password` | String | ✓ | Encrypted password (min 6 chars) |
| `email` | String | ✓ | Unique email address |
| `role` | String | ✗ | Role type: 'admin' or 'super-admin' |
| `isActive` | Boolean | ✗ | Account status (default: true) |
| `lastLogin` | Date | ✗ | Timestamp of last login |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Example:
```json
{
  "_id": "ObjectId",
  "adminId": "ADM001",
  "username": "john_admin",
  "password": "$2a$10$...", // bcrypt hashed
  "email": "john@example.com",
  "role": "admin",
  "isActive": true,
  "lastLogin": "2026-06-10T10:30:00Z",
  "createdAt": "2026-06-01T00:00:00Z",
  "updatedAt": "2026-06-10T10:30:00Z"
}
```

---

## 2. Course Collection

### Fields:
| Field Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `courseId` | String | ✓ | Unique course identifier |
| `courseName` | String | ✓ | Course name (max 100 chars) |
| `description` | String | ✓ | Course description (max 1000 chars) |
| `duration` | String | ✓ | Duration (e.g., "3 months", "6 weeks") |
| `instructor` | String | ✗ | Instructor name |
| `category` | String | ✗ | Course category |
| `level` | String | ✗ | Level: Beginner, Intermediate, Advanced, Expert |
| `price` | Number | ✗ | Course price (default: 0) |
| `maxStudents` | Number | ✗ | Maximum enrollment limit |
| `enrolledStudents` | Number | ✗ | Current enrollment count |
| `isActive` | Boolean | ✗ | Course status (default: true) |
| `tags` | Array | ✗ | Array of course tags |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Example:
```json
{
  "_id": "ObjectId",
  "courseId": "COURSE001",
  "courseName": "Web Development Basics",
  "description": "Learn HTML, CSS, and JavaScript fundamentals",
  "duration": "3 months",
  "instructor": "Jane Doe",
  "category": "Technology",
  "level": "Beginner",
  "price": 99.99,
  "maxStudents": 50,
  "enrolledStudents": 25,
  "isActive": true,
  "tags": ["web", "html", "css", "javascript"],
  "createdAt": "2026-06-01T00:00:00Z",
  "updatedAt": "2026-06-10T00:00:00Z"
}
```

---

## 3. Student Inquiry Collection

### Fields:
| Field Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `inquiryId` | String | ✓ | Unique inquiry identifier |
| `name` | String | ✓ | Student name (max 50 chars) |
| `email` | String | ✓ | Student email address |
| `mobileNumber` | String | ✓ | Mobile number (10 digits or international format) |
| `course` | ObjectId | ✓ | Reference to Course collection |
| `courseName` | String | ✓ | Course name (denormalized) |
| `message` | String | ✓ | Inquiry message (max 500 chars) |
| `submissionDate` | Date | ✗ | Date of submission (default: now) |
| `status` | String | ✗ | Status: new, contacted, interested, enrolled, rejected |
| `priority` | String | ✗ | Priority: low, medium, high |
| `notes` | String | ✗ | Internal notes/comments |
| `followUpDate` | Date | ✗ | Scheduled follow-up date |
| `isContacted` | Boolean | ✗ | Whether student has been contacted |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Example:
```json
{
  "_id": "ObjectId",
  "inquiryId": "INQ001",
  "name": "John Smith",
  "email": "john@example.com",
  "mobileNumber": "+1234567890",
  "course": "ObjectId_of_course",
  "courseName": "Web Development Basics",
  "message": "I'm interested in this course. Can you provide more details?",
  "submissionDate": "2026-06-10T14:30:00Z",
  "status": "new",
  "priority": "high",
  "notes": "Follow up after 2 days",
  "followUpDate": "2026-06-12T00:00:00Z",
  "isContacted": false,
  "createdAt": "2026-06-10T14:30:00Z",
  "updatedAt": "2026-06-10T14:30:00Z"
}
```

---

## API Endpoints

### Admin Endpoints
```
POST   /api/admins/login              - Admin login
POST   /api/admins                    - Create new admin
GET    /api/admins                    - Get all admins
GET    /api/admins/:id                - Get admin by ID
PUT    /api/admins/:id                - Update admin
PUT    /api/admins/:id/password       - Change password
DELETE /api/admins/:id                - Delete admin
```

### Course Endpoints
```
POST   /api/courses                   - Create new course
GET    /api/courses                   - Get all courses
GET    /api/courses/:id               - Get course by ID
GET    /api/courses/courseId/:courseId - Get course by courseId
GET    /api/courses/filter/active     - Get active courses only
PUT    /api/courses/:id               - Update course
DELETE /api/courses/:id               - Delete course
```

### Student Inquiry Endpoints
```
POST   /api/inquiries                       - Create new inquiry
GET    /api/inquiries                       - Get all inquiries
GET    /api/inquiries/:id                   - Get inquiry by ID
GET    /api/inquiries/course/:courseId      - Get inquiries by course
GET    /api/inquiries/email/:email          - Get inquiries by email
GET    /api/inquiries/stats/summary         - Get inquiry statistics
PUT    /api/inquiries/:id                   - Update inquiry
PATCH  /api/inquiries/:id/status            - Update inquiry status
DELETE /api/inquiries/:id                   - Delete inquiry
```

---

## Data Validation Rules

### Admin Validation:
- ✓ Username must be 3-30 characters
- ✓ Password must be at least 6 characters
- ✓ Email must be valid format
- ✓ AdminId and Username must be unique

### Course Validation:
- ✓ CourseId and CourseName must be unique
- ✓ Description max 1000 characters
- ✓ Level must be: Beginner, Intermediate, Advanced, or Expert

### Student Inquiry Validation:
- ✓ Mobile number must be 10 digits or international format
- ✓ Email must be valid
- ✓ Status must be: new, contacted, interested, enrolled, or rejected
- ✓ Priority must be: low, medium, or high
- ✓ Message max 500 characters

---

## Database Indexes

For optimal performance, the following indexes are created:

### Admin:
- `adminId` (unique)
- `username` (unique)
- `email` (unique)

### Course:
- `courseId` (unique)
- `courseName` (unique)

### Student Inquiry:
- `email` + `submissionDate` (composite)
- `status`
- `course` (for references)

---

## Sample Query Examples

### Create Admin:
```bash
curl -X POST http://localhost:5000/api/admins \
  -H "Content-Type: application/json" \
  -d '{
    "adminId": "ADM001",
    "username": "admin",
    "password": "password123",
    "email": "admin@example.com"
  }'
```

### Create Course:
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "COURSE001",
    "courseName": "Web Development",
    "description": "Learn web development from scratch",
    "duration": "3 months",
    "level": "Beginner"
  }'
```

### Create Inquiry:
```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "inquiryId": "INQ001",
    "name": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "9876543210",
    "course": "COURSE001_OBJECTID",
    "courseName": "Web Development",
    "message": "I am interested in this course"
  }'
```

---

## MongoDB Atlas Connection

Once connected to MongoDB Atlas, collections are auto-created when the first document is inserted.

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/nextgen?retryWrites=true&w=majority
```

See `MONGODB_ATLAS_SETUP.md` for detailed setup instructions.
