"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { LearningPath } from "@/lib/learning-paths"
import { deleteLearningPath } from "@/lib/learning-paths"
import { Trash2 } from "lucide-react"

interface LearningPathCardProps {
  path: LearningPath
  onDelete: () => void
  onView: () => void
}

export function LearningPathCard({ path, onDelete, onView }: LearningPathCardProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this learning path?")) {
      try {
        await deleteLearningPath(path.id)
        onDelete()
      } catch (error) {
        console.error("Failed to delete learning path:", error)
      }
    }
  }

  const difficultyColors = {
    beginner: "text-green-500",
    intermediate: "text-yellow-500",
    advanced: "text-red-500",
  }

  return (
    <Card className="border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">{path.title}</CardTitle>
            <CardDescription className="text-muted-foreground">{path.description}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground capitalize">
            {path.category}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full bg-secondary capitalize ${difficultyColors[path.difficulty]}`}
          >
            {path.difficulty}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{path.progress}%</span>
          </div>
          <Progress value={path.progress} className="h-2" />
        </div>
        <div className="text-sm text-muted-foreground">
          {path.steps.length} steps • Created {new Date(path.createdAt).toLocaleDateString()}
        </div>
        <Button onClick={onView} className="w-full bg-primary hover:bg-primary/90">
          View Learning Path
        </Button>
      </CardContent>
    </Card>
  )
}
