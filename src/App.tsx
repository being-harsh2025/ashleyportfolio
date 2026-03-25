import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  GraduationCap,
  Star,
  Briefcase,
  Award,
  Mail,
  Search,
  Download,
  Linkedin,
  Apple,
  Twitter,
  Mail as MailIcon,
  Github,
  ExternalLink,
  Send,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import {
  db,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  handleFirestoreError,
  OperationType,
} from "./firebase";
import { Profile, Education, Certificate, Project, Message } from "./types";
import {
  INITIAL_PROFILE,
  INITIAL_EDUCATION,
  INITIAL_CERTIFICATES,
  INITIAL_PROJECTS,
} from "./constants";

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 ${
      active
        ? "bg-[#E0E7FF] text-[#6366F1] border-r-4 border-[#6366F1]"
        : "text-gray-500 hover:bg-gray-50"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StatCard = ({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: any;
  value: string | number;
  label: string;
  color: string;
}) => (
  <div
    className={`${color} p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm`}
  >
    <div className="bg-white/50 p-2 rounded-lg mb-2">
      <Icon size={20} className="text-[#6366F1]" />
    </div>
    <div className="font-bold text-lg text-gray-800">{value}</div>
    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
      {label}
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-2 mb-6">
    <div className="bg-[#6366F1] p-1.5 rounded-lg">
      <Icon size={18} className="text-white" />
    </div>
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [education, setEducation] = useState<Education[]>(INITIAL_EDUCATION);
  const [certificates, setCertificates] =
    useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  // Firestore Data Fetching
  useEffect(() => {
    const profileSub = onSnapshot(
      collection(db, "profile"),
      (snapshot) => {
        if (!snapshot.empty) {
          setProfile((prev) => ({ ...prev, ...snapshot.docs[0].data() }));
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, "profile"),
    );

    const eduSub = onSnapshot(
      query(collection(db, "education"), orderBy("order")),
      (snapshot) => {
        if (!snapshot.empty) {
          setEducation(
            snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() }) as Education,
            ),
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, "education"),
    );

    const certSub = onSnapshot(
      collection(db, "certificates"),
      (snapshot) => {
        if (!snapshot.empty) {
          setCertificates(
            snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() }) as Certificate,
            ),
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, "certificates"),
    );

    const projSub = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        if (!snapshot.empty) {
          setProjects(
            snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() }) as Project,
            ),
          );
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, "projects"),
    );

    return () => {
      profileSub();
      eduSub();
      certSub();
      projSub();
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const messageData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "messages"), messageData);
      alert("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "messages");
    }
  };

  const sections = [
    { id: "Dashboard", icon: LayoutDashboard },
    { id: "Education", icon: GraduationCap },
    { id: "Skills", icon: Star },
    { id: "Projects", icon: Briefcase },
    { id: "Certificates", icon: Award },
    { id: "Contact Us", icon: MailIcon },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-gray-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen">
        <div className="p-8 flex flex-col items-center border-bottom border-gray-50">
          <h1 className="text-xl font-bold text-gray-800 mb-1">
            {profile.name}
          </h1>
          <p className="text-xs text-gray-500 font-medium mb-4">
            {profile.title}
          </p>

          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/bulbul-goyal-6a5523364/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#E0E7FF] text-[#6366F1] rounded-full hover:bg-[#6366F1] hover:text-white transition-all"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/bulbulgoyal12"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#E0E7FF] text-[#6366F1] rounded-full hover:bg-[#6366F1] hover:text-white transition-all"
            >
              <Github size={16} />
            </a>
            <a
              href={`mailto:goyalbulbul40@gmail.com`}
              className="p-2 bg-[#E0E7FF] text-[#6366F1] rounded-full hover:bg-[#6366F1] hover:text-white transition-all"
            >
              <MailIcon size={16} />
            </a>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          {sections.map((section) => (
            <SidebarItem
              key={section.id}
              icon={section.icon}
              label={section.id}
              active={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
            />
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <div className="flex flex-col gap-2">
            <div className="h-2 w-full bg-[#E0E7FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#6366F1] w-3/4"></div>
            </div>
            <div className="h-2 w-full bg-[#E0E7FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#A5B4FC] w-1/2"></div>
            </div>
            <div className="h-2 w-full bg-[#E0E7FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#C7D2FE] w-1/4"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="w-64 bg-white h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 flex flex-col items-center border-b border-gray-50">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#E0E7FF] shadow-md mb-4">
                  <img
                    src={profile.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h1 className="text-lg font-bold text-gray-800">
                  {profile.name}
                </h1>
                <p className="text-xs text-gray-500">{profile.title}</p>
              </div>
              <nav className="mt-4 flex-1">
                {sections.map((section) => (
                  <SidebarItem
                    key={section.id}
                    icon={section.icon}
                    label={section.id}
                    active={activeSection === section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-gray-500"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-50 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-[#6366F1] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-6"></div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-10 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeSection === "Dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Hero */}
                <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-gray-50 relative overflow-hidden min-h-[400px] flex items-center">
                  <div className="relative z-10 max-w-[60%] lg:max-w-2xl">
                    <p className="text-[#6366F1] font-bold text-lg mb-2">
                      Hi, I am
                    </p>
                    <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                      {profile.name}
                    </h2>
                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                      {profile.title} with a passion for creating innovative
                      solutions. Explore my work and skills below.
                    </p>
                    <button className="bg-[#6366F1] text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-[#4F46E5] transition-all flex items-center gap-3 group">
                      <Download
                        size={20}
                        className="group-hover:translate-y-1 transition-transform"
                      />
                      <span>Download Resume</span>
                    </button>
                  </div>

                  <div className="absolute right-[-20px] sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-[#F5F3FF] shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <img
                        src={profile.imageUrl || INITIAL_PROFILE.imageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Decorative blobs */}
                  <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-[#E0E7FF] rounded-full blur-3xl opacity-50"></div>
                  <div className="absolute bottom-[-10%] left-[40%] w-48 h-48 bg-[#F5F3FF] rounded-full blur-3xl opacity-50"></div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Intro Card */}
                  <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                    <SectionHeader icon={LayoutDashboard} title="Dashboard" />
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Hello! I'm {profile.name}
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                          {profile.bio}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <StatCard
                          icon={Briefcase}
                          value={profile.experience}
                          label="Experience"
                          color="bg-[#EFF6FF]"
                        />
                        <StatCard
                          icon={Star}
                          value={profile.projectsCount}
                          label="Projects"
                          color="bg-[#F5F3FF]"
                        />
                        <StatCard
                          icon={Award}
                          value={profile.companiesCount}
                          label="Internship"
                          color="bg-[#F0FDF4]"
                        />
                        <StatCard
                          icon={GraduationCap}
                          value={profile.educationLevel}
                          label="Education"
                          color="bg-[#FFF7ED]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Education Card */}
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                    <SectionHeader icon={GraduationCap} title="Education" />
                    <div className="space-y-8">
                      {education.map((edu, idx) => (
                        <div
                          key={edu.id}
                          className="relative pl-8 border-l-2 border-gray-100 last:border-0 pb-2"
                        >
                          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#6366F1] border-4 border-white shadow-sm"></div>
                          <h4 className="font-bold text-gray-800 leading-tight mb-1">
                            {edu.degree}
                          </h4>
                          <p className="text-xs text-[#6366F1] font-bold mb-2">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Nav Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      id: "Skills",
                      icon: Star,
                      color: "text-blue-500",
                      bg: "bg-blue-50",
                    },
                    {
                      id: "Projects",
                      icon: Briefcase,
                      color: "text-orange-500",
                      bg: "bg-orange-50",
                    },
                    {
                      id: "Certificates",
                      icon: Award,
                      color: "text-purple-500",
                      bg: "bg-purple-50",
                    },
                    {
                      id: "Contact Us",
                      icon: MailIcon,
                      color: "text-indigo-500",
                      bg: "bg-indigo-50",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all group"
                    >
                      <div
                        className={`${item.bg} p-2 rounded-xl group-hover:scale-110 transition-transform`}
                      >
                        <item.icon size={20} className={item.color} />
                      </div>
                      <span className="font-bold text-sm text-gray-700">
                        {item.id}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "Education" && (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-gray-50"
              >
                <SectionHeader icon={GraduationCap} title="Education History" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {education.map((edu) => (
                    <div key={edu.id} className="group">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#E0E7FF] p-3 rounded-2xl text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                          <GraduationCap size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {edu.degree}
                          </h3>
                          <p className="text-[#6366F1] font-bold mb-4">
                            {edu.institution}
                          </p>
                          <p className="text-gray-500 leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "Certificates" && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-gray-50">
                  <SectionHeader
                    icon={Award}
                    title="Certificates & Achievements"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group hover:shadow-xl transition-all"
                      >
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={cert.imageUrl}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => setSelectedCertificate(cert)}
                              className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2"
                            >
                              <Search size={16} />
                              View Certificate
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800 text-lg leading-tight">
                              {cert.title}
                            </h3>
                            <span className="text-[10px] font-bold bg-[#E0E7FF] text-[#6366F1] px-2 py-1 rounded-full uppercase">
                              {cert.date}
                            </span>
                          </div>
                          <p className="text-[#6366F1] text-sm font-bold mb-3">
                            {cert.issuer}
                          </p>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "Projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-gray-50"
              >
                <SectionHeader icon={Briefcase} title="My Projects" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-gray-800 text-lg mb-2">
                          {proj.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {proj.description}
                        </p>
                        <a
                          href={proj.link}
                          className="text-[#6366F1] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          View Project <ChevronRight size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "Skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-gray-50"
              >
                <SectionHeader icon={Star} title="Technical Skills" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: "HTML", level: "95%", icon: "🌐" },
                    { name: "CSS", level: "90%", icon: "🎨" },
                    { name: "JavaScript", level: "85%", icon: "📜" },
                    { name: "Java", level: "80%", icon: "☕" },
                    { name: "Python", level: "75%", icon: "🐍" },
                    { name: "C++", level: "70%", icon: "💻" },
                    { name: "SQL", level: "80%", icon: "📊" },
                    { name: "Firebase", level: "85%", icon: "🔥" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center group hover:bg-[#6366F1] transition-all"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-125 transition-transform">
                        {skill.icon}
                      </div>
                      <h4 className="font-bold text-gray-800 group-hover:text-white mb-1">
                        {skill.name}
                      </h4>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-[#6366F1] group-hover:bg-white"
                          style={{ width: skill.level }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "Contact Us" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-gray-50">
                  <SectionHeader icon={MailIcon} title="Get in Touch" />
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    Have a question or want to work together? Feel free to reach
                    out using the form below or through my social media
                    channels.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#E0E7FF] p-3 rounded-2xl text-[#6366F1]">
                        <MailIcon size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                          Email Me
                        </p>
                        <p className="font-bold text-gray-800">
                          goyalbulbul40@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F5F3FF] p-3 rounded-2xl text-purple-500">
                        <Linkedin size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                          LinkedIn
                        </p>
                        <p className="font-bold text-gray-800">
                          linkedin.com/in/bulbul-goyal-6a5523364/
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-gray-50">
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                          Name
                        </label>
                        <input
                          name="name"
                          required
                          type="text"
                          placeholder="Your Name"
                          className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                          Email
                        </label>
                        <input
                          name="email"
                          required
                          type="email"
                          placeholder="Your Email"
                          className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        Subject
                      </label>
                      <input
                        name="subject"
                        type="text"
                        placeholder="Subject"
                        className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Your Message"
                        className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6366F1] transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#6366F1] text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-[#4F46E5] transition-all flex items-center justify-center gap-2 group"
                    >
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="mt-auto p-8 text-center text-gray-400 text-xs font-medium flex flex-col items-center gap-4">
          <p>
            © 2026 {profile.name}. All rights reserved. Built with React &
            Firebase.
          </p>
        </footer>
      </main>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-sm text-[#6366F1] font-bold">
                    {selectedCertificate.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 lg:p-8 flex items-center justify-center bg-gray-50">
                <img
                  src={selectedCertificate.imageUrl}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-white border-t border-gray-100">
                <p className="text-gray-500 text-sm leading-relaxed">
                  {selectedCertificate.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
