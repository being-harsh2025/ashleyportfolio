export interface Profile {
  name: string;
  title: string;
  bio: string;
  experience: string;
  projectsCount: string;
  companiesCount: string;
  educationLevel: string;
  resumeUrl: string;
  imageUrl: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  description: string;
  order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
