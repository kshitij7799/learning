# Deployment

## Recommended: Vercel

This app is a Next.js project and deploys smoothly on Vercel.

### Steps

1. Push your project to GitHub.
2. Sign in to Vercel and import the repository.
3. In Vercel project settings, add these environment variables or secrets:
   - `MONGODB_URI` — your MongoDB connection string
   - `MONGODB_DB` — database name (example: `personalized-learning-path`)
   - If you use Vercel secrets, create `mongodb_uri` and `mongodb_db` and reference them in `vercel.json`.
4. Deploy the project.

### Local environment variables

To run the project locally, copy `.env.local.example` to `.env.local` and update values:

```bash
cp .env.local.example .env.local
```

### Build command

- `pnpm build`

### Start command

- `pnpm start`

## GitHub Actions deployment

A workflow is included at `.github/workflows/vercel-deploy.yml`.

### Required GitHub secrets

- `MONGODB_URI`
- `MONGODB_DB`
- `VERCEL_TOKEN` (only if you want automatic Vercel deploys)
- `VERCEL_ORG_ID` (only if you want automatic Vercel deploys)
- `VERCEL_PROJECT_ID` (only if you want automatic Vercel deploys)

The workflow will:

1. install dependencies
2. run `pnpm build`
3. deploy to Vercel if Vercel secrets are provided

## Vercel CLI deployment

If you prefer direct CLI deployment, install Vercel and run:

```bash
npm install -g vercel
# or use npx vercel
```

Then deploy from the project root:

```bash
vercel login
vercel --prod
```

During deployment, set `MONGODB_URI` and `MONGODB_DB` in the Vercel project environment variables.

## Alternative: Docker/Other hosts

If you deploy to another host, make sure:

- Node.js >= 18
- `MONGODB_URI` and `MONGODB_DB` are set in your environment
- the app runs with `pnpm install` and `pnpm build`
