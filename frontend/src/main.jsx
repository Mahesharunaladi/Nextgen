import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const courses = [
  {
    slug: "full-stack-web-development",
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
    slug: "python-programming",
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
    slug: "java-development",
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
    slug: "data-science",
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
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    tag: "AI",
    duration: "6 months",
    overview:
      "An applied AI course that introduces intelligent systems, model workflows, prompt design, and responsible AI use.",
    technologies: ["Python", "Machine Learning", "Neural Networks", "NLP", "Computer Vision", "Prompt Engineering"],
    outcomes: [
      "Understand AI concepts and model lifecycles",
      "Prototype AI-powered applications",
      "Evaluate outputs with practical quality and safety checks",
    ],
    careers: ["AI Intern", "ML Engineer Trainee", "AI Application Developer", "Research Assistant"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tag: "Marketing",
    duration: "3 months",
    overview:
      "A campaign-focused course for learning search, social, content, analytics, and lead generation fundamentals.",
    technologies: ["SEO", "Google Ads", "Meta Ads", "Content Marketing", "Email Marketing", "Analytics"],
    outcomes: [
      "Plan and run digital marketing campaigns",
      "Analyze campaign performance and improve conversions",
      "Create content calendars and lead funnels",
    ],
    careers: ["Digital Marketing Executive", "SEO Analyst", "Social Media Associate", "Performance Marketing Intern"],
  },
];

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

function App() {
  const [page, setPage] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState(courses[0].slug);
  const [submitted, setSubmitted] = useState(false);

  const activeCourse = useMemo(
    () => courses.find((course) => course.slug === selectedCourse) || courses[0],
    [selectedCourse]
  );

  function navigate(nextPage, courseSlug) {
    setPage(nextPage);
    if (courseSlug) setSelectedCourse(courseSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleInquiry(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
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
          {["home", "about", "courses", "internship", "contact"].map((item) => (
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
            <FeaturedCourses navigate={navigate} />
            <InternshipPreview navigate={navigate} />
            <Testimonials />
            <ContactInquiryForm handleInquiry={handleInquiry} submitted={submitted} compact />
          </>
        )}

        {page === "about" && <AboutPage />}

        {page === "courses" && <CoursesPage navigate={navigate} />}

        {page === "courseDetails" && <CourseDetailsPage course={activeCourse} navigate={navigate} />}

        {page === "internship" && <InternshipPage navigate={navigate} />}

        {page === "contact" && <ContactPage handleInquiry={handleInquiry} submitted={submitted} />}
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

function FeaturedCourses({ navigate }) {
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

function CoursesPage({ navigate }) {
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
        <article className="course-card" key={course.slug}>
          <span className="course-tag">{course.tag}</span>
          <h3>{course.title}</h3>
          <p>{course.overview}</p>
          <div className="course-meta">
            <span>{course.duration}</span>
            <span>{course.technologies.slice(0, 3).join(", ")}</span>
          </div>
          <button className="text-button" type="button" onClick={() => navigate("courseDetails", course.slug)}>
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
          <TagList items={course.technologies} />
        </article>
        <article className="detail-panel">
          <h2>Learning Outcomes</h2>
          <BulletList items={course.outcomes} />
        </article>
        <article className="detail-panel wide">
          <h2>Career Opportunities</h2>
          <TagList items={course.careers} />
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

function ContactPage({ handleInquiry, submitted }) {
  return (
    <section className="page-shell contact-page">
      <div className="page-heading">
        <p className="eyebrow">Contact us page</p>
        <h1>Contact NextGen Institute</h1>
        <p>Speak with our admissions team for course details, batch timings, fees, internships, and free demo sessions.</p>
      </div>
      <div className="contact-layout">
        <ContactInformation />
        <ContactInquiryForm handleInquiry={handleInquiry} submitted={submitted} />
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

function ContactInquiryForm({ handleInquiry, submitted, compact = false }) {
  return (
    <section className={compact ? "contact-band" : "form-card"}>
      <div className="section-heading">
        <p className="eyebrow">Contact inquiry form</p>
        <h2>Send an inquiry</h2>
      </div>
      <form className="lead-form" onSubmit={handleInquiry}>
        <label>
          Full Name
          <input name="name" type="text" placeholder="Enter your name" required />
        </label>
        <label>
          Email Address
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Mobile Number
          <input name="phone" type="tel" placeholder="+91 98765 43210" required />
        </label>
        <label>
          Interested Course
          <select name="course" defaultValue="Full Stack Web Development">
            {courses.map((course) => (
              <option key={course.slug}>{course.title}</option>
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
        {submitted && <p className="success-message">Thank you. Your inquiry has been recorded.</p>}
      </form>
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
