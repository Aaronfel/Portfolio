import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Server,
  Database,
  Cloud,
  ExternalLink,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Contact form handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear previous status when user starts typing
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter a message");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // EmailJS configuration using environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      const templateParams = {
        title: "New Message from Portfolio",
        from_name: formData.name,
        from_email: formData.email,
        to_email: "feldmanaaron406@gmail.com",
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Failed to send message. Please try again or contact me directly at feldmanaaron406@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: "JavaScript", icon: Code, category: "Frontend" },
    { name: "TypeScript", icon: Code, category: "Frontend" },
    { name: "React.js", icon: Code, category: "Frontend" },
    { name: "React Native", icon: Code, category: "Mobile" },
    { name: "Tailwind CSS", icon: Code, category: "Frontend" },
    { name: "NestJS", icon: Server, category: "Backend" },
    { name: "Node.js", icon: Server, category: "Backend" },
    { name: "Laravel", icon: Server, category: "Backend" },
    { name: "PHP", icon: Server, category: "Backend" },
    { name: "PostgreSQL", icon: Database, category: "Database" },
    { name: "MongoDB", icon: Database, category: "Database" },
    { name: "AWS EC2", icon: Cloud, category: "Cloud" },
    { name: "AWS S3", icon: Cloud, category: "Cloud" },
    { name: "Docker", icon: Server, category: "DevOps" },
  ];

  const experience = [
    {
      title: "Full Stack Developer",
      company: "Greelow.",
      period: "2022 - Present",
      description:
        "Led development of scalable web applications using React, NestJS, and AWS services. Built responsive interfaces with Tailwind CSS and implemented CI/CD pipelines.",
      achievements: [
        "Architectured backend systems from scratch to MVP using NestJS and Laravel",
        "Implemented modern UI/UX with Tailwind CSS across 20+ projects",
        "Developed RESTful APIs serving multiple frontend applications",
        "Improved code quality with comprehensive testing and documentation using Jest and Supertest",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      description:
        "Developed multiplatform applications using React, React Native, Nest js, Express js with relational and non-relational databases.",
      achievements: [
        "Built 15+ responsive websites using React and React Native with 98% client satisfaction",
        "Implemented Tailwind CSS design system reducing development time by 30%",
        "Developed RESTful APIs serving multiple frontend applications",
        "Developed mobile applications using React Native CLI and Expo",
        "Improved code quality with comprehensive testing and documentation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-gray-900 dark:text-white">
              Aaron Feldman
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "experience", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize font-medium transition-colors ${
                      activeSection === section
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    {section === "about" ? "Me" : section}
                  </button>
                )
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <a
                href="https://github.com/Aaronfel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/aaron-feldman-99b7031a4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-start lg:items-center justify-center pt-4 lg:pt-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20"
      >
        <div className="w-full max-w-6xl mx-auto px-6 py-20">
          <div className="animate-fade-in">
            {/* Mobile Layout - Centered */}
            <div className="block lg:hidden text-center">
              <div className="mb-8">
                <img
                  src="/IMG_0195.jpg"
                  alt="Aaron Feldman"
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full mx-auto object-cover border-6 border-white dark:border-gray-700 shadow-2xl ring-4 ring-emerald-200 dark:ring-emerald-800"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Aaron Feldman
              </h1>
              <p className="text-xl md:text-2xl text-emerald-600 dark:text-emerald-400 mb-8 font-semibold">
                Full Stack Software Developer
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Passionate about building scalable web applications with modern
                technologies. 3+ years of experience in full stack development,
                specializing in React, NodeJS, and AWS cloud solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Learn More About Me
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-gray-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Desktop Layout - Two Columns */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center lg:max-w-5xl lg:mx-auto">
              {/* Left Column - Image */}
              <div className="flex justify-center">
                <img
                  src="/IMG_0195.jpg"
                  alt="Aaron Feldman"
                  className="w-80 h-80 xl:w-96 xl:h-96 rounded-full object-cover border-6 border-white dark:border-gray-700 shadow-2xl ring-4 ring-emerald-200 dark:ring-emerald-800"
                />
              </div>

              {/* Right Column - Text Content */}
              <div className="text-left lg:pl-8">
                <h1 className="text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Aaron Feldman
                </h1>
                <p className="text-2xl xl:text-3xl text-emerald-600 dark:text-emerald-400 mb-8 font-semibold">
                  Full Stack Software Developer
                </p>
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
                  Passionate about building scalable web applications with
                  modern technologies. 3+ years of experience in full stack
                  development, specializing in React, NodeJS, and AWS cloud
                  solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                  >
                    Learn More About Me
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="px-8 py-4 border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-gray-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I'm a passionate full stack developer with over 3 years of
              experience creating robust, scalable web applications. I
              specialize in adaptability and learning new technologies quickly.
              I love to learn and grow, and I'm always looking for new
              challenges.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                <p className="text-emerald-100 leading-relaxed">
                  Started my journey in web development with a passion for
                  creating digital experiences. Over the years, I've worked on
                  diverse projects ranging from small business websites to
                  large-scale enterprise applications.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl transition-colors duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  What I Do
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Frontend development with React and modern JavaScript
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Backend APIs and services with NestJS and Node.js
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Cloud infrastructure and deployment on AWS
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Database design and optimization
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-8 rounded-2xl text-white">
                <h3 className="text-3xl font-bold mb-2">3+</h3>
                <p className="text-emerald-100">Years of Experience</p>
              </div>
              <div className="bg-gradient-to-br from-violet-400 to-purple-500 p-8 rounded-2xl text-white">
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-violet-100">Projects Completed</p>
              </div>
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-8 rounded-2xl text-white">
                <h3 className="text-3xl font-bold mb-2">10+</h3>
                <p className="text-amber-100">Technologies Mastered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to
              life.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                  <skill.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              My journey in the tech industry and the impact I've made.
            </p>
          </div>
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="md:grid md:grid-cols-3 md:gap-8">
                  <div className="md:col-span-1">
                    <div className="sticky top-24">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                        {exp.company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 transition-colors duration-300">
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-600 dark:text-gray-300">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-gray-800 dark:via-gray-700 dark:to-emerald-900/20 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I'm always open to discussing new opportunities and interesting
              projects.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-8 w-full">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm transition-colors duration-300 w-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                    <span className="text-gray-600 dark:text-gray-300">
                      feldmanaaron406@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                    <span className="text-gray-600 dark:text-gray-300">
                      +54 9 11 5575-6913
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Buenos Aires, Argentina
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm transition-colors duration-300 w-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Connect With Me
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://github.com/Aaronfel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://linkedin.com/in/aaron-feldman-99b7031a4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm transition-colors duration-300 w-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-green-800 dark:text-green-200">
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 mt-0.5" />
                  <span className="text-red-800 dark:text-red-200">
                    {errorMessage}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © 2025 Aaron Feldman. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
