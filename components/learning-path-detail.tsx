"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import type { LearningPath } from "@/lib/learning-paths"
import { updateLearningPath } from "@/lib/learning-paths"
import { ArrowLeft, Clock } from "lucide-react"

interface LearningPathDetailProps {
  path: LearningPath
  onBack: () => void
  onUpdate: () => void
}

export function LearningPathDetail({ path, onBack, onUpdate }: LearningPathDetailProps) {
  const [localPath, setLocalPath] = useState(path)

  const toggleStepCompletion = async (stepId: string) => {
    const updatedSteps = localPath.steps.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step,
    )
    const completedCount = updatedSteps.filter((s) => s.completed).length
    const progress = Math.round((completedCount / updatedSteps.length) * 100)

    const updatedPath = { ...localPath, steps: updatedSteps, progress }
    setLocalPath(updatedPath)
    try {
      await updateLearningPath(path.id, { steps: updatedSteps, progress })
      onUpdate()
    } catch (error) {
      console.error("Failed to update learning path:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-balance">{localPath.title}</h1>
          <p className="text-muted-foreground mt-1">{localPath.description}</p>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription className="text-muted-foreground">
            {localPath.steps.filter((s) => s.completed).length} of {localPath.steps.length} steps completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={localPath.progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">{localPath.progress}% complete</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Learning Steps</h2>
        {localPath.steps.map((step, index) => (
          <Card key={step.id} className={`border-border ${step.completed ? "bg-muted/50" : ""}`}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={step.completed}
                  onCheckedChange={() => toggleStepCompletion(step.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <CardTitle className={`text-lg ${step.completed ? "line-through text-muted-foreground" : ""}`}>
                    Step {index + 1}: {step.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">{step.description}</CardDescription>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">Recommended Resources:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {step.resources.map((resource, idx) => (
                    <li key={idx}>{resource}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
