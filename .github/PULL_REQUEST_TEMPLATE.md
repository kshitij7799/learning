# Summary

Add MongoDB persistence and Vercel deployment support for the Personalized Learning Path app.

## What changed

- Added MongoDB connection helper in `lib/mongo.ts`
- Added API routes for learning path CRUD operations
- Replaced localStorage persistence with database-backed API calls
- Added GitHub Actions workflow for build and optional Vercel deploy
- Added Vercel deployment configuration (`vercel.json`)
- Updated deployment docs in `DEPLOYMENT.md`

## Why

This update moves learning path persistence from browser storage to a real MongoDB backend and adds automated deployment support through GitHub Actions and Vercel.

## Testing

- `pnpm install`
- `pnpm build`

## Notes

- Local development requires `.env.local` with `MONGODB_URI` and `MONGODB_DB`
- GitHub Actions secrets: `MONGODB_URI`, `MONGODB_DB`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
