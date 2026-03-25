import { Profile, Education, Certificate, Project } from './types';

export const INITIAL_PROFILE: Profile = {
  name: "Bulbul Goyal",
  title: "B.Tech in Information Technology",
  bio: "An aspiring software developer focused on building responsive and user-friendly web applications. I am passionate about learning new technologies and solving real-world problems.",
  experience: "1 Internship",
  projectsCount: "2",
  companiesCount: "1",
  educationLevel: "B.Tech in IT",
  resumeUrl: "#",
  imageUrl: "https://img.sanishtech.com/u/3f05bb8e81f49a2ded27ad368a00ff69.png"
};

export const INITIAL_EDUCATION: Education[] = [
  {
    id: "edu1",
    degree: "Bachelor of Technology in Information Technology",
    institution: "Amity University Gwalior MP",
    description: "Currently pursuing B.Tech with a focus on information technology and software engineering.",
    order: 1
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "cert1",
    title: "Certificate of Appreciation - Volunteer",
    issuer: "HackSetu 1.0 / Amity University Madhya Pradesh",
    date: "Nov 3-4, 2025",
    imageUrl: "https://img.sanishtech.com/u/23ae0e40351e312e37fe0393365bb463.jpeg",
    description: "Served as a Volunteer during HackSetu 1.0, a 24-Hour National Level Hackathon held at Amity University Madhya Pradesh."
  },
  {
    id: "cert2",
    title: "Certificate of Participation - Internal SIH 2025",
    issuer: "Amity University Madhya Pradesh",
    date: "Sept 19, 2025",
    imageUrl: "https://img.sanishtech.com/u/615d6380c13b9196b4f71ccb8e55cad0.jpeg",
    description: "Successfully participated in Internal SIH 2025 held at Amity University Madhya Pradesh."
  },
  {
    id: "cert3",
    title: "Certificate of Participation - MY Bharat Budget Quest",
    issuer: "Ministry of Youth Affairs & Sports",
    date: "Feb 11, 2026",
    imageUrl: "https://img.sanishtech.com/u/3226a4f4c7e719d22ccb0a9e3b5217c1.jpeg",
    description: "Participated in the Online Quiz on MY Bharat Budget Quest 2026 conducted on MYBharat."
  },
  {
    id: "cert4",
    title: "Certificate of Participation - Cyber Security",
    issuer: "1stop.ai / IIT Guwahati",
    date: "Mar 5, 2025",
    imageUrl: "https://img.sanishtech.com/u/b880bba12242417f605bcb6b907fd6ba.jpeg",
    description: "Completed the Cyber Security program (Jan 1st - Feb 28th, 2025) in association with IIT Guwahati."
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application with React and Firebase.",
    imageUrl: "https://picsum.photos/seed/shop/400/300",
    link: "#"
  },
  {
    id: "proj2",
    title: "EcoQuest",
    description: "An interactive platform for environmental awareness and sustainable living.",
    imageUrl: "https://picsum.photos/seed/eco/400/300",
    link: "https://github.com/being-harsh2025/EcoQuest"
  }
];
