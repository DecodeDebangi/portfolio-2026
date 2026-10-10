export const portfolioConfig = {
  name: "Debangi",
  wordmark: "Debangi Choudhury.",
  title: "Senior Software Engineer",
  positioning: "Full-stack engineering, backend architecture, and AI-powered products.",
  location: "BENGALURU, INDIA",
  availability: "OPEN TO OPPORTUNITIES",
  heroHeadline: "I build software that solves real problems.",
  heroSupportingCopy:
    "From AI-powered search to scalable full-stack platforms, I turn complex problems into reliable products.",
  portraitPath: "/images/debangi-portrait.png",
  socials: {
    github: "https://github.com/DecodeDebangi",
    linkedin: "https://www.linkedin.com/in/debangic/",
    email: "mailto:debangi.tech@gmail.com",
  },
  projects: [
    {
      id: "atlas-knowledge-workspace",
      category: "01 / RAG & ENTERPRISE AI",
      title: "Atlas — AI Knowledge Workspace",
      shortDescription:
        "Full-stack SaaS workspace where teams upload documents, search internal knowledge, and ask questions with source citations.",
      tags: ["Next.js", "NestJS", "PostgreSQL", "pgvector", "Redis"],
      image: "/images/projects/client-project.jpg",
      visualType: "client-work" as const,
      caseStudy: {
        title: "Building a reliable, multi-tenant AI workspace.",
        category: "Full-stack SaaS · RAG · Enterprise AI",
        summary:
          "Demonstrates a complete AI product, from document ingestion and backend architecture to permissions, retrieval quality, and a polished UI.",
        contextAndProblem:
          "AI applications require systematic evaluations, robust permissions, and reliable background processing rather than just relying on successful API demos.",
        myRole:
          "Engineered the asynchronous ingestion pipeline (upload → extract → chunk → embed → index) and the evaluation suite for retrieval accuracy, groundedness, latency, and cost.",
        architecture:
          "Multi-tenant workspaces with RBAC. Hybrid retrieval combining keyword and semantic search, with citations. Streaming answers and conversation history.",
        keyDecisions:
          "Implemented retryable background jobs, idempotency, rate limits, and caching to ensure production-grade reliability.",
        challenges:
          "Managing document-level permissions and ensuring grounded, accurate responses via systematic evaluations.",
        outcome:
          "A robust, scalable AI workspace that prioritizes measurable quality, security, and enterprise-grade reliability.",
        stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "pgvector", "Redis", "OpenAI API"],
      },
    },
    {
      id: "findwise-commerce-discovery",
      category: "02 / AI COMMERCE",
      title: "Findwise — AI Commerce Discovery",
      shortDescription:
        "AI-driven e-commerce discovery platform featuring hybrid search, image embeddings, and real-time recommendations.",
      tags: ["Next.js", "NestJS", "Python", "Solr", "Kafka"],
      image: "/images/projects/ai-search.jpg",
      visualType: "ai-search" as const,
      caseStudy: {
        title: "Intelligent product discovery and personalization.",
        category: "AI search · Recommendations · Distributed systems",
        summary:
          "An e-commerce discovery platform where users can search by text or upload a product image, receiving highly relevant products and recommendations.",
        contextAndProblem:
          "Modern commerce requires advanced discovery. This project unifies vector search, traditional Solr, and personalization into a self-owned scalable product.",
        myRole:
          "Architected the event-driven indexing pipeline, hybrid search capabilities, and the recommendation service based on user browsing events.",
        architecture:
          "Event-driven architecture using Kafka for search analytics and user interactions. Product catalog ingestion with background indexing.",
        keyDecisions:
          "Combined image embeddings and text embeddings with hybrid search and filters. Utilized Redis caching with graceful degradation and search fallbacks.",
        challenges:
          "Balancing relevance and performance, managing asynchronous re-indexing, and building an admin dashboard to track p95 latency.",
        outcome:
          "A comprehensive discovery engine proving senior capability in search relevance, distributed event processing, and measurable data quality.",
        stack: ["Next.js", "NestJS", "Python", "Solr", "PostgreSQL", "pgvector", "Redis", "Kafka", "Docker"],
      },
    },
    {
      id: "relay-incident-response",
      category: "03 / REAL-TIME SYSTEMS",
      title: "Relay — AI Incident Response Platform",
      shortDescription:
        "Engineering operations dashboard that groups alerts, summarizes logs, and suggests investigation steps via AI agents.",
      tags: ["Next.js", "NestJS", "PostgreSQL", "Kafka", "WebSockets"],
      image: "/images/projects/commerce-scale.jpg",
      visualType: "commerce-scale" as const,
      caseStudy: {
        title: "Agentic workflows for engineering operations.",
        category: "Real-time systems · AI agents · Reliability",
        summary:
          "An operations platform that receives application alerts, deduplicates incidents, summarizes logs, and orchestrates AI-assisted investigations.",
        contextAndProblem:
          "Incident response involves sifting through logs and alerts. This system demonstrates understanding of real-time events, observability, and controlled AI actions beyond a simple request-response API.",
        myRole:
          "Built the real-time event pipeline for alerts and state transitions. Integrated an AI assistant that links suggestions to evidence with explicit tool access and human approval.",
        architecture:
          "Real-time updates via WebSockets/SSE. Event pipeline with retry handling, dead-letter queues, idempotent consumers, and replay capabilities.",
        keyDecisions:
          "Enforced operational safeguards including tool access with explicit permissions, audit trails, and dashboards for error and queue lag monitoring.",
        challenges:
          "Ensuring reliability and state consistency during high-volume alert floods, and keeping the AI agent safely constrained.",
        outcome:
          "A highly reliable incident response tool showcasing production safeguards, event-driven orchestration, and meaningful, controlled AI integration.",
        stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Kafka", "LLM API", "Docker"],
      },
    }
  ],
  experience: [
    {
      id: "logixal",
      company: "Logixal Cloud Solutions",
      role: "Senior Software Engineer",
      dates: "May 2025 – Present",
      summary: "AI-powered search, personalization, distributed commerce, and production reliability.",
      achievements: [
        "Built visual product search using image embeddings and Apache Solr across 5+ storefronts, achieving sub-150ms search latency.",
        "Developed behavioral personalization using MongoDB, real-time affinity scoring, and Redis caching, contributing to a 22% improvement in predictive bundling/personalized recommendations.",
        "Architected high-availability e-commerce microservices using Node.js, NestJS, Next.js, Kafka, and multiple payment integrations.",
        "Supported more than 10K weekly transactions with a 99.9% transaction success rate.",
        "Implemented Docker/Jenkins CI/CD and AWS/Kubernetes deployment practices supporting zero-downtime updates.",
        "Enhanced average page load speed by 35% across high-traffic stores through efficient data fetching architecture, SEO improvements, and integrated backend data integration pipelines processing 100K+ daily events.",
        "Integrated Strapi CMS with Storybook component libraries across 10+ modules, streamlining UI delivery timelines by 25% for rapid front-end component deployment."
      ]
    },
    {
      id: "avrl-tdm",
      company: "AVRL",
      role: "Technical Delivery Manager",
      dates: "January 2025 – April 2025",
      summary: "Led delivery across three concurrent client accounts.",
      achievements: [
        "Reduced milestone overruns by 25%.",
        "Directed end-to-end technical delivery across 3 concurrent client accounts, translating complex business requirements into structured engineering milestones.",
        "Coordinated cross-functional engineering workflows for a team of 8+ engineers, mitigating delivery bottlenecks and aligning technical execution with client expectations under tight weekly sprint timelines."
      ]
    },
    {
      id: "avrl-sde1",
      company: "AVRL",
      role: "Software Development Engineer I",
      dates: "January 2022 – December 2024",
      summary: "Built full-stack logistics platforms, real-time APIs, and secure data-driven applications.",
      achievements: [
        "Developed React/Next.js and Node.js platforms for logistics and bidding workflows.",
        "Built REST/WebSocket APIs supporting 5,000+ messages per minute and reduced latency by 35%.",
        "Optimized MongoDB/MySQL schemas across 15+ tables, improving query performance by 35%.",
        "Implemented authentication and authorization using JWT/OAuth.",
        "Contributed to CI/CD and application delivery.",
        "Architected 8+ full-stack applications specializing in backend systems for logistic bidding bot automation and management platforms serving 500+ active daily users.",
        "Developed 200+ API-driven automation solutions, eliminating over 500 hours of manual work monthly across supply chain and logistics operations.",
        "Reduced unauthorized access attempts by 40% across internal systems via enterprise authentication.",
        "Deployed containerized CI/CD workflows using Docker and GitHub Actions, halving release cycles from 2 weeks to 1 week."
      ]
    },
    {
      id: "cognizant",
      company: "Cognizant",
      role: "Programmer Analyst",
      dates: "May 2021 – December 2021",
      summary: "Built data-processing pipelines with Azure Databricks.",
      achievements: [
        "Processed 20GB+ of data daily and reduced batch processing time by 30%.",
        "Collaborated with data engineering teams to re-architect ETL workflows, improving pipeline throughput and fault tolerance by 25%.",
        "Coordinated Agile sprint planning sessions for a team of 12, increasing delivery predictability by 15% and reducing sprint backlog carryover."
      ]
    }
  ],
  about: {
    headline: "Engineer by profession. Curious by nature.",
    copy: "I enjoy turning complex ideas into software people can actually use. My work spans full-stack development, backend architecture, and AI integrations.\n\nOutside of work, I'm usually lifting, travelling somewhere new, or learning something completely unrelated to my job.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
    ],
    interests: [
      { 
        label: "Build.", 
        description: "Constantly working on side projects and exploring new tools to keep my engineering skills sharp.",
        icon: "code" 
      },
      { 
        label: "Train.", 
        description: "Lifting weights keeps me disciplined and provides a necessary physical and mental reset.",
        icon: "dumbbell" 
      },
      { 
        label: "Explore.", 
        description: "I love traveling to new cities, experiencing different cultures, and expanding my perspective.",
        icon: "plane" 
      }
    ]
  },
  skills: [
    {
      title: "Frontend",
      tools: ["JavaScript", "TypeScript", "React", "Next.js", "Redux"],
      icon: "layout"
    },
    {
      title: "Backend and APIs",
      tools: ["Node.js", "NestJS", "Express", "REST APIs", "WebSockets", "Distributed systems", "Event-driven architecture"],
      icon: "server"
    },
    {
      title: "AI and search",
      tools: ["Python", "AI/ML integrations", "LangChain", "Retrieval-Augmented Generation (RAG)", "Embeddings", "Vector search", "Agentic AI"],
      icon: "brain"
    },
    {
      title: "Data and messaging",
      tools: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Apache Solr", "Kafka", "RabbitMQ"],
      icon: "database"
    },
    {
      title: "Infrastructure and delivery",
      tools: ["AWS", "Google Cloud Platform", "Docker", "Kubernetes", "Jenkins", "CI/CD"],
      icon: "cloud"
    }
  ],
  process: [
    {
      step: 1,
      title: "Understand",
      description: "Define the problem, users, scope, and success criteria.",
      icon: "message"
    },
    {
      step: 2,
      title: "Architect",
      description: "Choose the right architecture, tools, and implementation plan.",
      icon: "layers"
    },
    {
      step: 3,
      title: "Build",
      description: "Develop, test, review, and iterate with clear communication.",
      icon: "code"
    },
    {
      step: 4,
      title: "Ship",
      description: "Deploy, monitor, document, and hand over confidently.",
      icon: "rocket"
    }
  ]
};
