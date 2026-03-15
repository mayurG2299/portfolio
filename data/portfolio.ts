export type Portfolio = {
  exportOptions: {
    exportPdf: boolean;
    printPdf: boolean;
  };
  summary: {
    print: boolean;
    text: string;
  };
  name: string;
  title: string;
  contact: {
    print: boolean;
    heading: string;
    subtext: string;
    email: string;
    linkedinUrl: string | null;
    github: string;
    twitter: string | null;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: Array<{ label: string; href: string; primary?: boolean }>;
  };
  skills: {
    print: boolean;
    items: Array<{ print: boolean; category: string; items: string }>;
  };
  experience: {
    print: boolean;
    items: Array<{
      id: string;
      print: boolean;
      company: string;
      location: string;
      totalDates: string;
      roles: Array<{
        print: boolean;
        title: string;
        dates: string;
        stack: string | null;
        bullets: Array<{ print: boolean; text: string }>;
      }>;
    }>;
  };
  projects: {
    print: boolean;
    items: Array<{
      id: string;
      print: boolean;
      name: string;
      featured: boolean;
      tags: string | null;
      github: string | null;
      dockerHub: string | null;
      live?: string | null;
      highlight: string;
      bullets: Array<{ print: boolean; text: string }>;
    }>;
  };
  education: {
    print: boolean;
    items: Array<{
      print: boolean;
      degree: string;
      institution: string;
      dates: string;
      grade: string;
    }>;
  };
  certifications: {
    print: boolean;
    items: Array<{ print: boolean; text: string }>;
  };
  footer: {
    credit: string;
  };
};

