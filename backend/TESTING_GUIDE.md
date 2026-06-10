# Quick Testing Guide

## Prerequisites

Before testing, ensure:
1. ✅ Dependencies installed: `npm install`
2. ✅ `.env` file created with MongoDB URI
3. ✅ Backend server running: `npm run dev`
4. ✅ MongoDB connection is active

---

## 1. Test Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-06-10T14:30:00Z"
}
```

---

## 2. Admin Operations

### Create Admin
```bash
curl -X POST http://localhost:5000/api/admins \
  -H "Content-Type: application/json" \
  -d '{
    "adminId": "ADM001",
    "username": "admin",
    "password": "Admin@123",
    "email": "admin@nextgen.com"
  }'
```

**Expected Response:**
```json
{
  "message": "Admin created successfully",
  "admin": {
    "_id": "ObjectId...",
    "adminId": "ADM001",
    "username": "admin",
    "email": "admin@nextgen.com",
    "role": "admin"
  }
}
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admins/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

### Get All Admins
```bash
curl http://localhost:5000/api/admins
```

### Get Specific Admin
```bash
curl http://localhost:5000/api/admins/ADMIN_ID
```

### Update Admin
```bash
curl -X PUT http://localhost:5000/api/admins/ADMIN_ID \
  -H "Content-Type: application/json" \
  -d '{
    "username": "new_username",
    "email": "newemail@example.com"
  }'
```

### Change Password
```bash
curl -X PUT http://localhost:5000/api/admins/ADMIN_ID/password \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "Admin@123",
    "newPassword": "NewPassword@123"
  }'
```

### Delete Admin
```bash
curl -X DELETE http://localhost:5000/api/admins/ADMIN_ID
```

---

## 3. Course Operations

### Create Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "WEB001",
    "courseName": "Web Development Fundamentals",
    "description": "Learn HTML, CSS, JavaScript, and responsive design",
    "duration": "3 months",
    "instructor": "John Doe",
    "category": "Technology",
    "level": "Beginner",
    "price": 99.99,
    "maxStudents": 50,
    "tags": ["web", "html", "css", "javascript"]
  }'
```

**Expected Response:**
```json
{
  "message": "Course created successfully",
  "course": {
    "_id": "ObjectId...",
    "courseId": "WEB001",
    "courseName": "Web Development Fundamentals",
    ...
  }
}
```

### Get All Courses
```bash
curl http://localhost:5000/api/courses
```

### Get Courses with Filters
```bash
# Get only active courses
curl "http://localhost:5000/api/courses?isActive=true"

# Get beginner courses
curl "http://localhost:5000/api/courses?level=Beginner"

# Get courses in Technology category
curl "http://localhost:5000/api/courses?category=Technology"
```

### Get Active Courses Only
```bash
curl http://localhost:5000/api/courses/filter/active
```

### Get Course by MongoDB ID
```bash
curl http://localhost:5000/api/courses/COURSE_MONGODB_ID
```

### Get Course by courseId
```bash
curl http://localhost:5000/api/courses/courseId/WEB001
```

### Update Course
```bash
curl -X PUT http://localhost:5000/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "enrolledStudents": 30,
    "price": 79.99,
    "isActive": true
  }'
```

### Delete Course
```bash
curl -X DELETE http://localhost:5000/api/courses/COURSE_ID
```

---

## 4. Student Inquiry Operations

### Create Inquiry

First, get a course ID from your courses:
```bash
curl http://localhost:5000/api/courses | grep '"_id"'
```

Then create inquiry:
```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "inquiryId": "INQ001",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "mobileNumber": "9876543210",
    "course": "PASTE_COURSE_MONGODB_ID_HERE",
    "courseName": "Web Development Fundamentals",
    "message": "I am very interested in this course. Can you provide more information about the curriculum?"
  }'
