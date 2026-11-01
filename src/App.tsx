/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Code,
  Sparkles,
  Layout,
  Briefcase,
  Mail,
  Github,
  Instagram,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Menu,
  X,
  MapPin,
  Send,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Compass,
  Check
} from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website Development',
    budget: 'Flexible',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Project Modal & Carousel State
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Reset image index when modal project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  // Lightweight Intersection Observer for scroll-reveal and staggered animations
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-left, .scroll-right, .stagger-card');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  // Individual Card Spotlight Mouse Move Handler (High Performance & Isolated)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Scroll listener for back-to-top and active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      const sections = ['home', 'about', 'expertise', 'projects', 'services', 'process', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', projectType: 'Website Development', budget: 'Flexible', message: '' });
    }, 1200);
  };

  const projectsData = [
    {
      id: 1,
      title: "Buddy Hub",
      category: "Main Platform & Community Hub",
      description: "An advanced interactive platform designed for seamless connection, community collaboration, and digital workspace management with sleek UI and fluid animations.",
      technologies: ["React", "Tailwind CSS", "Interactive UI", "TypeScript"],
      images: [
        "/assets/aistudio/image_266b53f1.png",
        "/assets/aistudio/image_2c9bc7eb.png",
        "/assets/aistudio/image_79ffe7e9.png"
      ],
      link: "https://buddyhub.ai.studio",
      source: "https://github.com/jigarjalu",
      featured: true
    },
    {
      id: 2,
      title: "Aarambh Brand Platform",
      category: "Brand Showcase & Web App",
      description: "A premium brand identity and digital experience showcase emphasizing bold typography, minimalist design, and immersive transitions.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Animations"],
      images: [
        "/assets/aistudio/image_2c9bc7eb.png",
        "/assets/aistudio/image_266b53f1.png",
        "/assets/aistudio/image_e47eb0f7.png"
      ],
      link: "https://aarambh-brand.vercel.app",
      source: "https://github.com/jigarjalu"
    },
    {
      id: 3,
      title: "Zaree by Asha Rajkot",
      category: "E-Commerce & Boutique",
      description: "An exquisite digital storefront concept celebrating ethnic couture and artisanal craftsmanship with refined product galleries and smooth UX.",
      technologies: ["UI/UX Design", "Tailwind CSS", "JavaScript"],
      images: [
        "/assets/aistudio/image_79ffe7e9.png",
        "/assets/aistudio/image_cf435a1a.png",
        "/assets/aistudio/image_2c9bc7eb.png"
      ],
      link: "https://zaree-by-asha-rajkot-com.ai.studio",
      source: "https://github.com/jigarjalu"
    },
    {
      id: 4,
      title: "The Pestro Pavilion",
      category: "Hospitality & Dining",
      description: "A high-end restaurant and culinary pavilion digital experience featuring atmospheric photography, menu discovery, and online reservation flow.",
      technologies: ["Responsive Design", "Tailwind CSS", "JavaScript"],
      images: [
        "/assets/aistudio/image_e47eb0f7.png",
        "/assets/aistudio/image_79ffe7e9.png",
        "/assets/aistudio/image_cf435a1a.png"
      ],
      link: "https://the-pestro-pavilion.vercel.app",
      source: "https://github.com/jigarjalu"
    },
    {
      id: 5,
      title: "The Mountain View",
      category: "Resort & Travel Experience",
      description: "An immersive travel and mountain retreat showcase highlighting scenic landscapes, luxury accommodations, and seamless booking interaction.",
      technologies: ["Frontend Design", "Animations", "Tailwind CSS"],
      images: [
        "/assets/aistudio/image_cf435a1a.png",
        "/assets/aistudio/image_e47eb0f7.png",
        "/assets/aistudio/image_266b53f1.png"
      ],
      link: "https://the-mountain-view.vercel.app",
      source: "https://github.com/jigarjalu"
    }
  ];

  const servicesData = [
    {
      icon: <Code className="w-6 h-6 text-[#2563EB]" />,
      title: "Website Development",
      description: "Responsive, high-performance modern websites engineered around business objectives, clean code, and exceptional user experience."
    },
    {
      icon: <Layout className="w-6 h-6 text-[#2563EB]" />,
      title: "Website Design",
      description: "Visually cohesive interface concepts, intuitive layouts, and refined digital experiences tailored for modern brands and products."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#2563EB]" />,
      title: "AI Prompt Engineering",
      description: "Crafting structured prompts and exploring AI-powered workflows to optimize creative problem-solving and technical tasks."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#2563EB]" />,
      title: "Digital Creative Solutions",
      description: "Innovative digital concepts, creative content formulation, and visual storytelling designed to communicate ideas effectively."
    },
    {
      icon: <Compass className="w-6 h-6 text-[#2563EB]" />,
      title: "Project Planning",
      description: "Organizing project requirements, defining execution strategies, coordinating milestones, and maintaining clear project goals."
    }
  ];

  const skillsList = [
    "HTML5", "CSS3", "JavaScript", "Git", "GitHub", "Responsive Design", "UI/UX Design", "Prompt Engineering", "Project Management", "Creative Direction"
  ];

  const workSteps = [
    {
      step: "01",
      title: "Discover",
      desc: "Understand the core idea, objectives, target audience, and specific project requirements."
    },
    {
      step: "02",
      title: "Plan",
      desc: "Define the project scope, structural priorities, execution strategy, and milestones."
    },
    {
      step: "03",
      title: "Create",
      desc: "Design, develop, test, and refine the digital solution with precision and creativity."
    },
    {
      step: "04",
      title: "Deliver",
      desc: "Review the final work, address details, and prepare the project for launch and success."
    }
  ];

  const logoSrc = "/assets/aistudio/Jigar_Jalu_Premium_Tech_Monogram_03a315d3.png";

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#18181B] relative selection:bg-[#2563EB] selection:text-white cursor-default antialiased overflow-x-hidden">
      
      {/* LOADING & FLASH SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#F9F9F8] flex flex-col items-center justify-center p-4">
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow border border-[#2563EB]/40 bg-white p-2">
              <img
                src={logoSrc}
                alt="JJJ Logo"
                className="w-full h-full object-cover rounded-xl animate-rotate-in shadow-inner"
              />
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-[#2563EB]/15 blur-xl -z-10 animate-ping"></div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-['Playfair_Display'] text-[#18181B]">
            JIGAR J JALU
          </h1>
          <div className="w-48 h-1 bg-[#E4E4E7] rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-[#2563EB] animate-[indeterminate_1.5s_infinite_linear]" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#F9F9F8]/95 backdrop-blur-md border-b border-[#E4E4E7] px-4 sm:px-6 lg:px-16 py-4 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3 text-lg font-bold tracking-tight whitespace-nowrap shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform border border-[#E4E4E7] bg-white p-1">
            <img
              src={logoSrc}
              alt="JJJ Logo"
              className="w-full h-full object-cover rounded-lg animate-rotate-in"
            />
          </div>
          <span className="font-['Playfair_Display'] tracking-wide text-[#18181B] text-base sm:text-lg font-bold">Jigar J Jalu</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#52525B]">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'expertise', label: 'Expertise' },
            { id: 'projects', label: 'Projects' },
            { id: 'services', label: 'Services' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#2563EB] ${
                activeSection === item.id ? 'text-[#2563EB] font-semibold underline underline-offset-4' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-block px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md shadow-[#2563EB]/20 hover:bg-[#1D4ED8] transition-all whitespace-nowrap shrink-0"
          >
            Let's Talk
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-white border border-[#E4E4E7] text-[#18181B] active:scale-95 transition-transform shadow-sm"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#F9F9F8]/98 backdrop-blur-2xl border-b border-[#E4E4E7] p-6 z-30 shadow-2xl flex flex-col gap-3 animate-[fadeIn_0.2s_ease-out]">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'expertise', label: 'Expertise' },
            { id: 'projects', label: 'Projects' },
            { id: 'services', label: 'Services' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#52525B] hover:text-[#2563EB] py-3 px-4 rounded-xl hover:bg-white border border-transparent hover:border-[#E4E4E7] transition-all flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-[#2563EB]" />
            </a>
          ))}
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="w-full overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section id="home" className="relative px-4 sm:px-6 lg:px-16 pt-12 sm:pt-20 pb-20 sm:pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center scroll-reveal">
          
          <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 scroll-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E4E4E7] text-xs font-semibold text-[#2563EB] tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping"></span>
              INDEPENDENT DIGITAL CREATOR
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-['Playfair_Display'] leading-[1.12] text-[#18181B]">
              {"Turning Ideas Into ".split(" ").map((word, i) => (
                <span key={i} className="word-reveal mr-[0.25em]" style={{ animationDelay: `${i * 100}ms` }}>
                  {word}
                </span>
              ))}
              <span className="word-reveal text-[#2563EB] italic font-normal" style={{ animationDelay: `${4 * 100}ms` }}>
                Digital Experiences.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] max-w-2xl leading-relaxed">
              Designing, developing, and building digital solutions with creativity, technology, and AI.
            </p>

            <p className="text-sm text-[#71717A] max-w-2xl leading-relaxed">
              I'm <strong className="text-[#18181B] font-semibold">Jigar J Jalu</strong> — a digital creator, website developer, designer, prompt engineer, and project management enthusiast passionate about transforming ideas into meaningful digital experiences.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm shadow-md shadow-[#2563EB]/20 hover:bg-[#1D4ED8] transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E4E4E7] text-[#18181B] font-semibold text-sm hover:border-[#2563EB] transition-all inline-flex items-center justify-center shadow-sm"
              >
                Let's Collaborate
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E4E4E7] w-full mt-4">
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-[#18181B]">Junagadh</span>
                <span className="text-xs text-[#52525B] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2563EB]" /> Gujarat, India
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-[#18181B]">Available</span>
                <span className="text-xs text-[#52525B] flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Open to Projects
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visual Right Side */}
          <div className="lg:col-span-5 relative flex justify-center scroll-right w-full">
            <div className="absolute -inset-4 bg-[#2563EB]/10 rounded-3xl blur-2xl -z-10"></div>
            
            <div 
              onMouseMove={handleCardMouseMove}
              className="w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden editorial-panel p-3 border border-[#E4E4E7] relative shadow-xl bg-white"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#F4F4F5]">
                <img
                  src="/assets/aistudio/Cinematic_Executive_Portrait_in_a_Modern_Office_c0fea8d5.png"
                  alt="Jigar J Jalu Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/80 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E4E4E7] shadow-sm">
                  <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Jigar J Jalu</span>
                  <h3 className="text-base sm:text-lg font-bold font-['Playfair_Display'] text-[#18181B] mt-0.5">Digital Creator & Developer</h3>
                  <p className="text-xs text-[#52525B] mt-1">Design · Development · AI Workflows</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border border-[#E4E4E7] text-xs font-semibold text-[#18181B] shadow-md animate-float flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" /> Prompt Engineer
              </div>
              <div className="absolute -bottom-3 -left-3 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border border-[#E4E4E7] text-xs font-semibold text-[#18181B] shadow-md animate-float flex items-center gap-2" style={{ animationDelay: '2s' }}>
                <Code className="w-4 h-4 text-[#2563EB]" /> Web Developer
              </div>
            </div>
          </div>

        </section>

        {/* ABOUT ME SECTION (Slide Left) */}
        <section id="about" className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Background & Identity</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] mt-2 text-[#18181B]">A Little About Me</h2>
            <p className="text-[#52525B] text-sm mt-3">Creativity meets technology.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Bio */}
            <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 scroll-left">
              <h3 className="text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-[#18181B]">
                Exploring the intersection of design, development, and AI.
              </h3>
              <p className="text-[#52525B] text-sm sm:text-base leading-relaxed">
                I am Jigar J Jalu, a digital creator and technology enthusiast who combines creativity, design, web development, and AI-powered workflows to transform ideas into digital experiences.
              </p>
              <p className="text-[#52525B] text-sm sm:text-base leading-relaxed">
                My interests span website development, visual design, prompt engineering, creative problem-solving, and project management. I enjoy exploring new technologies, developing digital solutions, and creating experiences that balance visual appeal with functionality.
              </p>
              <p className="text-[#52525B] text-sm sm:text-base leading-relaxed">
                My approach is simple: understand the idea, plan the solution, design the experience, and bring it to life through technology. I aim to collaborate with individuals, startups, creators, and businesses that want to establish or improve their digital presence.
              </p>

              {/* Personal Info Compact Panel */}
              <div 
                onMouseMove={handleCardMouseMove}
                className="p-5 rounded-2xl editorial-card border border-[#E4E4E7] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 bg-white"
              >
                <div>
                  <span className="text-xs text-[#71717A] block">Full Name</span>
                  <span className="text-sm font-semibold text-[#18181B] font-['Playfair_Display']">Jigar J Jalu</span>
                </div>
                <div>
                  <span className="text-xs text-[#71717A] block">Location</span>
                  <span className="text-sm font-semibold text-[#18181B] font-['Playfair_Display']">Junagadh, Gujarat, India</span>
                </div>
                <div>
                  <span className="text-xs text-[#71717A] block">Primary Focus</span>
                  <span className="text-sm font-semibold text-[#18181B] font-['Playfair_Display']">Design, Development & AI</span>
                </div>
                <div>
                  <span className="text-xs text-[#71717A] block">Email</span>
                  <span className="text-sm font-semibold text-[#18181B] font-['Playfair_Display']">jigarjalu09@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Information Cards (Staggered Entry) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                {
                  icon: <Sparkles className="w-5 h-5 text-[#2563EB]" />,
                  title: "Creative Thinking",
                  desc: "Developing creative concepts and digital content that communicate ideas effectively."
                },
                {
                  icon: <Code className="w-5 h-5 text-[#2563EB]" />,
                  title: "Digital Development",
                  desc: "Building responsive, user-friendly websites with emphasis on performance and usability."
                },
                {
                  icon: <Cpu className="w-5 h-5 text-[#2563EB]" />,
                  title: "AI Exploration",
                  desc: "Crafting structured prompts and exploring AI workflows to improve processes."
                },
                {
                  icon: <Layers className="w-5 h-5 text-[#2563EB]" />,
                  title: "Project Planning",
                  desc: "Organizing project requirements, planning workflows, and maintaining clear goals."
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  onMouseMove={handleCardMouseMove}
                  className="stagger-card p-6 rounded-2xl editorial-card border border-[#E4E4E7] flex flex-col gap-3 bg-white"
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h4 className="text-base font-bold font-['Playfair_Display'] text-[#18181B]">{card.title}</h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* EXPERTISE & SKILLS SECTION (Staggered Entry for Cards) */}
        <section id="expertise" className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Capabilities & Stack</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] mt-2 text-[#18181B]">What I Bring to the Table</h2>
            <p className="text-[#52525B] text-sm mt-3">Combining technical proficiency with creative execution.</p>
          </div>

          {/* 5 Skill Cards with Staggered Entry */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                num: "01",
                title: "DIGITAL CREATION",
                desc: "Developing creative concepts and digital content that communicate ideas effectively to audiences."
              },
              {
                num: "02",
                title: "WEBSITE DEVELOPMENT",
                desc: "Building responsive, user-friendly websites with an emphasis on performance, usability, and modern design."
              },
              {
                num: "03",
                title: "PROMPT ENGINEERING",
                desc: "Crafting structured prompts and exploring AI-powered workflows to improve creative and technical processes."
              },
              {
                num: "04",
                title: "DESIGN",
                desc: "Exploring visual identity, interface design, layout systems, and engaging digital experiences."
              },
              {
                num: "05",
                title: "PROJECT MANAGEMENT",
                desc: "Organizing project requirements, planning workflows, coordinating tasks, and maintaining clear project goals."
              }
            ].map((skill, idx) => (
              <div
                key={idx}
                onMouseMove={handleCardMouseMove}
                className="stagger-card p-6 sm:p-8 rounded-2xl editorial-card border border-[#E4E4E7] flex flex-col justify-between group bg-white"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#2563EB] font-bold">{skill.num}</span>
                    <div className="w-8 h-8 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center group-hover:bg-[#2563EB] transition-colors">
                      <ArrowRight className="w-4 h-4 text-[#52525B] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#18181B] mb-2">{skill.title}</h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills Area */}
          <div 
            onMouseMove={handleCardMouseMove}
            className="p-6 sm:p-8 rounded-2xl editorial-panel border border-[#E4E4E7] text-center scroll-right bg-white"
          >
            <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#18181B] mb-2">Core Technical Toolkit</h3>
            <p className="text-xs text-[#52525B] mb-6">Technologies, tools, and methodologies I work with.</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {skillsList.map((skill, idx) => (
                <div key={idx} className="px-3.5 py-2 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] text-xs font-semibold text-[#18181B] flex items-center gap-2 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION (Alternating slide-left and slide-right) */}
        <section id="projects" className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 scroll-reveal">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Featured Work & Platforms</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] mt-2 text-[#18181B]">My Projects & Platforms</h2>
              <p className="text-[#52525B] text-sm mt-3 max-w-xl">
                Showcasing Buddy Hub as the core platform alongside Aarambh Brand, Zaree by Asha, The Pestro Pavilion, and The Mountain View.
              </p>
            </div>
            <div className="text-xs text-[#2563EB] bg-white px-4 py-2 rounded-xl border border-[#E4E4E7] self-start md:self-auto flex items-center gap-2 font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
              Buddy Hub Main Platform Active
            </div>
          </div>

          {/* Featured Main Project: Buddy Hub (Slide Left) */}
          {projectsData.filter(p => p.featured).map((project) => (
            <div
              key={project.id}
              onMouseMove={handleCardMouseMove}
              className="scroll-left mb-12 rounded-3xl editorial-panel border border-[#2563EB]/40 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl group bg-white"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#F4F4F5]">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#2563EB] text-white text-xs font-bold shadow-md">
                    FEATURED PLATFORM
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">{project.category}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display'] text-[#18181B] mt-1 mb-4">{project.title}</h3>
                  <p className="text-sm text-[#52525B] leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7] text-[#18181B] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-[#E4E4E7]">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#2563EB]/20 hover:bg-[#1D4ED8] transition-all"
                  >
                    <span>Launch Buddy Hub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-5 py-3.5 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] text-[#18181B] text-xs font-semibold hover:border-[#2563EB] transition-colors"
                  >
                    View Mockups ({project.images.length})
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Other Projects Grid (Slide Right with Staggered Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.filter(p => !p.featured).map((project, idx) => (
              <div
                key={project.id}
                onMouseMove={handleCardMouseMove}
                className="stagger-card rounded-2xl editorial-card border border-[#E4E4E7] overflow-hidden flex flex-col justify-between group bg-white"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F4F5]">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E4E4E7] text-[10px] font-semibold text-[#2563EB]">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#18181B] mb-2">{project.title}</h3>
                    <p className="text-xs text-[#52525B] leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-[#F4F4F5] border border-[#E4E4E7] text-[#52525B]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#E4E4E7]">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#18181B] font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-[#E4E4E7]"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2.5 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] text-[#52525B] hover:text-[#18181B] transition-colors"
                      title="View Mockups"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION (Staggered Entry for Service Cards) */}
        <section id="services" className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] mt-2 text-[#18181B]">How I Can Help</h2>
            <p className="text-[#52525B] text-sm mt-3">Professional services tailored for startups, creators, and businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, idx) => (
              <div
                key={idx}
                onMouseMove={handleCardMouseMove}
                className="stagger-card p-6 sm:p-8 rounded-2xl editorial-card border border-[#E4E4E7] flex flex-col justify-between bg-white"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#18181B] mb-2">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-6">{service.description}</p>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors pt-4 border-t border-[#E4E4E7]"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* WORK PROCESS SECTION (Staggered Entry for Steps) */}
        <section id="process" className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] mt-2 text-[#18181B]">From Idea to Execution</h2>
            <p className="text-[#52525B] text-sm mt-3">A structured approach to transforming ideas into reality.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map((w, idx) => (
              <div
                key={idx}
                onMouseMove={handleCardMouseMove}
                className="stagger-card p-6 rounded-2xl editorial-card border border-[#E4E4E7] flex flex-col justify-between relative overflow-hidden bg-white"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute top-4 right-4 text-4xl font-bold font-['Playfair_Display'] text-[#18181B]/5">
                  {w.step}
                </div>
                <div>
                  <span className="text-xs font-mono text-[#2563EB] font-bold block mb-2">STEP {w.step}</span>
                  <h3 className="text-lg font-bold font-['Playfair_Display'] text-[#18181B] mb-2">{w.title}</h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY WORK WITH ME (Staggered Entry) */}
        <section className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Working Principles</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] mt-2 text-[#18181B]">Why Collaborate With Me</h2>
            <p className="text-[#52525B] text-sm mt-3">Core values that guide every project and collaboration.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Creative Problem-Solving", desc: "Approaching challenges with curiosity, ingenuity, and adaptable perspectives." },
              { title: "Learning-Oriented Mindset", desc: "Continuously exploring new tools, technologies, and creative workflows." },
              { title: "Attention to Detail", desc: "Refining every element to ensure quality, polish, and professional standards." },
              { title: "Clear Communication", desc: "Maintaining transparent, responsive, and constructive communication throughout." },
              { title: "Focus on Usability", desc: "Ensuring digital solutions are practical, intuitive, and user-friendly." },
              { title: "Structured Project Planning", desc: "Organizing tasks and milestones to keep projects smooth and focused." }
            ].map((item, idx) => (
              <div
                key={idx}
                onMouseMove={handleCardMouseMove}
                className="stagger-card p-6 rounded-2xl editorial-card border border-[#E4E4E7] flex items-start gap-4 bg-white"
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Playfair_Display'] text-[#18181B] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB & SOCIAL LINKS (Slide Right) */}
        <section className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Connect</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] mt-2 text-[#18181B]">Explore My Digital World</h2>
            <p className="text-[#52525B] text-sm mt-3">Find me across platforms or reach out directly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto scroll-right">
            <a
              href="https://github.com/jigarjalu"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleCardMouseMove}
              className="p-6 rounded-2xl editorial-card border border-[#E4E4E7] flex flex-col items-center text-center group hover:border-[#2563EB] transition-all bg-white"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Github className="w-6 h-6 text-[#18181B]" />
              </div>
              <h3 className="text-base font-bold font-['Playfair_Display'] text-[#18181B] mb-1">GitHub</h3>
              <p className="text-xs text-[#52525B] mb-4">github.com/jigarjalu</p>
              <span className="text-xs text-[#2563EB] flex items-center gap-1 font-semibold">
                <span>View Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="https://www.instagram.com/jigar_jalu_07"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleCardMouseMove}
              className="p-6 rounded-2xl editorial-card border border-[#E4E4E7] flex flex-col items-center text-center group hover:border-[#2563EB] transition-all bg-white"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6 text-[#18181B]" />
              </div>
              <h3 className="text-base font-bold font-['Playfair_Display'] text-[#18181B] mb-1">Instagram</h3>
              <p className="text-xs text-[#52525B] mb-4">@jigar_jalu_07</p>
              <span className="text-xs text-[#2563EB] flex items-center gap-1 font-semibold">
                <span>Follow Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="mailto:jigarjalu09@gmail.com"
              onMouseMove={handleCardMouseMove}
              className="p-6 rounded-2xl editorial-card border border-[#E4E4E7] flex flex-col items-center text-center group hover:border-[#2563EB] transition-all bg-white"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-[#18181B]" />
              </div>
              <h3 className="text-base font-bold font-['Playfair_Display'] text-[#18181B] mb-1">Email</h3>
              <p className="text-xs text-[#52525B] mb-4">jigarjalu09@gmail.com</p>
              <span className="text-xs text-[#2563EB] flex items-center gap-1 font-semibold">
                <span>Send Message</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </section>

        {/* CONTACT SECTION (Slide Left) */}
        <section id="contact" className="px-4 sm:px-6 lg:px-16 py-20 sm:py-24 max-w-7xl mx-auto border-t border-[#E4E4E7]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-left">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">Get In Touch</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] text-[#18181B]">Have an Idea? Let's Build Something Great.</h2>
              <p className="text-[#52525B] text-sm leading-relaxed">
                Whether you have a website idea, a creative project, or an opportunity to collaborate, I'd be glad to hear about it.
              </p>

              <div className="flex flex-col gap-4 pt-4">
                <div 
                  onMouseMove={handleCardMouseMove}
                  className="flex items-center gap-4 p-4 rounded-xl editorial-card border border-[#E4E4E7] bg-white"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-[#2563EB]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#71717A] block">Email Address</span>
                    <a href="mailto:jigarjalu09@gmail.com" className="text-sm font-semibold text-[#18181B] hover:text-[#2563EB] transition-colors">
                      jigarjalu09@gmail.com
                    </a>
                  </div>
                </div>

                <div 
                  onMouseMove={handleCardMouseMove}
                  className="flex items-center gap-4 p-4 rounded-xl editorial-card border border-[#E4E4E7] bg-white"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-[#2563EB]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#71717A] block">Location</span>
                    <span className="text-sm font-semibold text-[#18181B]">Junagadh, Gujarat 362001, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 w-full">
              <div 
                onMouseMove={handleCardMouseMove}
                className="p-6 sm:p-8 rounded-3xl editorial-panel border border-[#2563EB]/30 shadow-xl relative bg-white"
              >
                {formSubmitted ? (
                  <div className="py-12 text-center flex flex-col items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-300">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-['Playfair_Display'] text-[#18181B]">Inquiry Sent Successfully!</h3>
                    <p className="text-xs sm:text-sm text-[#52525B] max-w-md">
                      Thank you for reaching out. Your message has been prepared. You can also directly email me at <a href="mailto:jigarjalu09@gmail.com" className="text-[#2563EB] underline">jigarjalu09@gmail.com</a>.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] text-[#18181B] text-xs font-semibold hover:border-[#2563EB] transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <h3 className="text-xl font-bold font-['Playfair_Display'] text-[#18181B]">Send a Message</h3>

                    {formError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#52525B]">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="px-4 py-3 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#52525B]">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="px-4 py-3 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#2563EB] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#52525B]">Project Type</label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="px-4 py-3 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#2563EB] transition-colors"
                        >
                          <option value="Website Development">Website Development</option>
                          <option value="Website Design">Website Design</option>
                          <option value="AI Prompt Engineering">AI Prompt Engineering</option>
                          <option value="Digital Creative Solution">Digital Creative Solution</option>
                          <option value="Project Planning">Project Planning</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#52525B]">Budget Range (Optional)</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="px-4 py-3 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#2563EB] transition-colors"
                        >
                          <option value="Flexible">Flexible / Discuss</option>
                          <option value="Small ($500 - $1,500)">Small ($500 - $1,500)</option>
                          <option value="Medium ($1,500 - $5,000)">Medium ($1,500 - $5,000)</option>
                          <option value="Large ($5,000+)">Large ($5,000+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#52525B]">Project Details *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project, goals, or requirements..."
                        className="px-4 py-3 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full py-4 rounded-xl bg-[#2563EB] text-white font-semibold text-sm shadow-md shadow-[#2563EB]/20 hover:bg-[#1D4ED8] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {formSubmitting ? (
                        <span>Sending Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <span className="text-xs text-[#52525B]">
                        Prefer direct email? Reach out at <a href="mailto:jigarjalu09@gmail.com" className="text-[#2563EB] underline font-semibold">jigarjalu09@gmail.com</a>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E4E4E7] bg-white px-4 sm:px-6 lg:px-16 py-12 mt-20 scroll-reveal">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-[#E4E4E7] bg-[#F9F9F8] p-1">
              <img
                src={logoSrc}
                alt="JJJ Logo"
                className="w-full h-full object-cover rounded-lg animate-rotate-in"
              />
            </div>
            <span className="font-['Playfair_Display'] font-bold text-[#18181B] text-base">Jigar J Jalu</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#52525B]">
            <a href="#home" className="hover:text-[#2563EB] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#2563EB] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[#2563EB] transition-colors">Expertise</a>
            <a href="#projects" className="hover:text-[#2563EB] transition-colors">Projects</a>
            <a href="#services" className="hover:text-[#2563EB] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#2563EB] transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/jigarjalu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-[#52525B] hover:text-[#18181B] transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/jigar_jalu_07"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-[#52525B] hover:text-[#18181B] transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:jigarjalu09@gmail.com"
              className="p-2.5 rounded-xl bg-[#F9F9F8] border border-[#E4E4E7] text-[#52525B] hover:text-[#18181B] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between text-xs text-[#52525B] gap-4">
          <p>© {new Date().getFullYear()} Jigar J Jalu. All rights reserved.</p>
          <p>Junagadh, Gujarat 362001, India</p>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-[#2563EB] text-white shadow-lg hover:bg-[#1D4ED8] transition-all animate-rotate-in group border border-white/20"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* PROJECT MODAL WITH IMAGE CAROUSEL / SLIDER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            onMouseMove={handleCardMouseMove}
            className="w-full max-w-2xl rounded-3xl editorial-panel border border-[#E4E4E7] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-[fadeIn_0.2s_ease-out] bg-white"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] text-[#18181B] hover:bg-[#E4E4E7] transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold">{selectedProject.category}</span>
            <h3 className="text-2xl font-bold font-['Playfair_Display'] text-[#18181B] mt-1 mb-4">{selectedProject.title}</h3>
            
            {/* Carousel / Slider Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 bg-[#F4F4F5] border border-[#E4E4E7]">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} mockup ${currentImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Carousel Navigation Buttons */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E4E4E7] text-[#18181B] hover:bg-white shadow-md transition-all"
                    aria-label="Previous mockup"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E4E4E7] text-[#18181B] hover:bg-white shadow-md transition-all"
                    aria-label="Next mockup"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Carousel Indicators / Dots */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                    {selectedProject.images.map((_: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          currentImageIndex === idx ? 'bg-[#2563EB] w-6' : 'bg-white/70 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail preview strip */}
            {selectedProject.images.length > 1 && (
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {selectedProject.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      currentImageIndex === idx ? 'border-[#2563EB] scale-105 shadow-md' : 'border-[#E4E4E7] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <p className="text-sm text-[#52525B] leading-relaxed mb-6">{selectedProject.description}</p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#18181B] uppercase tracking-wider mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech: string, i: number) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7] text-[#18181B]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#E4E4E7]">
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 rounded-xl bg-[#2563EB] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#1D4ED8] transition-colors"
              >
                <span>Launch Live Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F4F4F5] border border-[#E4E4E7] text-[#18181B] text-xs font-semibold hover:border-[#2563EB] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
