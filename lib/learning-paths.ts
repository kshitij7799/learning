export interface LearningStep {
  id: string
  title: string
  description: string
  duration: string
  resources: string[]
  completed: boolean
}

export interface LearningPath {
  id: string
  userId: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  steps: LearningStep[]
  createdAt: string
  progress: number
}

const apiBase = "/api/learning-paths"

export const saveLearningPath = async (path: LearningPath): Promise<void> => {
  const response = await fetch(apiBase, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(path),
  })

  if (!response.ok) {
    throw new Error("Failed to save learning path")
  }
}

export const getLearningPaths = async (userId: string): Promise<LearningPath[]> => {
  const response = await fetch(`${apiBase}?userId=${encodeURIComponent(userId)}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to load learning paths")
  }

  return response.json()
}

export const updateLearningPath = async (
  pathId: string,
  updates: Partial<LearningPath>,
): Promise<LearningPath> => {
  const response = await fetch(`${apiBase}/${encodeURIComponent(pathId)}`, {
    method: "PUT",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error("Failed to update learning path")
  }

  return response.json()
}

export const deleteLearningPath = async (pathId: string): Promise<void> => {
  const response = await fetch(`${apiBase}/${encodeURIComponent(pathId)}`, {
    method: "DELETE",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to delete learning path")
  }
}

export const generateLearningPath = (
  userId: string,
  topic: string,
  difficulty: "beginner" | "intermediate" | "advanced",
  category: string,
): LearningPath => {
  const stepTemplates = {
    beginner: [
      { title: "Introduction and Fundamentals", duration: "1-2 weeks" },
      { title: "Core Concepts", duration: "2-3 weeks" },
      { title: "Practical Exercises", duration: "2 weeks" },
      { title: "Building Your First Project", duration: "2-3 weeks" },
      { title: "Review and Next Steps", duration: "1 week" },
    ],
    intermediate: [
      { title: "Advanced Concepts", duration: "2-3 weeks" },
      { title: "Best Practices and Patterns", duration: "2 weeks" },
      { title: "Real-World Applications", duration: "3-4 weeks" },
      { title: "Performance and Optimization", duration: "2 weeks" },
      { title: "Capstone Project", duration: "3-4 weeks" },
    ],
    advanced: [
      { title: "Expert-Level Techniques", duration: "3-4 weeks" },
      { title: "Architecture and Design", duration: "3 weeks" },
      { title: "Advanced Problem Solving", duration: "4 weeks" },
      { title: "Industry Standards", duration: "2-3 weeks" },
      { title: "Master Project", duration: "4-6 weeks" },
    ],
  }

  const templates = stepTemplates[difficulty]
  const steps: LearningStep[] = templates.map((template, index) => ({
    id: `${Date.now()}-${index}`,
    title: template.title,
    description: `Learn ${template.title.toLowerCase()} for ${topic}`,
    duration: template.duration,
    resources: ["Official documentation", "Video tutorials", "Interactive exercises", "Community forums"],
    completed: false,
  }))

  return {
    id: Date.now().toString(),
    userId,
    title: `${topic} Learning Path`,
    description: `A comprehensive ${difficulty}-level learning path for mastering ${topic}`,
    category,
    difficulty,
    steps,
    createdAt: new Date().toISOString(),
    progress: 0,
  }
}
