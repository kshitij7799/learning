import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongo"
import type { LearningPath } from "@/lib/learning-paths"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId query parameter" }, { status: 400 })
  }

  const db = await getDb()
  const paths = await db
    .collection<LearningPath>("learningPaths")
    .find({ userId })
    .toArray()

  return NextResponse.json(paths)
}

export async function POST(req: Request) {
  const body = await req.json()
  const learningPath = body as LearningPath

  if (!learningPath?.userId || !learningPath?.title || !learningPath?.id) {
    return NextResponse.json({ error: "Missing required learning path fields" }, { status: 400 })
  }

  const db = await getDb()
  await db.collection("learningPaths").insertOne({
    ...learningPath,
    createdAt: learningPath.createdAt || new Date().toISOString(),
  })

  return NextResponse.json(learningPath, { status: 201 })
}
