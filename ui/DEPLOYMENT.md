# Vercel Deployment

Deploy the Vite app from the `ui` directory.

1. Set Vercel's root directory to `ui`.
2. Add `VITE_API_BASE_URL` in Vercel environment variables.
3. Use the default Vite build command: `npm run build`.
4. Use `dist` as the output directory.

The included `vercel.json` keeps React Router routes working on refresh.
