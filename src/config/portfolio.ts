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
        title: "Atlas — AI Knowledge Workspace",
        category: "Full-Stack Engineering · Retrieval-Augmented Generation · Enterprise AI",
        stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "pgvector", "Redis", "background workers", "LLM APIs", "Docker"],
        sections: [
          {
            title: "Overview",
            content: [
              "Making organizational knowledge searchable, useful, and trustworthy.",
              "Organizations accumulate valuable information across technical documentation, internal guides, product specifications, policies, and reports. However, finding the right information across a growing collection of documents can be time-consuming.",
              "Traditional keyword search can struggle when users don't know the exact terms used in a document. Meanwhile, a generic AI chatbot may generate plausible answers without providing sufficient evidence or respecting the permissions attached to the underlying information.",
              "Atlas is an AI-powered knowledge workspace designed to address these problems. It allows teams to upload documents, search their content using natural language, and ask questions that are answered using relevant source material.",
              "The objective is to combine the usability of conversational AI with the reliability of a well-engineered information retrieval system."
            ]
          },
          {
            title: "The problem",
            content: [
              "A useful enterprise knowledge assistant needs to solve more than question answering.",
              "• Fragmented knowledge: Relevant information is distributed across multiple documents and formats.",
              "• Poor discoverability: Users may not know the keywords needed to find a specific answer.",
              "• Untrustworthy answers: AI-generated responses can contain unsupported statements.",
              "• Access-control risks: A user must never retrieve information they aren't authorized to access.",
              "• Slow document processing: Large documents can make synchronous upload-and-index workflows unreliable.",
              "• Limited observability: Without retrieval and quality metrics, it's difficult to understand why an answer was poor.",
              "Atlas is designed around these challenges rather than treating the LLM as the entire product."
            ]
          },
          {
            title: "Product experience",
            content: [
              "The application provides a workspace where users can:",
              "• Create an organization and invite team members.",
              "• Upload documents and monitor their processing status.",
              "• Search documents using keywords or natural-language queries.",
              "• Ask questions and receive answers with citations linking to relevant source passages.",
              "• Open cited documents and inspect the evidence behind an answer.",
              "• Review previous conversations and provide feedback on answer quality.",
              "The interface is designed to make the system's reasoning traceable through retrieved evidence, rather than presenting an answer as an unquestionable black box."
            ]
          },
          {
            title: "Architecture and system design",
            content: [
              "The proposed architecture separates the user-facing application, business logic, document processing, retrieval, and answer generation.",
              "```mermaid\nflowchart TD\n    A[User / UI] --> B[Next.js App]\n    B --> C[NestJS API]\n    subgraph Ingestion\n    D[Object Storage] --> E[Job Queue]\n    E --> F[Text Extraction]\n    F --> G[Chunking & Embeddings]\n    G --> H[(pgvector)]\n    end\n    subgraph Retrieval\n    I[Semantic Search] --> H\n    I --> J[Relevance Filter]\n    J --> K[LLM Provider]\n    K --> L[Cited Response]\n    end\n    C -- \"Upload\" --> D\n    C -- \"Query\" --> I\n```",
              "High-level flow: User → Next.js application → NestJS API → Retrieval and orchestration → LLM provider → Cited response.",
              "Document ingestion runs asynchronously: Document upload → Object storage → Job queue → Text extraction → Chunking → Embedding generation → PostgreSQL/pgvector indexing.",
              "1. Frontend and API layer: The Next.js application handles the workspace experience, document management, search interface, conversation history, and streaming responses. NestJS provides a structured backend for authentication, authorization, document metadata, workspace management, search orchestration, and AI workflows.",
              "2. Asynchronous document ingestion: Document ingestion is handled by background workers instead of a long-running synchronous request. When a user uploads a document, the API stores its metadata and schedules a processing job. Workers extract text, split it into manageable chunks, generate embeddings, and write the indexed records to the database.",
              "3. Retrieval-augmented generation: When a user asks a question, the retrieval pipeline identifies relevant document passages and provides them as context to the language model. The pipeline includes query validation, semantic retrieval using vector similarity, relevance filtering, and answer generation constrained by the retrieved evidence.",
              "4. Data model and tenancy: Every document and chunk is associated with its organization and relevant access-control metadata. Authorization is enforced server-side during retrieval, not merely through frontend visibility.",
              "5. Streaming and caching: Streaming responses improve the perceived responsiveness of the application. Redis can be used for short-lived caching, rate limiting, and coordination where appropriate."
            ]
          },
          {
            title: "Key engineering decisions",
            content: [
              "• Why asynchronous ingestion? Document extraction and embedding generation may be slow or fail independently of the upload request. A queue decouples upload responsiveness from processing time and makes retries and monitoring easier.",
              "• Why combine semantic and keyword retrieval? Semantic retrieval can identify conceptually related passages, while keyword search can be valuable for exact names, identifiers, and technical terms.",
              "• Why store citations explicitly? Citations make answers verifiable. Maintaining chunk and document references throughout the pipeline allows the UI to link generated claims to source material.",
              "• Why isolate the LLM provider? A provider abstraction makes it easier to compare models, change providers, handle provider-specific failures, and track costs without rewriting the application's core business logic."
            ]
          },
          {
            title: "Security and reliability",
            content: [
              "Security is a core system requirement, not a later enhancement.",
              "• Workspace isolation and server-side role-based access control.",
              "• File-type validation, size limits, and secure document storage.",
              "• Protection against prompt injection in uploaded documents and retrieved content.",
              "• Secrets management and restricted permissions for external services.",
              "• Rate limits, request quotas, timeouts, retries, and graceful handling of provider outages.",
              "Retrieved documents must be treated as untrusted input. Instructions found inside a document must not be allowed to override system policies or grant the model unauthorized tool access."
            ]
          },
          {
            title: "How success will be measured",
            content: [
              "The project will use a repeatable evaluation dataset containing representative questions and expected supporting passages.",
              "Metrics to collect include:",
              "• Retrieval precision and recall at selected ranking cutoffs.",
              "• Citation correctness and answer groundedness.",
              "• Answer quality on questions with insufficient evidence.",
              "• p50 and p95 latency for retrieval and complete responses.",
              "• Document ingestion success rate and processing duration.",
              "• Token usage and cost per answered question.",
              "• Authorization test coverage and cross-tenant isolation failures."
            ]
          },
          {
            title: "What this project demonstrates",
            content: [
              "Atlas demonstrates my approach to building AI applications as complete software systems. The challenge is not simply generating text; it is coordinating data ingestion, retrieval, authorization, background processing, user experience, and evaluation in a way that makes the product dependable.",
              "The project also explores how established backend engineering principles—clear service boundaries, idempotency, observability, and explicit failure handling—apply to AI-enabled products."
            ]
          }
        ]
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
        title: "Findwise — AI-Powered Commerce Discovery",
        category: "AI Search · Personalization · E-Commerce · Event-Driven Architecture",
        stack: ["Next.js", "TypeScript", "NestJS", "Python", "Apache Solr", "PostgreSQL/pgvector", "Redis", "Kafka", "Docker"],
        sections: [
          {
            title: "Overview",
            content: [
              "Helping customers discover products by intent, not just keywords.",
              "Product discovery becomes increasingly difficult as a commerce catalog grows. Customers may know what a product looks like without knowing its name, or they may describe what they need using language that doesn't match the catalog's product titles.",
              "Traditional search often depends heavily on exact terms, while recommendation systems can struggle to respond quickly to changing user interests.",
              "Findwise is an AI-powered product discovery platform designed to make commerce search more intuitive. It combines text search, image-based search, product filtering, and behavioral personalization in one application.",
              "The goal is to help customers find relevant products through multiple discovery paths while giving operators visibility into search quality and system performance."
            ]
          },
          {
            title: "The problem",
            content: [
              "The application explores four related challenges.",
              "• Keyword mismatch: Customers search using natural descriptions that differ from catalog terminology.",
              "• Visual discovery: Customers want products resembling a reference image but may not know the correct product category or name.",
              "• Generic recommendations: Recommendations can be less useful when they ignore current session intent and product context.",
              "• Operational complexity: Search indexes, behavioral events, product data, and cached results must remain consistent as the catalog changes.",
              "Findwise treats search relevance, data freshness, and system reliability as interconnected engineering concerns."
            ]
          },
          {
            title: "Product experience",
            content: [
              "The platform supports several discovery workflows:",
              "• Customers search by product name, category, or natural-language description.",
              "• Customers upload a reference image and retrieve visually similar products.",
              "• Customers refine results using price, category, availability, and other catalog filters.",
              "• The application provides related products or personalized recommendations.",
              "• Operators inspect catalog indexing status and search performance.",
              "• Search analytics help identify unsuccessful queries and opportunities to improve relevance.",
              "The initial implementation focuses on a well-defined sample catalog rather than attempting to reproduce an entire commercial marketplace."
            ]
          },
          {
            title: "Architecture and system design",
            content: [
              "Findwise separates catalog ingestion, search, personalization, and the customer-facing experience.",
              "```mermaid\nflowchart TD\n    subgraph Ingestion\n    A[Product Catalog] --> B[Validation & Normalization]\n    B --> C[Kafka Topic]\n    C --> D[Indexing Workers]\n    D --> E[(Solr Search Index)]\n    end\n    subgraph Retrieval\n    F[User Query / Image] --> G[Hybrid Search API]\n    G --> H[Semantic / Image Embedding]\n    H --> E\n    G --> I[Keyword Retrieval]\n    I --> E\n    end\n    subgraph Personalization\n    J[User Interactions] --> K[Kafka Event Bus]\n    K --> L[Affinity Scoring]\n    L --> M[(Redis Cache)]\n    M -. \"Ranks Results\" .-> G\n    end\n```",
              "Catalog ingestion: Product source → Validation and normalization → Event publication → Indexing workers → Search index.",
              "Text and image search: Search request → Query processing → Keyword and semantic retrieval → Filtering and ranking → Product results.",
              "Personalization: Customer interactions → Event pipeline → Behavioral aggregates and affinity scores → Recommendation service → Cached recommendations.",
              "1. Catalog ingestion and indexing: The ingestion service validates product records and normalizes attributes. Product changes are published as events. Indexing workers consume those events and update the search index asynchronously. This avoids coupling catalog writes directly to the time required to refresh every search representation.",
              "2. Text and semantic search: Text search handles product names, exact phrases, attributes, and filters. Semantic search represents product descriptions and queries as embeddings so that conceptually related items can be discovered even when they don't share identical wording. A hybrid retrieval pipeline combines the strengths of both approaches.",
              "3. Visual product search: For image search, the application accepts a user-provided reference image and passes it through a dedicated image-embedding pipeline. The search service retrieves candidate products with compatible image embeddings, applies catalog filters, and returns ranked results.",
              "4. Behavioral personalization: The system records relevant interactions (views, searches, clicks, saved items). An event-processing component aggregates these interactions into behavioral signals. A recommendation service uses those signals alongside product metadata to generate relevant suggestions.",
              "5. Caching and event-driven consistency: Redis caches popular search results and recommendations. Catalog changes must invalidate or refresh affected cached data. Kafka distributes product and behavioral events to downstream consumers, while idempotent processing prevents duplicate events from inflating behavioral counts."
            ]
          },
          {
            title: "Key engineering decisions",
            content: [
              "• Why support both keyword and semantic search? Keyword search is effective for exact attributes and identifiers. Semantic search helps with intent and meaning. Combining them allows the system to support a wider range of queries.",
              "• Why process catalog updates asynchronously? Separating source writes from indexing reduces coupling and allows indexing to scale independently.",
              "• Why use event-driven personalization? Events allow behavioral processing to evolve independently of the main customer request.",
              "• Why start with a simple ranking baseline? A measurable baseline makes improvements attributable. It is more useful to demonstrate that a new ranking strategy improves relevance on a defined evaluation set than to introduce a complex model without evidence."
            ]
          },
          {
            title: "Security and reliability",
            content: [
              "• Validate uploaded images and impose size and processing limits.",
              "• Enforce authorization on protected catalog and administrative APIs.",
              "• Apply rate limits to expensive search and embedding operations.",
              "• Handle failed events with bounded retries and dead-letter processing.",
              "• Monitor indexing lag and reconcile index contents with the source catalog.",
              "• Define retention and deletion policies for user interaction data.",
              "• Use safe fallbacks if personalization or the embedding service becomes unavailable.",
              "The core text-search experience should remain usable when an optional AI or recommendation component is temporarily unavailable."
            ]
          },
          {
            title: "How success will be measured",
            content: [
              "The evaluation plan compares baseline keyword search against semantic and hybrid retrieval.",
              "Metrics to collect include:",
              "• Precision@K, Recall@K, and ranking quality such as NDCG@K.",
              "• Image retrieval quality using a manually reviewed query-image dataset.",
              "• Search p50 and p95 latency under a documented load.",
              "• Catalog indexing lag and recovery time after failed jobs.",
              "• Cache hit rate and database/query load.",
              "• Event processing throughput, duplicate handling, and error rate."
            ]
          },
          {
            title: "What this project demonstrates",
            content: [
              "Findwise brings together AI retrieval, traditional search infrastructure, real-time behavioral signals, and backend reliability in a single product.",
              "It demonstrates how I approach AI integrations as components of a larger system: the model is only one part of the solution. Catalog quality, ranking, event processing, caching, data consistency, and observability all affect the end-user experience."
            ]
          }
        ]
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
        title: "Relay — AI-Assisted Incident Response",
        category: "Backend Engineering · Distributed Systems · AI-Assisted Operations",
        stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Redis", "Kafka", "LLM APIs", "Docker", "OpenTelemetry"],
        sections: [
          {
            title: "Overview",
            content: [
              "Turning noisy application alerts into actionable investigations.",
              "Modern applications produce a constant stream of logs, alerts, exceptions, and operational events. During an incident, engineers must identify related failures, understand the likely scope, find useful evidence, and coordinate a response.",
              "An AI assistant can summarize large volumes of operational information, but allowing an AI model to execute arbitrary production actions introduces significant risk.",
              "Relay is an incident-response workspace designed to help engineers understand and investigate incidents faster. It ingests application alerts, groups related events, maintains a shared incident timeline, and uses AI to summarize evidence and suggest investigation steps.",
              "The system is designed around a clear boundary: AI helps engineers reason about an incident, while consequential actions remain subject to explicit authorization and human approval."
            ]
          },
          {
            title: "The problem",
            content: [
              "Relay focuses on several operational challenges.",
              "• Alert fatigue: Repeated or related events can obscure the underlying incident.",
              "• Fragmented context: Engineers often need to correlate events across services and time windows.",
              "• Slow investigation: Understanding a failure may require manually reviewing logs and prior incident notes.",
              "• Unreliable AI suggestions: A summary or suggested fix can be misleading if it lacks evidence.",
              "• Dangerous automation: An AI system should not receive unrestricted access to production infrastructure.",
              "The product aims to improve the investigation workflow without replacing engineering judgment."
            ]
          },
          {
            title: "Product experience",
            content: [
              "The application provides a central incident workspace where engineers can:",
              "• Receive alerts through an authenticated webhook or event stream.",
              "• View incident severity, affected services, status, and event timeline.",
              "• Group duplicate or related alerts into a single incident.",
              "• Inspect relevant logs and supporting evidence.",
              "• Generate an AI-assisted incident summary and a list of possible investigation steps.",
              "• Assign ownership, add notes, and update incident status.",
              "• Record approved actions and preserve an audit trail.",
              "The AI assistant is designed to distinguish observed evidence from hypotheses. It cites the relevant logs used to support a conclusion and clearly communicates uncertainty."
            ]
          },
          {
            title: "Architecture and system design",
            content: [
              "Relay separates event ingestion, incident management, real-time delivery, AI analysis, and action execution.",
              "```mermaid\nflowchart TD\n    subgraph Event Processing\n    A[Monitoring Alerts] --> B[Authenticated Webhook]\n    B --> C[Kafka Queue]\n    C --> D[Deduplication & Correlation]\n    D --> E[(Incident DB)]\n    end\n    subgraph Real-time UI\n    E -- \"State Changes\" --> F[WebSocket Service]\n    F --> G[Live Incident Dashboard]\n    end\n    subgraph AI Investigation\n    H[User Requests Summary] --> I[Redaction & Policy Check]\n    I --> J[Log Retrieval]\n    J --> K[LLM Provider]\n    K --> L[Structured AI Summary]\n    L --> G\n    end\n```",
              "Event processing: Monitoring source → Authenticated API → Validation → Queue → Deduplication → Incident state.",
              "AI investigation: Incident context → Evidence selection → Redaction/Policy checks → LLM analysis → Structured summary → Human review.",
              "Real-time UI: Incident state changes → Event publication → WebSocket/SSE delivery → Live incident dashboard.",
              "1. Event ingestion and processing: The ingestion API accepts structured alerts, assigns a stable identifier, and publishes them to a queue. Consumers normalize attributes, detect duplicates, and correlate related events based on rules like service, fingerprint, and time window.",
              "2. Incident lifecycle and data model: Incident status transitions are validated by the backend. A relational database stores incident records, relationships, state transitions, and audit history. Event payloads retain references to log evidence without bloating the primary database.",
              "3. Real-time incident dashboard: The frontend receives updates via WebSockets or Server-Sent Events. The backend remains the source of truth, allowing clients to reload state after disconnecting. The system handles duplicate notifications and out-of-order events gracefully.",
              "4. AI-assisted investigation: When an engineer requests an AI summary, the system gathers relevant incident data (alerts, logs, service metadata). Sensitive values are redacted. The LLM generates a structured response (summary, symptoms, hypotheses, steps, cited evidence).",
              "5. Controlled tools and human approval: Read-only tools allow the AI to retrieve related logs or deployment records. Any action that changes a production system requires explicit human approval, authorization checks, and an auditable record of execution."
            ]
          },
          {
            title: "Key engineering decisions",
            content: [
              "• Why use an event-driven pipeline? Alert ingestion should not wait for every downstream operation to finish. Queue-based processing absorbs bursts and allows independent scaling.",
              "• Why separate AI analysis from incident state? Generated summaries can be revised or corrected. Keeping them separate preserves the integrity of the incident timeline and makes AI output easier to audit.",
              "• Why require approval for consequential actions? Incident response involves sensitive systems. Human approval, least-privilege tools, and server-side authorization reduce the risk of an incorrect AI suggestion causing further damage.",
              "• Why keep the first version read-only? Read-only investigation is easier to validate and safer to demonstrate."
            ]
          },
          {
            title: "Security and reliability",
            content: [
              "• Authenticate ingestion sources and validate payloads.",
              "• Apply role-based permissions to incidents and operational tools.",
              "• Redact secrets and sensitive log fields before model processing.",
              "• Treat log contents as untrusted data that may contain prompt injection.",
              "• Require human approval for consequential actions with immutable audit records.",
              "• Use idempotent consumers, bounded retries, and dead-letter queues.",
              "• Apply timeouts, quotas, and graceful fallbacks for AI-provider failures.",
              "If the AI provider is unavailable, engineers should still be able to view alerts, inspect evidence, assign incidents, and manage their lifecycle."
            ]
          },
          {
            title: "How success will be measured",
            content: [
              "The evaluation uses a repeatable collection of simulated incidents with known symptoms and expected outcomes.",
              "Metrics to collect include:",
              "• Event ingestion success rate and processing latency.",
              "• Duplicate-alert grouping accuracy.",
              "• Queue lag and recovery after worker failure.",
              "• AI summary factuality against the provided incident evidence.",
              "• Accuracy of evidence references and unsupported-claim rate.",
              "• Real-time update latency and reconnect recovery.",
              "• Authorization failures, audit completeness, and successful policy-enforcement tests."
            ]
          },
          {
            title: "What this project demonstrates",
            content: [
              "Relay demonstrates how backend architecture, event-driven processing, real-time interfaces, observability, and AI orchestration can work together in an operationally sensitive product.",
              "Its central engineering challenge is balancing the usefulness of AI-generated insights with the reliability, traceability, and access controls expected of an incident-response system.",
              "The project reflects my approach to integrating AI responsibly: use it where it improves the workflow, preserve evidence and human judgment, and design the surrounding system to remain useful when the model fails."
            ]
          }
        ]
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
