import type { LearningPath } from "./learning-paths"

export interface LibraryPath {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  topics: string[]
  steps: Array<{
    title: string
    description: string
    duration: string
    resources: string[]
  }>
}

export const libraryPaths: LibraryPath[] = [
  {
    id: "web-dev-fundamentals",
    title: "Web Development Fundamentals",
    description: "Master the core technologies of web development: HTML, CSS, and JavaScript",
    category: "programming",
    difficulty: "beginner",
    duration: "8-10 weeks",
    topics: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    steps: [
      {
        title: "HTML Basics",
        description: "Learn HTML structure, semantic elements, forms, and accessibility",
        duration: "1-2 weeks",
        resources: [
          "MDN Web Docs - HTML",
          "freeCodeCamp HTML Course",
          "HTML5 Semantic Elements Guide",
          "Web Accessibility Guidelines",
        ],
      },
      {
        title: "CSS Fundamentals",
        description: "Master CSS selectors, box model, flexbox, and grid layouts",
        duration: "2-3 weeks",
        resources: [
          "CSS-Tricks Complete Guide",
          "Flexbox Froggy Game",
          "Grid Garden Game",
          "Responsive Design Patterns",
        ],
      },
      {
        title: "JavaScript Essentials",
        description: "Learn JavaScript syntax, DOM manipulation, and event handling",
        duration: "3-4 weeks",
        resources: [
          "JavaScript.info Tutorial",
          "Eloquent JavaScript Book",
          "MDN JavaScript Guide",
          "JavaScript30 Challenge",
        ],
      },
      {
        title: "Build Your First Website",
        description: "Create a responsive portfolio website using HTML, CSS, and JavaScript",
        duration: "2-3 weeks",
        resources: [
          "Portfolio Project Ideas",
          "GitHub Pages Hosting",
          "Web Design Best Practices",
          "Code Review Checklist",
        ],
      },
    ],
  },
  {
    id: "react-mastery",
    title: "React Development Mastery",
    description: "Become proficient in React and build modern web applications",
    category: "programming",
    difficulty: "intermediate",
    duration: "10-12 weeks",
    topics: ["React", "Hooks", "State Management", "Next.js"],
    steps: [
      {
        title: "React Fundamentals",
        description: "Learn components, props, state, and the component lifecycle",
        duration: "2-3 weeks",
        resources: ["Official React Docs", "React Tutorial", "Component Patterns", "React DevTools"],
      },
      {
        title: "React Hooks Deep Dive",
        description: "Master useState, useEffect, useContext, and custom hooks",
        duration: "2-3 weeks",
        resources: ["Hooks API Reference", "Custom Hooks Patterns", "useEffect Complete Guide", "Hook Flow Diagram"],
      },
      {
        title: "State Management",
        description: "Learn Redux, Context API, and modern state management solutions",
        duration: "2-3 weeks",
        resources: ["Redux Toolkit", "Zustand Library", "React Query", "State Management Comparison"],
      },
      {
        title: "Next.js Framework",
        description: "Build production-ready apps with Next.js and server-side rendering",
        duration: "2-3 weeks",
        resources: ["Next.js Documentation", "App Router Guide", "Server Components", "Deployment on Vercel"],
      },
      {
        title: "Full-Stack Project",
        description: "Build a complete application with authentication and database",
        duration: "3-4 weeks",
        resources: ["Project Architecture", "API Design", "Database Integration", "Testing Strategies"],
      },
    ],
  },
  {
    id: "python-data-science",
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis with pandas, NumPy, and visualization",
    category: "data-science",
    difficulty: "beginner",
    duration: "10-12 weeks",
    topics: ["Python", "Pandas", "NumPy", "Data Visualization"],
    steps: [
      {
        title: "Python Programming Basics",
        description: "Learn Python syntax, data types, functions, and object-oriented programming",
        duration: "2-3 weeks",
        resources: ["Python.org Tutorial", "Automate the Boring Stuff", "Python Exercises", "Jupyter Notebooks"],
      },
      {
        title: "NumPy for Numerical Computing",
        description: "Master arrays, mathematical operations, and numerical computing",
        duration: "2 weeks",
        resources: ["NumPy Documentation", "Array Programming Guide", "Linear Algebra Basics", "NumPy Exercises"],
      },
      {
        title: "Pandas for Data Analysis",
        description: "Learn data manipulation, cleaning, and analysis with pandas",
        duration: "3-4 weeks",
        resources: ["Pandas Documentation", "Data Cleaning Techniques", "Time Series Analysis", "Real-World Datasets"],
      },
      {
        title: "Data Visualization",
        description: "Create compelling visualizations with Matplotlib and Seaborn",
        duration: "2-3 weeks",
        resources: [
          "Matplotlib Gallery",
          "Seaborn Tutorial",
          "Visualization Best Practices",
          "Interactive Plots with Plotly",
        ],
      },
      {
        title: "Data Science Project",
        description: "Complete an end-to-end data analysis project",
        duration: "2-3 weeks",
        resources: ["Kaggle Datasets", "Project Templates", "Analysis Workflow", "Presentation Skills"],
      },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Fundamentals",
    description: "Learn user interface and user experience design principles and tools",
    category: "design",
    difficulty: "beginner",
    duration: "8-10 weeks",
    topics: ["Design Principles", "Figma", "User Research", "Prototyping"],
    steps: [
      {
        title: "Design Principles",
        description: "Learn color theory, typography, layout, and visual hierarchy",
        duration: "2 weeks",
        resources: ["Design Principles Guide", "Color Theory Basics", "Typography Handbook", "Layout Composition"],
      },
      {
        title: "User Research Methods",
        description: "Conduct user interviews, surveys, and usability testing",
        duration: "2 weeks",
        resources: ["UX Research Methods", "Interview Techniques", "Survey Design", "Usability Testing Guide"],
      },
      {
        title: "Figma Mastery",
        description: "Master Figma for creating wireframes, mockups, and prototypes",
        duration: "2-3 weeks",
        resources: ["Figma Official Tutorials", "Component Design", "Auto Layout", "Design Systems"],
      },
      {
        title: "Prototyping and Testing",
        description: "Create interactive prototypes and conduct user testing",
        duration: "2-3 weeks",
        resources: ["Prototyping Best Practices", "User Testing Methods", "Feedback Analysis", "Iteration Process"],
      },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and practical applications",
    category: "data-science",
    difficulty: "intermediate",
    duration: "12-14 weeks",
    topics: ["ML Algorithms", "Scikit-learn", "Neural Networks", "Model Deployment"],
    steps: [
      {
        title: "ML Foundations",
        description: "Understand supervised, unsupervised learning, and key concepts",
        duration: "2-3 weeks",
        resources: ["ML Crash Course", "Mathematics for ML", "Statistics Fundamentals", "ML Terminology Guide"],
      },
      {
        title: "Supervised Learning",
        description: "Learn regression, classification, and decision trees",
        duration: "3-4 weeks",
        resources: [
          "Scikit-learn Documentation",
          "Linear Regression Guide",
          "Classification Algorithms",
          "Model Evaluation",
        ],
      },
      {
        title: "Unsupervised Learning",
        description: "Master clustering, dimensionality reduction, and anomaly detection",
        duration: "2-3 weeks",
        resources: ["K-Means Clustering", "PCA Tutorial", "Anomaly Detection Methods", "Feature Engineering"],
      },
      {
        title: "Neural Networks Intro",
        description: "Introduction to deep learning and neural networks",
        duration: "3-4 weeks",
        resources: ["TensorFlow Tutorials", "Keras Documentation", "Neural Network Basics", "CNN and RNN Intro"],
      },
      {
        title: "ML Project",
        description: "Build and deploy a complete machine learning model",
        duration: "3-4 weeks",
        resources: ["Project Ideas", "Model Deployment", "MLOps Basics", "Portfolio Presentation"],
      },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Essentials",
    description: "Learn SEO, content marketing, social media, and analytics",
    category: "business",
    difficulty: "beginner",
    duration: "8-10 weeks",
    topics: ["SEO", "Content Marketing", "Social Media", "Analytics"],
    steps: [
      {
        title: "SEO Fundamentals",
        description: "Learn search engine optimization and keyword research",
        duration: "2-3 weeks",
        resources: ["Google SEO Guide", "Keyword Research Tools", "On-Page SEO", "Link Building Strategies"],
      },
      {
        title: "Content Marketing",
        description: "Create compelling content and develop content strategies",
        duration: "2-3 weeks",
        resources: ["Content Strategy Guide", "Copywriting Basics", "Blog Writing", "Content Calendar"],
      },
      {
        title: "Social Media Marketing",
        description: "Master social media platforms and engagement strategies",
        duration: "2-3 weeks",
        resources: ["Platform Best Practices", "Social Media Tools", "Community Management", "Paid Advertising"],
      },
      {
        title: "Analytics and Metrics",
        description: "Track performance and make data-driven decisions",
        duration: "2-3 weeks",
        resources: ["Google Analytics", "Marketing Metrics", "A/B Testing", "ROI Calculation"],
      },
    ],
  },
]

export function convertLibraryPathToUserPath(libraryPath: LibraryPath, userId: string): LearningPath {
  return {
    id: Date.now().toString(),
    userId,
    title: libraryPath.title,
    description: libraryPath.description,
    category: libraryPath.category,
    difficulty: libraryPath.difficulty,
    steps: libraryPath.steps.map((step, index) => ({
      id: `${Date.now()}-${index}`,
      title: step.title,
      description: step.description,
      duration: step.duration,
      resources: step.resources,
      completed: false,
    })),
    createdAt: new Date().toISOString(),
    progress: 0,
  }
}
