import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongo"
import type { LearningPath } from "@/lib/learning-paths"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const updates = await req.json()

  const db = await getDb()
  const result = await db
    .collection<LearningPath>("learningPaths")
    .findOneAndUpdate({ id }, { $set: updates }, { returnDocument: "after" })

  if (!result.value) {
    return NextResponse.json({ error: "Learning path not found" }, { status: 404 })
  }

  return NextResponse.json(result.value)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const db = await getDb()
  const result = await db.collection("learningPaths").deleteOne({ id })

  if (result.deletedCount !== 1) {
    return NextResponse.json({ error: "Learning path not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
