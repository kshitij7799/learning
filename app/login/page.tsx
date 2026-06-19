import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-balance mb-2">Learning Path Generator</h1>
          <p className="text-muted-foreground text-pretty">
            Create personalized learning journeys tailored to your goals
          </p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  )
}
