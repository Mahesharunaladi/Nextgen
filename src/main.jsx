import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const defaultCourses = [
  {
    title: "Full Stack Web Development",
    level: "Beginner to advanced",
    duration: "24 weeks",
    skills: "React, Node.js, MongoDB, APIs",
  },
  {
    title: "Python & Data Analytics",
    level: "Career track",
    duration: "18 weeks",
    skills: "Python, SQL, Excel, dashboards",
  },
  {
    title: "Java Programming",
    level: "Foundation",
    duration: "16 weeks",
    skills: "Core Java, OOP, JDBC, projects",
  },
  {
    title: "Cloud & DevOps Essentials",
    level: "Professional",
    duration: "14 weeks",
    skills: "Linux, Git, Docker, AWS basics",
  },
];

const internships = [
  "Live project internships for final-year students",
  "Mentor reviews, sprint planning, and Git workflow",
  "Experience certificate and portfolio-ready deliverables",
];

const services = [
  "Classroom and online IT training",
  "Corporate upskilling workshops",
  "College bootcamps and seminars",
  "Placement preparation and mock interviews",
];

function App() {
  const [courses, setCourses] = useState(defaultCourses);
  const [activeTab, setActiveTab] = useState("courses");
  const [inquiries, setInquiries] = useState([]);
  const [draftCourse, setDraftCourse] = useState({
    title: "",
    level: "",
    duration: "",
    skills: "",
  });

  const stats = useMemo(
    () => [
      ["50+", "Practical modules"],
      ["1,000+", "Students guided"],
      ["4.8/5", "Learner rating"],
      ["8+", "Career tracks"],
    ],
    []
  );

  function handleInquiry(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const inquiry = Object.fromEntries(form.entries());
    setInquiries((items) => [inquiry, ...items]);
    event.currentTarget.reset();
  }

  function addCourse(event) {
    event.preventDefault();
    if (!draftCourse.title.trim()) return;
    setCourses((items) => [{ ...draftCourse }, ...items]);
    setDraftCourse({ title: "", level: "", duration: "", skills: "" });
  }

  function removeCourse(index) {
    setCourses((items) => items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="NextGen Institute home">
          <span className="brand-mark">N</span>
          <span>
            <strong>NextGen Institute</strong>
            <small>IT Training & Internships</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#courses">Courses</a>
          <a href="#internships">Internships</a>
          <a href="#services">Training</a>
          <a href="#contact">Contact</a>
          <a href="#admin">Admin</a>
        </nav>
        <a className="nav-cta" href="#lead-form">Free Demo</a>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-visual" aria-hidden="true">
            <div className="code-card card-one">
              <span>React</span>
              <b>UI Lab</b>
            </div>
            <div className="code-card card-two">
              <span>Python</span>
              <b>Data Sprint</b>
            </div>
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="laptop">
              <div className="screen">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div className="hero-content">
            <p className="eyebrow">Industry-ready learning for tomorrow's IT careers</p>
            <h1>Build job-ready skills with courses, internships, and mentor-led training.</h1>
            <p>
              A professional technology institute experience for students, graduates, and
              working learners who want hands-on projects, clear guidance, and practical career
              outcomes.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#lead-form">Book Free Demo</a>
              <a className="button secondary" href="#courses">Explore Courses</a>
            </div>
          </div>
          <div className="stats-strip" aria-label="Institute highlights">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="courses" className="section">
          <div className="section-heading">
            <p className="eyebrow">Course catalogue</p>
            <h2>Programs designed around real project practice.</h2>
          </div>
          <div className="course-grid">
            {courses.map((course, index) => (
              <article className="course-card" key={`${course.title}-${index}`}>
                <div className="card-topline">
                  <span>{course.level}</span>
                  <button aria-label={`Remove ${course.title}`} onClick={() => removeCourse(index)}>
                    x
                  </button>
                </div>
                <h3>{course.title}</h3>
                <p>{course.skills}</p>
                <div className="duration">{course.duration}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="internships" className="split-section">
          <div>
            <p className="eyebrow">Internship programs</p>
            <h2>Turn classroom learning into supervised portfolio work.</h2>
            <p>
              Students work in small project teams, learn delivery habits, and leave with
              practical artifacts they can discuss in interviews.
            </p>
          </div>
          <div className="feature-list">
            {internships.map((item) => (
              <div className="feature-item" key={item}>
                <span>✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section muted">
          <div className="section-heading">
            <p className="eyebrow">Training services</p>
            <h2>Flexible learning formats for students, colleges, and teams.</h2>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <div className="service-tile" key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service}</h3>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-panel">
            <p className="eyebrow">Admissions desk</p>
            <h2>Have a course question? Send an inquiry.</h2>
            <div className="contact-lines">
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> admissions@nextgeninstitute.edu</p>
              <p><strong>Location:</strong> Kolkata, West Bengal</p>
            </div>
          </div>
          <form id="lead-form" className="lead-form" onSubmit={handleInquiry}>
            <label>
              Full name
              <input name="name" type="text" placeholder="Your name" required />
            </label>
            <label>
              Mobile number
              <input name="phone" type="tel" placeholder="+91" required />
            </label>
            <label>
              Interested program
              <select name="program" defaultValue="Full Stack Web Development">
                {courses.map((course) => (
                  <option key={course.title}>{course.title}</option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Tell us what you want to learn" />
            </label>
            <button className="button primary" type="submit">Submit Inquiry</button>
          </form>
        </section>

        <section id="admin" className="admin-section">
          <div className="section-heading">
            <p className="eyebrow">Basic admin panel</p>
            <h2>Manage visible course content and review incoming leads.</h2>
          </div>
          <div className="admin-shell">
            <div className="tabs" role="tablist" aria-label="Admin sections">
              <button
                className={activeTab === "courses" ? "active" : ""}
                onClick={() => setActiveTab("courses")}
                type="button"
              >
                Courses
              </button>
              <button
                className={activeTab === "leads" ? "active" : ""}
                onClick={() => setActiveTab("leads")}
                type="button"
              >
                Leads
              </button>
            </div>
            {activeTab === "courses" ? (
              <form className="admin-form" onSubmit={addCourse}>
                {["title", "level", "duration", "skills"].map((field) => (
                  <label key={field}>
                    {field}
                    <input
                      value={draftCourse[field]}
                      onChange={(event) =>
                        setDraftCourse((course) => ({ ...course, [field]: event.target.value }))
                      }
                      placeholder={`Course ${field}`}
                    />
                  </label>
                ))}
                <button className="button secondary" type="submit">Add Course</button>
              </form>
            ) : (
              <div className="lead-list">
                {inquiries.length === 0 ? (
                  <p>No inquiries yet. Submitted lead forms will appear here.</p>
                ) : (
                  inquiries.map((lead, index) => (
                    <article key={`${lead.phone}-${index}`}>
                      <strong>{lead.name}</strong>
                      <span>{lead.phone}</span>
                      <p>{lead.program}</p>
                      <small>{lead.message || "No message provided"}</small>
                    </article>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 NextGen Institute. Original frontend concept for IT training and lead generation.</p>
        <a href="#home">Back to top</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
