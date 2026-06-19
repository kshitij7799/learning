"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateLearningPath, saveLearningPath } from "@/lib/learning-paths"
import { getAuthState } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function LearningPathForm() {
  const [topic, setTopic] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { user } = getAuthState()
    if (!user) {
      router.push("/login")
      return
    }

    try {
      const learningPath = generateLearningPath(user.id, topic, difficulty, category)
      await saveLearningPath(learningPath)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating learning path:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Learning Path</CardTitle>
        <CardDescription className="text-muted-foreground">
          Tell us what you want to learn and we'll create a personalized path for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">What do you want to learn?</Label>
            <Input
              id="topic"
              type="text"
              placeholder="e.g., React, Python, Machine Learning"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="languages">Languages</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select
              value={difficulty}
              onValueChange={(value) => setDifficulty(value as "beginner" | "intermediate" | "advanced")}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner - I'm just starting</SelectItem>
                <SelectItem value="intermediate">Intermediate - I have some experience</SelectItem>
                <SelectItem value="advanced">Advanced - I want to master it</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? "Generating..." : "Generate Learning Path"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
