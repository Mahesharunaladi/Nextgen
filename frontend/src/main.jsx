import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const fallbackCourses = [
  {
    _id: "full-stack-web-development",
    title: "Full Stack Web Development",
    tag: "Web",
    duration: "6 months",
    overview:
      "A project-led program for building complete web applications from responsive interfaces to production-ready APIs.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git"],
    outcomes: [
      "Build responsive websites and single-page applications",
      "Create REST APIs and connect them with databases",
      "Deploy full stack projects and manage source control",
    ],
    careers: ["Frontend Developer", "Backend Developer", "MERN Stack Developer", "Junior Web Developer"],
  },
  {
    _id: "python-programming",
    title: "Python Programming",
    tag: "Programming",
    duration: "4 months",
    overview:
      "A beginner-friendly path covering Python fundamentals, automation, data handling, and real coding practice.",
    technologies: ["Python", "OOP", "File Handling", "APIs", "SQLite", "Flask Basics", "Git"],
    outcomes: [
      "Write clean Python programs with functions and classes",
      "Automate routine tasks and process structured data",
      "Create mini applications and backend utilities",
    ],
    careers: ["Python Developer", "Automation Trainee", "Backend Intern", "Software Developer Trainee"],
  },
  {
    _id: "java-development",
    title: "Java Development",
    tag: "Software",
    duration: "5 months",
    overview:
      "A structured Java course focused on object-oriented programming, backend fundamentals, and interview-ready concepts.",
    technologies: ["Core Java", "OOP", "Collections", "JDBC", "MySQL", "Spring Boot Basics", "Git"],
    outcomes: [
      "Develop strong object-oriented programming habits",
      "Work with databases using Java applications",
      "Understand backend service patterns and project structure",
    ],
    careers: ["Java Developer", "Backend Developer Trainee", "Application Developer", "Software Engineer Intern"],
  },
  {
    _id: "data-science",
    title: "Data Science",
    tag: "Data",
    duration: "6 months",
    overview:
      "A practical analytics program covering data cleaning, visualization, statistics, and machine learning foundations.",
    technologies: ["Python", "NumPy", "Pandas", "Matplotlib", "SQL", "Statistics", "Scikit-learn"],
    outcomes: [
      "Clean, transform, and analyze real datasets",
      "Create dashboards and visual reports",
      "Build beginner machine learning models",
    ],
    careers: ["Data Analyst", "Junior Data Scientist", "Business Analyst", "ML Trainee"],
  },
];

const emptyCourse = {
  title: "",
  tag: "",
  duration: "",
  overview: "",
  technologies: "",
  outcomes: "",
  careers: "",
};

const testimonials = [
  {
    name: "Ananya R.",
    role: "Full Stack Student",
    quote:
      "The project reviews helped me understand what companies expect. I finished with a portfolio I could confidently explain.",
  },
  {
    name: "Rohit S.",
    role: "Python Intern",
    quote:
      "Mentors kept the learning practical. Every week had tasks, feedback, and a clear reason behind what we were building.",
  },
  {
    name: "Meera K.",
    role: "Data Science Learner",
    quote:
      "The course moved from basics to real datasets smoothly. It made interviews feel much less intimidating.",
  },
];

const values = ["Practical learning", "Mentor guidance", "Career clarity", "Ethical technology", "Student-first support"];

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

function courseToForm(course) {
  return {
    title: course.title || "",
    tag: course.tag || "",
    duration: course.duration || "",
    overview: course.overview || "",
    technologies: (course.technologies || []).join(", "),
    outcomes: (course.outcomes || []).join(", "),
    careers: (course.careers || []).join(", "),
  };
}

function formToCourse(form) {
  const toList = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);
  return {
    ...form,
    technologies: toList(form.technologies),
    outcomes: toList(form.outcomes),
    careers: toList(form.careers),
  };
}

