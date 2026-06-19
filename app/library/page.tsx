"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthState } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Plus, Search } from "lucide-react"
import { libraryPaths, convertLibraryPathToUserPath, type LibraryPath } from "@/lib/library-data"
import { saveLearningPath } from "@/lib/learning-paths"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chatbot } from "@/components/chatbot"

export default function LibraryPage() {
  const router = useRouter()
  const [selectedPath, setSelectedPath] = useState<LibraryPath | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  useEffect(() => {
    const { isAuthenticated } = getAuthState()
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleAddToMyPaths = async (libraryPath: LibraryPath) => {
    const { user } = getAuthState()
    if (!user) return

    const userPath = convertLibraryPathToUserPath(libraryPath, user.id)
    try {
      await saveLearningPath(userPath)
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to add learning path:", error)
    }
  }

  const filteredPaths = libraryPaths.filter((path) => {
    const matchesSearch =
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || path.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || path.difficulty === difficultyFilter

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (selectedPath) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link href="/library" className="text-xl font-bold">
              Learning Path Library
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => setSelectedPath(null)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3 text-balance">{selectedPath.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">{selectedPath.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getDifficultyColor(selectedPath.difficulty)}>
                  {selectedPath.difficulty.charAt(0).toUpperCase() + selectedPath.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline" className="border-border">
                  <Clock className="h-3 w-3 mr-1" />
                  {selectedPath.duration}
                </Badge>
                <Badge variant="outline" className="border-border">
                  {selectedPath.category}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPath.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
              <Button onClick={() => handleAddToMyPaths(selectedPath)} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add to My Learning Paths
              </Button>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Learning Steps</CardTitle>
                <CardDescription>Follow these steps to master {selectedPath.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedPath.steps.map((step, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{step.description}</p>
                        <Badge variant="outline" className="border-border mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.duration}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium mb-2">Recommended Resources:</p>
                          <ul className="space-y-1">
                            {step.resources.map((resource, rIndex) => (
                              <li key={rIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                <BookOpen className="h-3 w-3" />
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
        <Chatbot />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/library" className="text-xl font-bold">
            Learning Path Library
          </Link>
          <Button asChild variant="outline" className="border-border bg-transparent">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-balance">Explore Learning Paths</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Browse our curated collection of learning paths designed by experts. Find the perfect path to achieve your
            goals.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by topic, title, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px] bg-input border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[200px] bg-input border-border">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Library Grid */}
        {filteredPaths.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No paths found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((path) => (
              <Card key={path.id} className="border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      <Clock className="h-3 w-3 mr-1" />
                      {path.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-balance">{path.title}</CardTitle>
                  <CardDescription className="text-pretty leading-relaxed">{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {path.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{path.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setSelectedPath(path)} variant="outline" className="flex-1 border-border">
                      View Details
                    </Button>
                    <Button onClick={() => handleAddToMyPaths(path)} className="flex-1 bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Chatbot />
    </div>
  )
}
