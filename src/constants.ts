import { Profile, Education, Certificate, Project } from "./types";

export const INITIAL_PROFILE: Profile = {
  name: "Bulbul Goyal",
  title: "B.Tech in Information Technology",
  bio: "An aspiring software developer focused on building responsive and user-friendly web applications. I am passionate about learning new technologies and solving real-world problems.",
  experience: "1 Internship",
  projectsCount: "2",
  companiesCount: "1",
  educationLevel: "B.Tech in IT",
  resumeUrl: "#",
  imageUrl:
    "https://image2url.com/r2/default/images/1774491737373-bf2ed674-b7f3-4bbc-99e6-aee5a262603e.png",
};

export const INITIAL_EDUCATION: Education[] = [
  {
    id: "edu1",
    degree: "Bachelor of Technology in Information Technology",
    institution: "Amity University Gwalior MP",
    description:
      "Currently pursuing B.Tech with a focus on information technology and software engineering.",
    order: 1,
  },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "cert1",
    title: "Certificate of Appreciation - Volunteer",
    issuer: "HackSetu 1.0 / Amity University Madhya Pradesh",
    date: "Nov 3-4, 2025",
    imageUrl:
      "https://image2url.com/r2/default/images/1774491892391-5200a388-e3e5-4a83-a9bf-480fae8ca694.jpeg",
    description:
      "Served as a Volunteer during HackSetu 1.0, a 24-Hour National Level Hackathon held at Amity University Madhya Pradesh.",
  },
  {
    id: "cert2",
    title: "Certificate of Participation - Internal SIH 2025",
    issuer: "Amity University Madhya Pradesh",
    date: "Sept 19, 2025",
    imageUrl:
      "https://image2url.com/r2/default/images/1774491950139-77af875b-a523-4623-926a-2b065015af25.jpeg",
    description:
      "Successfully participated in Internal SIH 2025 held at Amity University Madhya Pradesh.",
  },
  {
    id: "cert3",
    title: "Certificate of Participation - MY Bharat Budget Quest",
    issuer: "Ministry of Youth Affairs & Sports",
    date: "Feb 11, 2026",
    imageUrl:
      "https://image2url.com/r2/default/images/1774492036632-41e15cdd-8410-4fe0-bf3d-6e9a6db7b611.jpeg",
    description:
      "Participated in the Online Quiz on MY Bharat Budget Quest 2026 conducted on MYBharat.",
  },
  {
    id: "cert4",
    title: "Certificate of Participation - Cyber Security",
    issuer: "1stop.ai / IIT Guwahati",
    date: "Mar 5, 2025",
    imageUrl:
      "https://image2url.com/r2/default/images/1774492098643-190d4f1f-c063-42b5-8a75-7adbe529c7c5.jpeg",
    description:
      "Completed the Cyber Security program (Jan 1st - Feb 28th, 2025) in association with IIT Guwahati.",
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application with React and Firebase.",
    imageUrl:
      "https://image2url.com/r2/default/images/1774492494068-db3b030b-548c-41cd-9325-8a7149755fb9.png",
    link: "#",
  },
  {
    id: "proj2",
    title: "EcoQuest",
    description:
      "An interactive platform for environmental awareness and sustainable living.",
    imageUrl:
      "https://image2url.com/r2/default/images/1774492554580-121bb219-5f34-4396-b011-a4d83392825e.png",
    link: "https://github.com/being-harsh2025/EcoQuest",
  },
];
