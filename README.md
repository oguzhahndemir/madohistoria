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

## Deploy to cPanel

To deploy on cPanel you must upload the **production build output** instead of the development sources. Run `npm run build`, then upload the files **inside** the generated `dist/` folder (`index.html`, the `assets/` directory, and the `.htaccess`) to the directory that serves your site (for example `public_html/` or a sub-folder). Browsers cannot execute the raw `index.tsx` entry file, so deploying without building first will always trigger a module script MIME error.

Once the build output is uploaded, the server still needs to know which MIME type to use for each asset extension. Place the generated `.htaccess` file in the deployment directory (or merge its directives into your existing configuration) so the following mappings are available:

| Extension(s) | MIME type |
| --- | --- |
| `.html`, `.htm` | `text/html` |
| `.css` | `text/css` |
| `.js`, `.mjs`, `.cjs`, `.jsx` | `text/javascript` |
| `.json` | `application/json` |
| `.webmanifest`, `.manifest` | `application/manifest+json` |
| `.txt` | `text/plain` |
| `.svg` | `image/svg+xml` |
| `.png` | `image/png` |
| `.jpg`, `.jpeg` | `image/jpeg` |
| `.webp` | `image/webp` |
| `.avif` | `image/avif` |
| `.ico` | `image/x-icon` |
| `.woff2` | `font/woff2` |
| `.woff` | `font/woff` |
| `.ttf` | `font/ttf` |
| `.otf` | `font/otf` |
| `.wasm` | `application/wasm` |

> **Note:** Some shared hosting environments default to `application/octet-stream` for JavaScript files. Explicitly mapping them to `text/javascript` (either via the provided `.htaccess` or through the cPanel **MIME Types** interface) ensures browsers will execute the bundled module scripts instead of blocking them for having the wrong MIME type.

If your hosting provider blocks custom `.htaccess` files, configure the same MIME mappings through the cPanel **MIME Types** interface instead. Add entries for `.js`, `.mjs`, `.cjs`, and `.jsx` that point to `text/javascript` and double-check that the uploaded files are the built assets from `dist/`.
