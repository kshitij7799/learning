import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-3xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
            Your Personalized Learning Journey Starts Here
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed font-semibold italic">
            <strong><em>Design personalized learning paths that align with your goals, interests, and skill level. Track your progress and master new skills at your own pace.</em></strong>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 border-border bg-transparent">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Goal-Oriented</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Define your learning objectives and get a customized path to achieve them
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Access curated resources and structured content for effective learning
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Monitor your advancement and celebrate milestones along the way
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