export const portfolioData: Portfolio = {
  exportOptions: {
    exportPdf: false,
    printPdf: true,
  },
  summary: {
    print: true,
    text: "Senior Software Engineer with 6+ years of experience and a backend specialization in high-traffic, production-grade systems with full ownership from architecture to deployment. Deep expertise in Node.js, NestJS, TypeScript, AWS, and PostgreSQL. Also experienced with React and Next.js for full-stack delivery.",
  },
  name: "Mayur Subhash Ghadi",
  title: "Senior Software Engineer",
  contact: {
    print: true,
    heading: "Let's talk.",
    subtext: "If you have a project in mind, or just want to chat, feel free to reach out. I'm currently open to new opportunities.",
    email: "ghadim221999@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/mayurghadi2299",
    github: "https://github.com/mayurG2299",
    twitter: null,
  },
  hero: {
    headline: "Mayur Subhash Ghadi",
    subheadline: "Senior Software Engineer specializing in backend systems and full-stack delivery.",
    cta: [
      { label: "View Projects", href: "#projects", primary: true },
      { label: "Download Resume", href: "/resume.pdf", primary: false },
    ],
  },
  skills: {
    print: true,
    items: [
      { print: true, category: "Languages", items: "JavaScript, TypeScript" },
      {
        print: true,
        category: "Backend",
        items: "Node.js, NestJS, Express.js, Serverless Framework, REST APIs",
      },
      { print: true, category: "Frontend", items: "React.js, Next.js, Ext JS" },
      {
        print: true,
        category: "Databases",
        items: "PostgreSQL, MySQL, MongoDB, Redis, AWS MemoryDB",
      },
      {
        print: true,
        category: "Cloud & Infra",
        items: "AWS (Lambda, S3, EC2), CI/CD (Bitbucket Pipelines), Monorepo, Docker",
      },
      {
        print: true,
        category: "Observability",
        items: "SigNoz, Sentry, AppOptics",
      },
      {
        print: true,
        category: "Tools",
        items: "Git, GitHub, GitLab, VAPT Testing",
      },
    ],
  },
  experience: {
    print: true,
    items: [
      {
        id: "fitpage",
        print: true,
        company: "Fitpage (IndiaRunning)",
        location: "Mumbai",
        totalDates: "Jun 2024 – Present",
        roles: [
          {
            print: true,
            title: "Pod Co-Lead — IndiaRunning",
            dates: "Oct 2025 – Present",
            stack: null,
            bullets: [
              {
                print: true,
                text: "Co-leading the IndiaRunning pod after VP's departure — fully responsible for backend systems, planning, and working with teams across the company for 10k+ daily active users.",
              },
              {
                print: true,
                text: "Architected a unified communication platform handling emails, SMS, and push notifications for 100k+ monthly events — consolidated scattered notification logic into one service supporting 50k+ notifications/day.",
              },
              {
                print: true,
                text: "Driving system architecture decisions end-to-end: API design, service boundaries, and data flow across the platform, achieving sub-100ms p99 response times.",
              },
            ],
          },
          {
            print: true,
            title: "Core Team Lead",
            dates: "Jan 2025 – Oct 2025",
            stack: "Node.js · NestJS · TypeScript · AWS · PostgreSQL · Redis · Expo · Bitbucket Pipelines · SigNoz · Sentry",
            bullets: [
              {
                print: false,
                text: "Led a cross-functional team of 3 (2 engineers + 1 DevOps) for feature development and deployment across IndiaRunning.",
              },
              {
                print: true,
                text: "Built a communication microservice from scratch handling emails, SMS, and push notifications — processing 50k+ notifications/day.",
              },
              {
                print: false,
                text: "Led security hardening: conducted VAPT testing across backend services.",
              },
              {
                print: true,
                text: "Replaced frontend file uploads with backend-issued S3 signed URLs, eliminating credential exposure for 10k+ users.",
              },
              {
                print: true,
                text: "Integrated full observability stack (SigNoz, AppOptics, Sentry) from scratch — enabling real-time error tracking, alerting, and performance monitoring across 10+ services.",
              },
              {
                print: true,
                text: "Introduced monorepo architecture and built Bitbucket CI/CD pipelines, standardising multi-service deployments for 10+ backend and frontend apps.",
              },
              {
                print: false,
                text: "Supported DevOps tasks: environment setup, pipeline management, and monitoring integration for production workloads.",
              },
            ],
          },
          {
            print: true,
            title: "Senior Web Application Developer",
            dates: "Jun 2024 – Jan 2025",
            stack: null,
            bullets: [
              {
                print: true,
                text: "Developed core platform modules for IndiaRunning: race listings, user registration, and organiser dashboard serving 10k+ daily active users.",
              },
              {
                print: true,
                text: "Deployed a self-hosted Listmonk email system — eliminated CSV/email-based data sharing, reducing operational risk and third-party costs for 100k+ emails/month.",
              },
              {
                print: true,
                text: "Built an Expo mobile app to digitise and automate on-ground event coordination workflows, replacing previously manual processes for 500+ events/year.",
              },
              {
                print: true,
                text: "Contributed to the launch of Spolo, a sports venue booking platform, building organiser-facing dashboard features supporting 1k+ venues.",
              },
              {
                print: false,
                text: "Prototyped AI-powered features for IndiaRunning at an internal hackathon, targeting 10k+ users.",
              },
              {
                print: false,
                text: "Conducting technical interviews for backend engineering roles.",
              },
            ],
          },
        ],
      },
      {
        id: "sugar-cosmetics",
        print: true,
        company: "Sugar Cosmetics (Vellvette Lifestyle Pvt. Ltd.)",
        location: "Mumbai",
        totalDates: "May 2022 – Jun 2024",
        roles: [
          {
            print: true,
            title: "Backend Developer",
            dates: "May 2022 – Jun 2024",
            stack: "Node.js · AWS Lambda · Serverless · MySQL · Redis · React.js",
            bullets: [
              {
                print: true,
                text: "Architected 'CLUB Vellvette', a cross-brand membership feature enabling 20% discount across 3 brands — contributed to a 20–30% increase in average order value post-launch (serving 50k+ users).",
              },
              {
                print: true,
                text: "Designed full backend for two high-traffic birthday campaign events (slot machine, 1-min raids), handling 10k+ concurrent users with randomised reward logic and robust scaling.",
              },
              {
                print: true,
                text: "Built complete backend for two new brand websites (Sugar Pop, Quench) — users, payments, ACL, payment gateways, AWS Lambda, and S3, supporting 100k+ monthly visitors.",
              },
              {
                print: false,
                text: "Integrated Gokwik's address pre-fetch API, reducing user drop-off at the checkout address form and improving conversion rates by 15%.",
              },
              {
                print: false,
                text: "Designed WhatsApp order-journey chatbot with Gupshup, converting abandoned carts to completed orders for 5k+ users/month.",
              },
              {
                print: true,
                text: "Reduced product page API latency by implementing Redis caching for recommendations and recently viewed items — achieved 3x reduction in query time and 90%+ cache hit rate.",
              },
              {
                print: false,
                text: "Built WebEngage-powered notification system for back-in-stock alerts, delivering 10k+ notifications/day with high deliverability.",
              },
            ],
          },
        ],
      },
      {
        id: "vistaar",
        print: true,
        company: "Vistaar Technologies",
        location: "Mumbai",
        totalDates: "Aug 2020 – Apr 2022",
        roles: [
          {
            print: true,
            title: "Software Engineer",
            dates: "Aug 2020 – Apr 2022",
            stack: "Node.js · JavaScript · MySQL · MongoDB · Ext JS",
            bullets: [
              {
                print: true,
                text: "Built frontend and backend for Investments & Funds dashboards (client: RNDC), including reusable component architecture.",
              },
              {
                print: true,
                text: "Developed Cloud Operations Dashboard for internal team, automating several previously manual operational workflows.",
              },
              {
                print: true,
                text: "Managed release cycles and contributed to backend API development across multiple client projects.",
              },
            ],
          },
        ],
      },
    ],
  },
  projects: {
    print: true,
    items: [
      {
        id: "s3-portal",
        print: true,
        name: "S3 Portal",
        featured: true,
        tags: "Next.js 14 · TypeScript · PostgreSQL · Prisma · AWS S3 · Docker · NextAuth · AES-256-GCM",
        github: "https://github.com/mayurG2299/s3-portal",
        dockerHub: "https://hub.docker.com/r/may99/s3-portal",
        live: null,
        highlight: "Production-grade, self-hosted S3 file management portal for teams.",
        bullets: [
          {
            print: true,
            text: "Production-grade, self-hosted S3 file management portal for teams. AES-256-GCM encryption for all stored credentials and files; zero plaintext secrets. RBAC with team-level access control, audit logs, quota management, and expiring share links. Presigned URL uploads with multipart support for large files. Multi-arch Docker builds (amd64 + arm64), deployable via docker-compose. Six-theme UI system for flexible branding.",
          },
        ],
      },
      {
        id: "identity-verification",
        print: false,
        name: "Identity Verification using Blockchain",
        featured: false,
        tags: null,
        github: null,
        dockerHub: null,
        live: null,
        highlight: "Decentralized identity verification system on blockchain.",
        bullets: [
          {
            print: true,
            text: "Decentralized identity verification system on blockchain — users register and verify credentials on-chain.",
          },
        ],
      },
      {
        id: "chatbot-admission",
        print: false,
        name: "Chatbot for College Admission Process",
        featured: false,
        tags: null,
        github: null,
        dockerHub: null,
        live: null,
        highlight: "Rule-based chatbot guiding users through admission queries.",
        bullets: [
          {
            print: true,
            text: "Rule-based chatbot guiding users through admission queries.",
          },
        ],
      },
      {
        id: "canteen-order",
        print: false,
        name: "Canteen Order System",
        featured: false,
        tags: null,
        github: null,
        dockerHub: null,
        live: null,
        highlight: "Web-based canteen ordering platform for students to pre-order meals.",
        bullets: [
          {
            print: true,
            text: "Web-based canteen ordering platform for students to pre-order meals.",
          },
        ],
      },
    ],
  },
  education: {
    print: true,
    items: [
      {
        print: true,
        degree: "B.E. in Computer Science",
        institution: "A.C. Patil College of Engineering, Mumbai",
        dates: "2016 – 2020",
        grade: "CGPA: 7.63 / 10",
      },
    ],
  },
  certifications: {
    print: true,
    items: [
      {
        print: true,
        text: "Microsoft Technology Associate (MTA) — Security Fundamentals",
      },
    ],
  },
  footer: {
    credit: "Built by Mayur Ghadi and his AI Friend.",
  },
};
