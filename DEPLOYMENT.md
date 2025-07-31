# Deployment to Netlify

This project is configured to deploy to Netlify with serverless functions for the API.

## Prerequisites

1. A Netlify account
2. Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to Git repository** (GitHub, GitLab, or Bitbucket)

2. **Connect to Netlify:**

   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Select the branch you want to deploy

3. **Configure build settings:**

   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
   - Node version: `18`

4. **Deploy!**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**

   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Project Structure for Netlify

```
task-5/
├── client/                 # React frontend
│   ├── build/             # Built files (will be created)
│   └── ...
├── netlify/
│   └── functions/         # Serverless functions
│       ├── api.js         # Main API handler
│       ├── bookGenerator.js
│       ├── csvExporter.js
│       └── package.json
├── server/                # Local development server
├── netlify.toml          # Netlify configuration
└── DEPLOYMENT.md         # This file
```

## API Endpoints

After deployment, your API will be available at:

- Books API: `https://your-site.netlify.app/.netlify/functions/api/books`
- CSV Export: `https://your-site.netlify.app/.netlify/functions/api/export-csv`

## Environment Variables

No environment variables are required for this deployment.

## Troubleshooting

1. **Build fails:** Check that all dependencies are installed in the client directory
2. **API not working:** Verify the netlify.toml redirects are correct
3. **Functions not found:** Ensure the netlify/functions directory structure is correct

## Local Testing

To test the Netlify functions locally:

```bash
netlify dev
```

This will start a local development server that mimics the Netlify environment.
