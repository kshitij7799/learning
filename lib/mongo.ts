import { MongoClient } from "mongodb"

const dbName = process.env.MONGODB_DB || "personalized-learning-path"

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient
}

function getMongoClient() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable. Add it to your .env.local file.")
  }

  const client = globalForMongo._mongoClient ?? new MongoClient(uri)
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = client
  }
  return client
}

export async function getDb() {
  const mongoClient = getMongoClient()
  await mongoClient.connect()
  return mongoClient.db(dbName)
}
