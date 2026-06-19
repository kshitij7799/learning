"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAuthState } from "@/lib/auth"
import { LearningPathForm } from "@/components/learning-path-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Chatbot } from "@/components/chatbot"
import { BookOpen } from "lucide-react"

export default function CreatePage() {
  const router = useRouter()

  useEffect(() => {
    const { isAuthenticated } = getAuthState()
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold">
            Learning Path Generator
          </Link>
          <div className="flex gap-3">
            <Button asChild variant="ghost" className="text-muted-foreground">
              <Link href="/library">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Library
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-border bg-transparent">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 text-balance">Start Your Learning Journey</h1>
            <p className="text-muted-foreground text-lg text-pretty leading-relaxed mb-4">
              Answer a few questions and we'll create a customized learning path tailored to your goals and experience
              level. Our AI-powered system will generate a structured roadmap with resources and milestones.
            </p>
            <p className="text-sm text-muted-foreground">
              Not sure where to start?{" "}
              <Link href="/library" className="text-primary hover:underline">
                Browse our library
              </Link>{" "}
              of pre-made learning paths or ask our chatbot for recommendations.
            </p>
          </div>
          <LearningPathForm />
        </div>
      </main>
      <Chatbot />
    </div>
  )
}
