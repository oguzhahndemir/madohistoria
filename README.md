<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1mLuDhbPduop4-h7UPnviJ5K8h3BLEze3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Create a repository secret named `GEMINI_API_KEY` that contains the Gemini key required by the app.
2. Ensure your default branch is `main` (or update the workflow trigger accordingly).
3. Push your changes to GitHub. The included **Deploy to GitHub Pages** workflow will build the project and publish the `dist` folder to GitHub Pages automatically.
4. After the first deployment completes, enable GitHub Pages in your repository settings and select the **GitHub Actions** source if prompted.