function App() {
  const [page, setPage] = useState("home");
  const [courses, setCourses] = useState(fallbackCourses);
  const [selectedCourseId, setSelectedCourseId] = useState(fallbackCourses[0]._id);
  const [inquiryStatus, setInquiryStatus] = useState("");
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem("nextgenAdminToken") || "");
  const [adminName, setAdminName] = useState(() => localStorage.getItem("nextgenAdminName") || "");

  const activeCourse = useMemo(
    () => courses.find((course) => course._id === selectedCourseId) || courses[0],
    [courses, selectedCourseId]
  );

  async function loadCourses() {
    try {
      const nextCourses = await apiRequest("/courses");
      if (nextCourses.length) {
        setCourses(nextCourses);
        setSelectedCourseId((current) => nextCourses.find((course) => course._id === current)?._id || nextCourses[0]._id);
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  function navigate(nextPage, courseId) {
    setPage(nextPage);
    if (courseId) setSelectedCourseId(courseId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleInquiry(event) {
    event.preventDefault();
    setInquiryStatus("Submitting...");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      mobile: form.get("mobile"),
      courseInterestedIn: form.get("courseInterestedIn"),
      message: form.get("message"),
    };

    try {
      await apiRequest("/inquiries", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setInquiryStatus("Thank you. Your inquiry has been recorded.");
      event.currentTarget.reset();
    } catch (error) {
      setInquiryStatus(error.message);
    }
  }

  function handleAdminLogin(token, username) {
    localStorage.setItem("nextgenAdminToken", token);
    localStorage.setItem("nextgenAdminName", username);
    setAdminToken(token);
    setAdminName(username);
  }

  async function handleAdminLogout() {
    try {
      await apiRequest("/auth/logout", { method: "POST", token: adminToken });
    } catch (error) {
      console.warn(error.message);
    }
    localStorage.removeItem("nextgenAdminToken");
    localStorage.removeItem("nextgenAdminName");
    setAdminToken("");
    setAdminName("");
  }

  return (
    <>
      <header className="topbar">
        <button className="brand" type="button" onClick={() => navigate("home")} aria-label="NextGen Institute home">
          <span className="brand-mark">N</span>
          <span>
            <strong>NextGen Institute</strong>
            <small>IT Training & Internships</small>
          </span>
        </button>
        <nav aria-label="Primary navigation">
          {["home", "about", "courses", "internship", "contact", "admin"].map((item) => (
            <button className={page === item ? "active" : ""} key={item} type="button" onClick={() => navigate(item)}>
              {item === "home" ? "Home" : item}
            </button>
          ))}
        </nav>
        <button className="nav-cta" type="button" onClick={() => navigate("contact")}>
          Enquire Now
        </button>
      </header>

      <main>
        {page === "home" && (
          <>
            <Hero navigate={navigate} />
            <InstituteIntro />
            <WhyChooseUs />
            <FeaturedCourses courses={courses} navigate={navigate} />
            <InternshipPreview navigate={navigate} />
            <Testimonials />
            <ContactInquiryForm courses={courses} handleInquiry={handleInquiry} inquiryStatus={inquiryStatus} compact />
          </>
        )}

        {page === "about" && <AboutPage />}
        {page === "courses" && <CoursesPage courses={courses} navigate={navigate} />}
        {page === "courseDetails" && activeCourse && <CourseDetailsPage course={activeCourse} navigate={navigate} />}
        {page === "internship" && <InternshipPage navigate={navigate} />}
        {page === "contact" && (
          <ContactPage courses={courses} handleInquiry={handleInquiry} inquiryStatus={inquiryStatus} />
        )}
        {page === "admin" && (
          <AdminPage
            adminName={adminName}
            courses={courses}
            loadCourses={loadCourses}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            token={adminToken}
          />
        )}
      </main>

      <footer>
        <div>
          <strong>NextGen Institute</strong>
          <p>Career-focused IT training, internships, and placement preparation.</p>
        </div>
        <button type="button" onClick={() => navigate("home")}>
          Back to top
        </button>
      </footer>
    </>
  );
}

function Hero({ navigate }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Professional IT training institute</p>
        <h1>Build job-ready technology skills with guided courses and internships.</h1>
        <p>
          Learn from mentors, practice through real projects, and prepare for software, data, AI, and digital careers with
          a clear path from classroom learning to portfolio work.
        </p>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={() => navigate("courses")}>
            Explore Courses
          </button>
          <button className="button secondary" type="button" onClick={() => navigate("contact")}>
            Book Free Demo
          </button>
        </div>
      </div>
      <div className="hero-photo" aria-label="Students learning technology in a classroom">
        <div className="hero-badge">
          <strong>1,000+</strong>
          <span>Students guided</span>
        </div>
      </div>
    </section>
  );
}

function InstituteIntro() {
  return (
    <section className="intro-section">
      <div>
        <p className="eyebrow">Institute introduction</p>
        <h2>Training built around practice, mentorship, and career readiness.</h2>
      </div>
      <p>
        NextGen Institute helps students, graduates, and working learners strengthen technical foundations through
        structured courses, live assignments, project reviews, internship support, and interview preparation.
      </p>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    ["Project-first curriculum", "Every program includes hands-on assignments and portfolio-ready work."],
    ["Mentor-led support", "Learners receive regular reviews, doubt clearing, and practical career guidance."],
    ["Flexible batches", "Classroom and online formats support students and working professionals."],
    ["Placement preparation", "Resume reviews, mock interviews, and communication practice are included."],
  ];

  return (
    <section className="section muted">
      <div className="section-heading">
        <p className="eyebrow">Why choose us</p>
        <h2>A focused environment for learning skills that hiring teams can recognize.</h2>
      </div>
      <div className="feature-grid">
        {reasons.map(([title, text]) => (
          <article className="feature-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedCourses({ courses, navigate }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Featured courses</p>
        <h2>Popular programs for students starting or upgrading their careers.</h2>
      </div>
      <CourseGrid courses={courses.slice(0, 4)} navigate={navigate} />
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Student testimonials</p>
        <h2>What learners say after building with us.</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial" key={testimonial.name}>
            <p>"{testimonial.quote}"</p>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function CoursesPage({ courses, navigate }) {
  return (
    <section className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Courses page</p>
        <h1>All available courses</h1>
        <p>Choose a program to view overview, duration, technologies, outcomes, and career opportunities.</p>
      </div>
      <CourseGrid courses={courses} navigate={navigate} />
    </section>
  );
}

function CourseGrid({ courses: visibleCourses, navigate }) {
  return (
    <div className="course-grid">
      {visibleCourses.map((course) => (
        <article className="course-card" key={course._id}>
          <span className="course-tag">{course.tag}</span>
          <h3>{course.title}</h3>
          <p>{course.overview}</p>
          <div className="course-meta">
            <span>{course.duration}</span>
            <span>{(course.technologies || []).slice(0, 3).join(", ")}</span>
          </div>
          <button className="text-button" type="button" onClick={() => navigate("courseDetails", course._id)}>
            View Details
          </button>
        </article>
      ))}
    </div>
  );
}

function CourseDetailsPage({ course, navigate }) {
  return (
    <section className="page-shell detail-page">
      <button className="back-button" type="button" onClick={() => navigate("courses")}>
        Back to Courses
      </button>
      <div className="page-heading">
        <p className="eyebrow">Course details page</p>
        <h1>{course.title}</h1>
        <p>{course.overview}</p>
      </div>
      <div className="detail-grid">
        <article className="detail-panel">
          <h2>Course Overview</h2>
          <p>{course.overview}</p>
        </article>
        <article className="detail-panel highlight">
          <h2>Duration</h2>
          <strong>{course.duration}</strong>
        </article>
        <article className="detail-panel">
          <h2>Technologies Covered</h2>
          <TagList items={course.technologies || []} />
        </article>
        <article className="detail-panel">
          <h2>Learning Outcomes</h2>
          <BulletList items={course.outcomes || []} />
        </article>
        <article className="detail-panel wide">
          <h2>Career Opportunities</h2>
          <TagList items={course.careers || []} />
        </article>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-shell about-page">
      <div className="page-heading">
        <p className="eyebrow">About us page</p>
        <h1>About NextGen Institute</h1>
        <p>
          We are a career-oriented technology training institute helping learners move from concepts to confident project
          execution.
        </p>
      </div>
      <div className="about-layout">
        <div className="about-photo" aria-label="Technology classroom"></div>
        <div className="about-panels">
          <article>
            <h2>Institute Overview</h2>
            <p>
              NextGen Institute provides structured IT courses, internship programs, and placement preparation for
              students and professionals who want practical, industry-aligned learning.
            </p>
          </article>
          <article>
            <h2>Vision</h2>
            <p>To become a trusted training destination for learners who want meaningful technology careers.</p>
          </article>
          <article>
            <h2>Mission</h2>
            <p>
              To deliver accessible, mentor-led education through hands-on projects, current tools, and continuous career
              support.
            </p>
          </article>
          <article>
            <h2>Core Values</h2>
            <TagList items={values} />
          </article>
        </div>
      </div>
    </section>
  );
}

function InternshipPreview({ navigate }) {
  return (
    <section className="split-section">
      <div>
        <p className="eyebrow">Internship opportunities</p>
        <h2>Work on guided live projects and earn a completion certificate.</h2>
        <p>
          Our internships help learners practice teamwork, Git workflow, sprint tasks, documentation, and final project
          presentation.
        </p>
      </div>
      <button className="button primary" type="button" onClick={() => navigate("internship")}>
        View Internship Program
      </button>
    </section>
  );
}

function InternshipPage({ navigate }) {
  const benefits = [
    "Live project exposure",
    "Mentor feedback and weekly reviews",
    "Portfolio-ready deliverables",
    "Interview and resume guidance",
  ];
  const technologies = ["React", "Node.js", "Python", "Java", "SQL", "MongoDB", "Git", "Digital Marketing Tools"];

  return (
    <section className="page-shell internship-page">
      <div className="page-heading">
        <p className="eyebrow">Internship page</p>
        <h1>Internship Program</h1>
        <p>
          A practical internship experience for students who want supervised project work, professional habits, and
          certification.
        </p>
      </div>
      <div className="internship-grid">
        <article className="detail-panel wide">
          <h2>Internship Overview</h2>
          <p>
            Interns work with mentors on defined project modules, participate in reviews, document their work, and
            present a final deliverable suitable for portfolio and interview discussion.
          </p>
        </article>
        <article className="detail-panel">
          <h2>Benefits</h2>
          <BulletList items={benefits} />
        </article>
        <article className="detail-panel">
          <h2>Technologies Covered</h2>
          <TagList items={technologies} />
        </article>
        <article className="detail-panel highlight">
          <h2>Duration</h2>
          <strong>6 weeks to 6 months</strong>
        </article>
        <article className="detail-panel highlight">
          <h2>Certification Information</h2>
          <p>Internship completion certificate is provided after task submission, mentor review, and final presentation.</p>
        </article>
      </div>
      <button className="button primary" type="button" onClick={() => navigate("contact")}>
        Apply for Internship
      </button>
    </section>
  );
}

function ContactPage({ courses, handleInquiry, inquiryStatus }) {
  return (
    <section className="page-shell contact-page">
      <div className="page-heading">
        <p className="eyebrow">Contact us page</p>
        <h1>Contact NextGen Institute</h1>
        <p>Speak with our admissions team for course details, batch timings, fees, internships, and free demo sessions.</p>
      </div>
      <div className="contact-layout">
        <ContactInformation />
        <ContactInquiryForm courses={courses} handleInquiry={handleInquiry} inquiryStatus={inquiryStatus} />
      </div>
    </section>
  );
}

function ContactInformation() {
  return (
    <article className="contact-card">
      <h2>Contact Information</h2>
      <p>
        <strong>Address:</strong> 2nd Floor, Learning Hub, Salt Lake Sector V, Kolkata, West Bengal 700091
      </p>
      <p>
        <strong>Email Address:</strong> admissions@nextgeninstitute.edu
      </p>
      <p>
        <strong>Mobile Number:</strong> +91 98765 43210
      </p>
      <p>
        <strong>Office Hours:</strong> Monday to Saturday, 9:30 AM to 6:30 PM
      </p>
    </article>
  );
}

function ContactInquiryForm({ courses, handleInquiry, inquiryStatus, compact = false }) {
  return (
    <section className={compact ? "contact-band" : "form-card"}>
      <div className="section-heading">
        <p className="eyebrow">Student inquiry form</p>
        <h2>Send an inquiry</h2>
      </div>
      <form className="lead-form" onSubmit={handleInquiry}>
        <label>
          Name
          <input name="name" type="text" placeholder="Enter your name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Mobile Number
          <input name="mobile" type="tel" placeholder="+91 98765 43210" required />
        </label>
        <label>
          Course Interested In
          <select name="courseInterestedIn" defaultValue={courses[0]?.title || ""} required>
            {courses.map((course) => (
              <option key={course._id}>{course.title}</option>
            ))}
            <option>Internship Program</option>
          </select>
        </label>
        <label className="full">
          Message
          <textarea name="message" placeholder="Tell us about your learning goal" />
        </label>
        <button className="button primary" type="submit">
          Submit Inquiry
        </button>
        {inquiryStatus && <p className="success-message">{inquiryStatus}</p>}
      </form>
    </section>
  );
}

function AdminPage({ adminName, courses, loadCourses, onLogin, onLogout, token }) {
  const [loginError, setLoginError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");
    const form = new FormData(event.currentTarget);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      });
      onLogin(data.token, data.username);
    } catch (error) {
      setLoginError(error.message);
    }
  }

  if (!token) {
    return (
      <section className="page-shell admin-page">
        <div className="page-heading">
          <p className="eyebrow">Admin login</p>
          <h1>Admin Panel</h1>
          <p>Login to manage courses and student inquiries.</p>
        </div>
        <form className="admin-login form-card" onSubmit={handleLogin}>
          <label>
            Username
            <input name="username" type="text" placeholder="admin" required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="admin123" required />
          </label>
          <button className="button primary" type="submit">
            Login
          </button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      </section>
    );
  }

  return (
    <section className="page-shell admin-page">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1>Welcome, {adminName}</h1>
        </div>
        <button className="button secondary" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="admin-grid">
        <CourseManager courses={courses} loadCourses={loadCourses} token={token} />
        <InquiryManager token={token} />
      </div>
    </section>
  );
}

function CourseManager({ courses, loadCourses, token }) {
  const [form, setForm] = useState(emptyCourse);
  const [editingId, setEditingId] = useState("");
  const [status, setStatus] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function editCourse(course) {
    setEditingId(course._id);
    setForm(courseToForm(course));
    setStatus("");
  }

  function resetForm() {
    setEditingId("");
    setForm(emptyCourse);
  }

  async function saveCourse(event) {
    event.preventDefault();
    setStatus("Saving...");

    try {
      await apiRequest(editingId ? `/courses/${editingId}` : "/courses", {
        method: editingId ? "PUT" : "POST",
        token,
        body: JSON.stringify(formToCourse(form)),
      });
      setStatus(editingId ? "Course updated." : "Course added.");
      resetForm();
      await loadCourses();
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function deleteCourse(courseId) {
    setStatus("Deleting...");

    try {
      await apiRequest(`/courses/${courseId}`, {
        method: "DELETE",
        token,
      });
      setStatus("Course deleted.");
      await loadCourses();
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="admin-panel">
      <div className="panel-heading">
        <h2>Course Management</h2>
        {editingId && (
          <button className="ghost-button" type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </div>
      <form className="admin-form" onSubmit={saveCourse}>
        <label>
          Course Name
          <input name="title" value={form.title} onChange={updateField} required />
        </label>
        <label>
          Category
          <input name="tag" value={form.tag} onChange={updateField} required />
        </label>
        <label>
          Duration
          <input name="duration" value={form.duration} onChange={updateField} required />
        </label>
        <label className="full">
          Overview
          <textarea name="overview" value={form.overview} onChange={updateField} required />
        </label>
        <label className="full">
          Technologies
          <input name="technologies" value={form.technologies} onChange={updateField} placeholder="React, Node.js" />
        </label>
        <label className="full">
          Outcomes
          <input name="outcomes" value={form.outcomes} onChange={updateField} placeholder="Build apps, Deploy APIs" />
        </label>
        <label className="full">
          Careers
          <input name="careers" value={form.careers} onChange={updateField} placeholder="Developer, Analyst" />
        </label>
        <button className="button primary" type="submit">
          {editingId ? "Update Course" : "Add Course"}
        </button>
        {status && <p className="success-message">{status}</p>}
      </form>

      <div className="admin-list">
        {courses.map((course) => (
          <article className="admin-list-item" key={course._id}>
            <div>
              <strong>{course.title}</strong>
              <span>{course.duration}</span>
            </div>
            <div className="row-actions">
              <button className="ghost-button" type="button" onClick={() => editCourse(course)}>
                Edit
              </button>
              <button className="danger-button" type="button" onClick={() => deleteCourse(course._id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function InquiryManager({ token }) {
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState("Loading inquiries...");

  async function loadInquiries() {
    try {
      const data = await apiRequest("/inquiries", { token });
      setInquiries(data);
      setStatus(data.length ? "" : "No inquiries yet.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, [token]);

  async function deleteInquiry(inquiryId) {
    setStatus("Deleting...");

    try {
      await apiRequest(`/inquiries/${inquiryId}`, {
        method: "DELETE",
        token,
      });
      await loadInquiries();
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="admin-panel">
      <div className="panel-heading">
        <h2>Inquiry Management</h2>
        <button className="ghost-button" type="button" onClick={loadInquiries}>
          Refresh
        </button>
      </div>
      {status && <p className="success-message">{status}</p>}
      <div className="admin-list">
        {inquiries.map((inquiry) => (
          <article className="inquiry-item" key={inquiry._id}>
            <div>
              <strong>{inquiry.name}</strong>
              <span>{inquiry.courseInterestedIn}</span>
              <p>{inquiry.message || "No message provided."}</p>
              <small>
                {inquiry.email} | {inquiry.mobile}
              </small>
            </div>
            <button className="danger-button" type="button" onClick={() => deleteInquiry(inquiry._id)}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function TagList({ items }) {
  return (
    <div className="tag-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