```

**Expected Response:**
```json
{
  "message": "Student inquiry created successfully",
  "inquiry": {
    "_id": "ObjectId...",
    "inquiryId": "INQ001",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "mobileNumber": "9876543210",
    "status": "new",
    "priority": "medium",
    ...
  }
}
```

### Get All Inquiries
```bash
curl http://localhost:5000/api/inquiries
```

### Get Inquiries with Filters
```bash
# Get new inquiries
curl "http://localhost:5000/api/inquiries?status=new"

# Get high priority inquiries
curl "http://localhost:5000/api/inquiries?priority=high"

# Get contacted inquiries
curl "http://localhost:5000/api/inquiries?isContacted=true"

# Get inquiries for specific course
curl "http://localhost:5000/api/inquiries?course=COURSE_MONGODB_ID"
```

### Get Inquiries by Course
```bash
curl http://localhost:5000/api/inquiries/course/COURSE_MONGODB_ID
```

### Get Inquiries by Email
```bash
curl http://localhost:5000/api/inquiries/email/jane@example.com
```

### Get Inquiry Statistics
```bash
curl http://localhost:5000/api/inquiries/stats/summary
```

**Expected Response:**
```json
{
  "totalInquiries": 5,
  "contacted": 2,
  "byStatus": [
    { "_id": "new", "count": 3 },
    { "_id": "contacted", "count": 2 }
  ],
  "byPriority": [
    { "_id": "high", "count": 2 },
    { "_id": "medium", "count": 3 }
  ]
}
```

### Get Specific Inquiry
```bash
curl http://localhost:5000/api/inquiries/INQUIRY_MONGODB_ID
```

### Update Inquiry
```bash
curl -X PUT http://localhost:5000/api/inquiries/INQUIRY_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "priority": "high",
    "notes": "Called the student, very interested",
    "followUpDate": "2026-06-15T00:00:00Z"
  }'
```

### Update Inquiry Status Only
```bash
curl -X PATCH http://localhost:5000/api/inquiries/INQUIRY_ID/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "interested"
  }'
```

**Valid Status Values:**
- `new` - New inquiry
- `contacted` - Contacted student
- `interested` - Student showed interest
- `enrolled` - Student enrolled
- `rejected` - Not interested

### Delete Inquiry
```bash
curl -X DELETE http://localhost:5000/api/inquiries/INQUIRY_ID
```

---

## Testing with Postman or Insomnia

Instead of curl, you can use Postman or Insomnia:

1. Create new collection: "Nextgen API"
2. Add base URL: `http://localhost:5000/api`
3. Create folders: Admins, Courses, Inquiries
4. Add requests for each operation above

**Environment Variables in Postman:**
```json
{
  "base_url": "http://localhost:5000/api",
  "admin_id": "ADMIN_MONGODB_ID",
  "course_id": "COURSE_MONGODB_ID",
  "inquiry_id": "INQUIRY_MONGODB_ID"
}
```

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Connection refused | MongoDB not running | Check MongoDB Atlas/local connection |
| 400 Bad Request | Missing required fields | Check request body fields |
| 401 Unauthorized | Wrong password | Verify credentials |
| 404 Not Found | Resource doesn't exist | Check if ID is correct |
| 409 Conflict | Duplicate unique field | Use different value |
| 500 Server Error | Server issue | Check console logs |

---

## Tips for Testing

1. **Save IDs**: After creating resources, save their IDs for later use
2. **Test sequence**: Create → Read → Update → Delete
3. **Use filters**: Test query parameters and filters
4. **Check validation**: Try invalid data to test validation
5. **Monitor logs**: Watch backend console for errors

---

## Database Verification

To verify data is saved in MongoDB Atlas:

1. Go to MongoDB Atlas Dashboard
2. Click your cluster
3. Navigate to "Collections" tab
4. You should see:
   - `nextgen.admins`
   - `nextgen.courses`
   - `nextgen.studentinquiries`

---

**Status:** ✅ Ready for testing!
