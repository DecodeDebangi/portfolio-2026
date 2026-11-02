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
      id: "askdocs",
      category: "RAG & AI SUPPORT",
      title: "AskDocs: AI Support Assistant",
      shortDescription:
        "Support chatbot that answers from a help center, links to the exact section it used, and hands off to a person instead of guessing. 96% answer accuracy on a hand-written test set, with all 10 questions it shouldn't answer handed off.",
      tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "RAG"],
      image: "/images/projects/askdocs-demo.jpg",
      video: {
        webm: "/images/projects/askdocs-demo.webm",
        mp4: "/images/projects/askdocs-demo.mp4",
      },
      liveUrl: "https://askdocs-e8kq.onrender.com",
      liveNote: "Free hosting: the demo can take about a minute to wake up.",
      repoUrl: "https://github.com/DecodeDebangi/askdocs",
      visualType: "ai-search" as const,
      caseStudy: {
        title: "AskDocs: AI Support Assistant",
        category: "Retrieval-Augmented Generation · AI Support · LLM Evaluation",
        stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "bge-small embeddings", "Gemini", "JavaScript widget", "Docker", "Render", "Neon"],
        sections: [
          {
            title: "Overview",
            content: [
              "A support chatbot that would rather hand off than make something up.",
              "The risk with a support chatbot is a confident wrong answer about a refund or a policy. AskDocs answers only from a company's own help center, links each answer to the section it came from, and passes the question to a person when the sources don't cover it.",
              "The live demo is the support assistant for Fernhollow Outdoor Co., a fictional outdoor-gear store with a 37-page help center. A side panel shows which sections were found, which were cited, and why the bot answered or handed off.",
              "The same engine was first built and evaluated on 629 pages of real technical documentation, the Supabase guides.",
            ]
          },
          {
            title: "The problem",
            content: [
              "Generating an answer is the easy part. Knowing when not to answer is harder.",
              "• Exact names and loose wording: keyword search finds names like supabase.auth.signUp, while vector search finds questions phrased differently from the docs. A support bot needs both.",
              "• Unverifiable answers: without a link to the exact section, a customer can't check what the bot said.",
              "• Questions a bot shouldn't handle: chargebacks, double charges and legal threats need a person, even when a related page exists.",
              "• Over-generalizing: asked about refunds, an early version said “we do not provide refunds” when the source only said unused credits aren't refunded.",
            ]
          },
          {
            title: "Product experience",
            content: [
              "• Answers stream in with numbered citations that link to the exact help-center section.",
              "• Test questions in the demo cover exact facts, policy edge cases, applying a rule to a specific case, and questions the bot should refuse.",
              "• A “How it answered” panel shows the sections found, the ones cited, and the reason for answering or handing off.",
              "• Disputes and legal matters go straight to a person without an LLM call.",
              "• One script tag adds the chat to any website. The widget is a single dependency-free file in a Shadow DOM, so the host page's CSS can't affect it.",
            ]
          },
          {
            title: "Architecture and system design",
            content: [
              "One FastAPI service, with Postgres holding both the vector and the full-text index.",
              "```mermaid\nflowchart TD\n    subgraph Indexing\n    A[\"Help center: sitemap crawl or Markdown import\"] --> B[\"Chunk by heading\"]\n    B --> C[\"Embed locally: bge-small\"]\n    C --> D[(\"Postgres: pgvector + full-text\")]\n    end\n    subgraph Answering\n    Q[\"Customer question\"] --> G{\"Dispute or legal matter?\"}\n    G -- Yes --> X[\"Hand off to a person\"]\n    G -- No --> H[\"Hybrid search: vector + keyword, fused with RRF\"]\n    H --> L[\"LLM answers from numbered sources\"]\n    L -- \"NO_ANSWER\" --> X\n    L --> O[\"Streamed answer with citations\"]\n    end\n    D -.-> H\n```",
              "• Ingestion: reads a sitemap or a folder of Markdown files and splits each page along its headings, so every chunk belongs to one section and citations can link straight to it. Re-ingesting only re-embeds pages whose content changed.",
              "• Search: vector and keyword search run together in Postgres and are merged with Reciprocal Rank Fusion. An optional cross-encoder re-scores the top 20 when the host has the CPU for it.",
              "• Answering: the LLM answers from numbered sources, or replies NO_ANSWER, which is never shown to the customer and triggers a handoff.",
              "• Logging: every answer is stored with its reason (answered, escalated, no sources, no answer or error), so unanswered questions can be reviewed.",
              "• LLM: any OpenAI-compatible API, chosen with three environment variables. The demo uses gemini-3.5-flash-lite.",
            ]
          },
          {
            title: "Key engineering decisions",
            content: [
              "• Why check for disputes before searching? A related page shouldn't tempt the bot into answering a chargeback. Matching these first means they always reach a person, and general policy questions such as how refunds work are still answered.",
              "• Why chunk by heading? It keeps each chunk to one section, so a citation can open the exact part of the page. Code blocks are never cut in half.",
              "• Why Postgres for everything? pgvector and full-text search in one database means one store to run and no syncing between systems.",
              "• Why drop the reranker in production? The free host has a tenth of a CPU. Without the reranker the right page is ranked first less often (52% vs 71% on the docs set), but the LLM reads 8 sources and accuracy falls by only one question.",
              "• Fitting the free plan: at 0.1 CPU, startup took 3 minutes and one search took over 4. Skipping the reranker and running the embedding model on one thread brought search to about 1 second and peak memory to about 250 MB.",
            ]
          },
          {
            title: "Results",
            content: [
              "Measured on hand-written question sets, with each answerable question labelled with the pages that answer it and the facts a correct answer must contain. All figures use the hosted demo's setup, without the reranker.",
              "Store help center, 64 questions:",
              "• 96% answer accuracy (52 of 54), and a correct page cited for 98% (53 of 54).",
              "• All 10 questions it should not answer were handed off, including a prompt injection, a chargeback and a legal threat.",
              "• 1 of 54 answerable questions was wrongly handed off.",
              "• Response time: 1.9 s median and 4.3 s p95.",
              "Supabase documentation, 53 questions:",
              "• 93% answer accuracy (39 of 42), with all 11 questions it should refuse handed off.",
              "• Response time: 2.0 s median and 4.8 s p95.",
              "Testing also changed the product. The store set started at 91%, and most misses were answers where the source said no (“fuel can't ship to Alaska”) and the model treated that as no answer. Two labels were also corrected because they rejected correct answers. On the docs set, the evaluation found a bug that hand-testing hadn't: context assembly stopped at the first short chunk and dropped every source after it.",
            ]
          },
          {
            title: "Limits and next steps",
            content: [
              "• These question sets also guided the prompt changes, so the scores aren't from a held-out set.",
              "• “Do you price match REI?” is still handed off, even though the help center says it doesn't price-match other retailers.",
              "• Handoffs are logged, but nothing notifies a support team yet.",
              "• Next: handoff notifications by Slack or email, and an admin page for reviewing logged answers.",
            ]
          },
          {
            title: "What this project demonstrates",
            content: [
              "AskDocs shows how I approach an LLM product: decide what it must never do, measure that alongside accuracy, and let the failures decide what to fix next.",
              "It also shows a full delivery: ingestion, search, an embeddable widget, an evaluation suite and a working public deployment within tight hosting limits.",
            ]
          },
        ]
      },
    },
    {
      id: "hybrid-product-search",
      category: "AI SEARCH",
      title: "Hybrid Product Search",
      shortDescription:
        "Search over 44k fashion products that understands intent: BM25 keyword search and CLIP image embeddings in Solr, fused with Reciprocal Rank Fusion. 52% better ranking than keyword-only search on a labelled test set.",
      tags: ["Next.js", "NestJS", "Python", "CLIP", "Solr"],
      image: "/images/projects/hybrid-search-demo.jpg",
      video: {
        webm: "/images/projects/hybrid-search-demo.webm",
        mp4: "/images/projects/hybrid-search-demo.mp4",
      },
      repoUrl: "https://github.com/DecodeDebangi/hybrid-product-search",
      visualType: "ai-search" as const,
      caseStudy: {
        title: "Hybrid Product Search",
        category: "Information Retrieval · Multimodal AI · Search Evaluation",
        stack: ["Next.js", "TypeScript", "NestJS", "Python", "FastAPI", "CLIP", "Apache Solr", "Redis", "Docker"],
        sections: [
          {
            title: "Overview",
            content: [
              "Search that understands what shoppers mean, not just the words they type.",
              "Keyword search is precise but literal. Search a fashion catalog for “something warm for winter” and it returns nothing, because no product title contains those words, even though the catalog is full of beanies, scarves and stoles.",
              "Hybrid Product Search combines classic keyword ranking with AI image understanding over a real catalog of 44,072 fashion products. Shoppers can search by text, upload a photo, or browse visually similar items, and a compare mode shows keyword and hybrid results side by side.",
              "Every relevance claim is backed by an offline evaluation: labelled query sets, a standard ranking metric, blind human grading, and a held-out set committed before any experiment ran.",
            ]
          },
          {
            title: "The problem",
            content: [
              "Shoppers describe intent; catalogs store attributes. “Proline Men Black Patterned Beanie” is a perfect answer to “something warm for winter”, but shares no words with it.",
              "• Vocabulary gap: for descriptive queries such as “something to carry my laptop in”, keyword search returned no results at all for 13 of 17 queries.",
              "• Synonyms and wrong senses: “trainers” and “billfold” rarely appear in titles, and “denims” matches a Denim-brand deodorant.",
              "• Precision still matters: for exact queries like “navy blue shirt”, keyword search is hard to beat, so replacing it with vector search alone makes those queries worse.",
            ]
          },
          {
            title: "Product experience",
            content: [
              "• Four ranking modes: Lexical (BM25), Semantic (CLIP), Hybrid, and Compare, which shows keyword and hybrid results side by side.",
              "• Search by photo: upload or drag in an image to find visually similar products.",
              "• “More like this” on any result, using that product's image embedding.",
              "• Gender, type, colour and usage filters, applied to both retrievers before ranking.",
              "• Explainable results: each card shows its rank in each retriever, and the detected product type is shown for the query.",
              "• A live latency panel with p50 and p95 per search mode.",
            ]
          },
          {
            title: "Architecture and system design",
            content: [
              "Five services, run together with Docker Compose.",
              "```mermaid\nflowchart TD\n    subgraph Indexing\n    A[\"Fashion catalog: 44,072 products\"] --> B[\"CLIP image encoder\"]\n    B --> S[(\"Apache Solr: BM25 text index + HNSW vector index\")]\n    end\n    subgraph Search\n    Q[\"Text query or photo\"] --> U[\"Query understanding\"]\n    U --> L[\"BM25 keyword retrieval, top 100\"]\n    Q --> E[\"CLIP query encoder\"]\n    E -.-> R[(\"Redis embedding cache\")]\n    E --> V[\"kNN vector retrieval, top 100\"]\n    L --> F[\"Reciprocal Rank Fusion\"]\n    V --> F\n    F --> O[\"Ranked results\"]\n    end\n    S -.-> L\n    S -.-> V\n```",
              "• Web UI (Next.js, React): search, filters, compare view and image upload.",
              "• Search API (NestJS, TypeScript): query understanding, parallel keyword and vector retrieval, fusion, and latency metrics.",
              "• Embedding service (Python, FastAPI, open_clip): CLIP ViT-B/32 turns query text and photos into 512-dimensional vectors in the same space as the product images.",
              "• Apache Solr: one engine holds both the BM25 text index and an HNSW vector index, with the same filters applied to both.",
              "• Redis: caches query embeddings for 24 hours. Search keeps working if it is unavailable.",
              "How a hybrid query works: 1. The API detects any product type the query names. 2. BM25 and CLIP kNN retrieval each return 100 candidates, in parallel. 3. The two lists are merged with Reciprocal Rank Fusion. 4. The top results are returned with each retriever's rank attached.",
            ]
          },
          {
            title: "Key engineering decisions",
            content: [
              "• Why Reciprocal Rank Fusion? BM25 scores and cosine similarities sit on different scales. RRF combines ranks only (score = Σ 1 / (60 + rank)), so nothing needs normalising and no weights need tuning.",
              "• Why one engine for text and vectors? Solr runs BM25 and HNSW kNN together: one index, one set of filters, and no consistency problem between two stores.",
              "• Why embed images rather than titles? Titles in this catalog are short and formulaic and already covered by BM25; the images carry the style and occasion signal.",
              "• Why fetch 100 vector candidates? HNSW is approximate. Fetching 100 and trimming gave noticeably better recall than asking for only the results shown.",
              "• Query understanding: “black formal watch” returned five shoes, because “black formal” alone matched 1,885 products. The API now detects the product type a query names, using a vocabulary built from the catalog, and limits keyword matches to it. Vector search is left alone, so a wrong detection can't remove the right products.",
            ]
          },
          {
            title: "Results",
            content: [
              "Measured with nDCG@10 on 50 labelled queries. Relevance comes from catalog attributes, so the ideal ranking is counted exactly rather than estimated.",
              "• Hybrid search scores 0.828 against 0.543 for keyword-only search, a 52% improvement, and beats or ties it on 46 of 50 queries.",
              "• Descriptive queries improve from 0.158 to 0.704, while exact keyword queries keep their precision (0.943 vs 0.930).",
              "• Query understanding adds 10% nDCG@10 on 40 generated colour + usage + product-type queries, with no regressions on the other query sets.",
              "• Human validation: I graded 50 results blind, without seeing the search mode or the automatic grade. Agreement with the automatic labels was 82% on the first pass and 86% (Cohen's κ 0.46) after re-checking four likely mis-clicks. In most remaining disagreements, the automatic grader was the stricter one.",
              "• Latency: 13 ms median and 24 ms p95 for hybrid search on a laptop, with keyword and vector retrieval running in parallel.",
              "• A negative result, reported: a “semantic verification” fusion strategy scored best on the development set but tied on a 30-query held-out set written before the experiment. Plain RRF stayed the default.",
            ]
          },
          {
            title: "Limits and next steps",
            content: [
              "• Occasion queries such as “outfit for a beach wedding” still return some nightdresses. The catalog images are 60×80 pixels, too small for CLIP to see fine detail.",
              "• On synonym queries, hybrid (0.837) trails vector-only search (0.897), because keyword search adds wrong-sense matches.",
              "• Next: a re-ranking stage on the fused top 50, and title embeddings as a third signal, each judged on a fresh query set.",
            ]
          },
          {
            title: "What this project demonstrates",
            content: [
              "Hybrid Product Search shows how I build AI features as measurable systems: a classic search engine and a multimodal model working together, with each design decision checked against data rather than intuition.",
              "It also shows the discipline production search needs: held-out evaluation, validating an automatic metric against human judgement, and reporting what didn't work.",
            ]
          },
        ]
      },
    },
    {
      id: "ragspec",
      category: "AI EVALUATION",
      title: "RagSpec: RAG Evaluator",
      shortDescription:
        "Automated tests for RAG chatbots: scores retrieval, has an LLM judge check every claim against the sources, and uses a paired bootstrap to tell real regressions from noise. Benchmarked 5 retrievers across 3 public datasets.",
      tags: ["Python", "LLM Evaluation", "Gemini", "pgvector", "BM25"],
      image: "/images/projects/ragspec-demo.jpg",
      video: {
        webm: "/images/projects/ragspec-demo.webm",
        mp4: "/images/projects/ragspec-demo.mp4",
      },
      repoUrl: "https://github.com/DecodeDebangi/ragspec",
      visualType: "ai-search" as const,
      caseStudy: {
        title: "RagSpec: RAG Evaluator",
        category: "LLM Evaluation · Information Retrieval · Applied Statistics",
        stack: ["Python", "Typer", "Pydantic", "httpx", "Gemini API", "pgvector", "bm25s", "sentence-transformers"],
        sections: [
          {
            title: "Overview",
            content: [
              "A test suite for chatbots that answer from your documents.",
              "A RAG chatbot searches documents, then writes an answer from what it finds. A small change, like a shorter prompt or fewer retrieved documents, can quietly make it worse, and trying a few questions by hand won't catch that.",
              "RagSpec runs a fixed set of questions against a RAG system, scores the search step and every answer, and compares the results with a previous run. It only needs the system's answer and retrieved documents, so it works on a Python function or a URL.",
              "It includes a command-line tool, an HTML dashboard, and a local playground where a question runs through two versions side by side. Every metric is implemented in the project rather than taken from an evaluation framework.",
            ]
          },
          {
            title: "The problem",
            content: [
              "• A RAG system can fail in separate places: search misses the right document, the answer adds facts the documents don't contain, or a citation points to the wrong source.",
              "• Averages mislead: a small change in a mean can be noise from a few questions, and a fixed threshold either fires on that noise or misses real drops.",
              "• An LLM judge is itself a model that can be wrong, so its grades need checking before anyone trusts them.",
            ]
          },
          {
            title: "Product experience",
            content: [
              "• Verdict first: the playground and dashboard state whether a change would be blocked, and why, in plain language.",
              "• Side-by-side answers: each version shows its checks, its answer, and each fact marked as backed, not in the documents, or contradicted, with the judge's reason.",
              "• Traceable citations: clicking a citation opens the document behind it.",
              "• Saved results work with no API calls. Live questions run through a free hosted model, and a quota error gets one clear message.",
            ]
          },
          {
            title: "Architecture and system design",
            content: [
              "RagSpec treats the RAG system as a black box. Chunking, embeddings and reranking stay inside the system being tested.",
              "```mermaid\nflowchart TD\n    Q[\"Test questions with relevance labels\"] --> R[\"Runner\"]\n    R --> S[\"RAG system under test: Python function or URL\"]\n    S -->|\"answer + retrieved documents\"| R\n    R --> M[\"Retrieval metrics: recall, nDCG, MRR\"]\n    R --> J[\"LLM judge: a verdict for each claim\"]\n    J --> F[\"Validate, then score in code: faithfulness, citation precision and recall\"]\n    M --> U[\"Run file\"]\n    F --> U\n    U --> C[\"Compare with baseline: paired bootstrap and gate\"]\n    C --> O[\"Terminal, dashboard, playground, pass or fail\"]\n```",
              "• Runner: asks every question concurrently, with separate limits for the system under test and the judge.",
              "• Judge: works with Gemini or other OpenAI-compatible APIs, Claude, or a local Ollama model, through one small interface. Verdicts are cached by content hash.",
              "• Compare: pairs the same questions across two runs, computes a confidence interval, and sets a pass or fail exit code.",
              "• Benchmark pipelines: BM25, dense vectors in pgvector, hybrid with Reciprocal Rank Fusion, and two cross-encoder rerankers.",
            ]
          },
          {
            title: "Key engineering decisions",
            content: [
              "• Why verdicts rather than scores? A 1–10 rating from a model drifts and can't be explained. The judge labels each claim, and code does the counting, so every score traces back to sentences you can read.",
              "• Why a paired bootstrap? Comparing the same question in both runs removes differences in question difficulty. A metric only counts as regressed if its whole 95% interval is below zero and the drop exceeds a small tolerance.",
              "• Why not trust the judge's output? It's constrained by a JSON schema, can't cite documents that weren't retrieved, and malformed output becomes an error, never a score.",
              "• Why tell the judge the product name? Rewording the prompt kept failing: the judge rejected correct facts because the documents never named the product, then found new ways to do it. Passing the name as a setting fixed the cause.",
            ]
          },
          {
            title: "Results",
            content: [
              "• Retrieval benchmark: 15 runs covering 5 retrievers on 3 BEIR datasets. BM25 and dense scores match published baselines (BM25 on NFCorpus: 0.322 against 0.325), a check on the metric code.",
              "• “Hybrid is always better” didn't hold: on FiQA, hybrid search scored significantly worse than dense alone (nDCG@10 0.358 vs 0.399; change −0.041, 95% CI −0.058 to −0.025).",
              "• An off-the-shelf reranker hurt: MiniLM significantly lowered SciFact nDCG@10 (0.723 to 0.685) and added about 150 ms per query.",
              "• Regression demo: a simulated bad pull request (fewer documents, looser prompt) was flagged on 26 questions, with citation recall falling from 100% to 0%.",
              "• Judge accuracy: on 20 hand-labelled cases kept out of tuning, the prompt with the product setting matched 22, 23 and 23 of 23 checks across three runs, against 20, 22 and 21 for the original prompt. I wrote those cases myself, so they're a sanity check rather than independent proof.",
              "• A negative result, reported: the judge once scored 22/22 on a smaller check, yet on real answers it rejected correct facts. Reading the verdicts by hand showed that a flagged faithfulness drop was mostly judge false alarms.",
            ]
          },
          {
            title: "Limits and next steps",
            content: [
              "• The judge still sometimes rejects correct calculated numbers, and a few grades change between runs, so the demo's faithfulness drop (100% to 89%) is approximate. Of the five questions behind it, I read two as real, two as debatable and one as a judge error.",
              "• Known gap: if a version stops saying “I don't know” and starts inventing answers, those questions can't be paired, so they're missing from the significance test.",
              "• It measures whether answers are grounded in the documents, not whether they're correct or complete.",
              "• The GitHub Action for pull requests is included but has never run on GitHub. Claude as a judge has also never been run; measured runs used Gemini and a local model.",
              "• Next: close the pairing gap, add a metric for correct refusals, and validate the judge against a larger human-labelled set.",
            ]
          },
          {
            title: "What this project demonstrates",
            content: [
              "RagSpec shows how I approach LLM systems: measure them, check whether the measurement itself can be trusted, and report what the numbers can't support.",
              "The most useful findings came from reading real outputs instead of accepting a good score, including the ones that showed my own evaluator was wrong.",
            ]
          },
        ]
      },
    },
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
      "/images/projects/IMG_6284.jpg",
      "/images/projects/IMG_0932.JPG",
      "/images/projects/IMG_8732.jpg"
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
