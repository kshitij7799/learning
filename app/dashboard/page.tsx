"use client"

import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthState, logout } from "@/lib/auth"
import { getLearningPaths, type LearningPath } from "@/lib/learning-paths"
import { Button } from "@/components/ui/button"
import { LearningPathCard } from "@/components/learning-path-card"
import { LearningPathDetail } from "@/components/learning-path-detail"
import Link from "next/link"
import { Plus, LogOut, BookOpen } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export default function DashboardPage() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [userName, setUserName] = useState("")
  const router = useRouter()

  const loadPaths = async () => {
    const { user, isAuthenticated } = getAuthState()
    if (!isAuthenticated || !user) {
      router.push("/login")
      return
    }
    setUserName(user.name)
    try {
      const paths = await getLearningPaths(user.id)
      setLearningPaths(paths)
    } catch (error) {
      console.error("Error loading learning paths:", error)
      setLearningPaths([])
    }
  }

  useEffect(() => {
    loadPaths()
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleViewPath = (path: LearningPath) => {
    setSelectedPath(path)
  }

  const handleBackToDashboard = () => {
    setSelectedPath(null)
    loadPaths()
  }

  if (selectedPath) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link href="/dashboard" className="text-xl font-bold">
              Learning Path Generator
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <LearningPathDetail path={selectedPath} onBack={handleBackToDashboard} onUpdate={loadPaths} />
        </main>
        <Chatbot />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold">
            Learning Path Generator
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-muted-foreground">
              <Link href="/library">
                <BookOpen className="h-4 w-4 mr-2" />
                Library
              </Link>
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Welcome back, {userName}</h1>
          <p className="text-muted-foreground text-lg">
            Continue your learning journey or start a new path. Track your progress and achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{learningPaths.length}</div>
              <p className="text-sm text-muted-foreground">Active Learning Paths</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">
                {Math.round(learningPaths.reduce((acc, path) => acc + path.progress, 0) / (learningPaths.length || 1))}%
              </div>
              <p className="text-sm text-muted-foreground">Average Progress</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">
                {learningPaths.filter((p) => p.progress === 100).length}
              </div>
              <p className="text-sm text-muted-foreground">Completed Paths</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex gap-3">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create New Learning Path
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-border bg-transparent">
            <Link href="/library">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Library
            </Link>
          </Button>
        </div>

        {learningPaths.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">No learning paths yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first personalized learning path or explore our library of pre-made paths
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/create">Create Your First Path</Link>
                </Button>
                <Button asChild variant="outline" className="border-border bg-transparent">
                  <Link href="/library">Explore Library</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} onDelete={loadPaths} onView={() => handleViewPath(path)} />
            ))}
          </div>
        )}
      </main>
      <Chatbot />
    </div>
  )
}
