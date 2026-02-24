// Benefit data
export interface BenefitItem {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

export const benefitData: BenefitItem[] = [
  {
    id: 1,
    icon: "ShieldCheck",
    title: "Regulatory Compliance",
    desc: "Fully regulated processes ensuring patient safety and compliance with international standards.",
  },
  {
    id: 2,
    icon: "Globe",
    title: "Global Reach",
    desc: "Temperature-controlled supply chain delivering medicines to over 100 countries worldwide.",
  },
  {
    id: 3,
    icon: "Clock",
    title: "Fast Delivery",
    desc: "Expedited shipping options ensuring critical medicines reach patients when they need them.",
  },
  {
    id: 4,
    icon: "Headset",
    title: "Expert Support",
    desc: "Dedicated healthcare specialists providing personalized support throughout your journey.",
  },
];

// Service data
export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export const serviceData: ServiceItem[] = [
  {
    id: "1",
    icon: "Pill",
    title: "Specialty Medicines",
    desc: "Access to unlicensed and hard-to-find medicines for rare and complex conditions.",
  },
  {
    id: "2",
    icon: "FileText",
    title: "Regulatory Services",
    desc: "Complete documentation and regulatory support for medicine import and export.",
  },
  {
    id: "3",
    icon: "Thermometer",
    title: "Cold Chain Logistics",
    desc: "Temperature-controlled storage and transportation ensuring product integrity.",
  },
  {
    id: "4",
    icon: "ShieldCheck",
    title: "Quality Assurance",
    desc: "Rigorous quality checks and verification processes for all products.",
  },
  {
    id: "5",
    icon: "Users",
    title: "Patient Programs",
    desc: "Managed access programs providing early access to innovative treatments.",
  },
  {
    id: "6",
    icon: "TrendingUp",
    title: "Market Access",
    desc: "Strategic solutions for bringing medicines to new markets efficiently.",
  },
];

// Testimonial data
export interface TestimonialItem {
  id: number;
  image: string;
  name: string;
  company: string;
  review: string;
  rate: number;
}

export const testimonialData: TestimonialItem[] = [
  {
    id: 1,
    image: "/images/avatar/540x370.png",
    name: "Dr. Alexander Ball",
    company: "Chief Medical Officer",
    review: "Clinigen exceeded our expectations with their rapid response and reliable supply chain. Highly recommended!",
    rate: 5,
  },
  {
    id: 2,
    image: "/images/avatar/540x370.png",
    name: "Sarah Watt",
    company: "Healthcare Director",
    review: "Their team's expertise in regulatory compliance made the entire process seamless and stress-free.",
    rate: 5,
  },
  {
    id: 3,
    image: "/images/avatar/540x370.png",
    name: "Dr. Tony Adams",
    company: "Pharmacy Lead",
    review: "We've been able to provide critical treatments to our patients thanks to Clinigen's dedication.",
    rate: 4,
  },
  {
    id: 4,
    image: "/images/avatar/540x370.png",
    name: "Dr. Malika Kenny",
    company: "Hospital Administrator",
    review: "Outstanding service and support. They truly understand the urgency of healthcare needs.",
    rate: 5,
  },
];

// Case study data
export interface CaseStudyItem {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbImage: string;
}

export const caseStudyData: CaseStudyItem[] = [
  {
    id: 1,
    title: "Rare Disease Treatment Access",
    description: "Providing life-saving medicine to patients with ultra-rare conditions across Europe.",
    category: "Patient Access",
    thumbImage: "/images/blog/1290x837.png",
  },
  {
    id: 2,
    title: "Emergency Medicine Supply",
    description: "Rapid response delivery of critical medications during healthcare emergencies.",
    category: "Emergency Response",
    thumbImage: "/images/blog/1290x837.png",
  },
  {
    id: 3,
    title: "Global Distribution Network",
    description: "Building a reliable cold chain network for temperature-sensitive biologics.",
    category: "Logistics",
    thumbImage: "/images/blog/1290x837.png",
  },
  {
    id: 4,
    title: "Regulatory Approval Success",
    description: "Navigating complex regulatory pathways for innovative therapy approvals.",
    category: "Regulatory",
    thumbImage: "/images/blog/1290x837.png",
  },
  {
    id: 5,
    title: "Patient Support Program",
    description: "Comprehensive support services ensuring treatment adherence and positive outcomes.",
    category: "Patient Care",
    thumbImage: "/images/blog/1290x837.png",
  },
];
