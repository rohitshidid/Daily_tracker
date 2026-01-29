# Daily Routine Tracker

A premium, responsive Daily Routine Tracker web application optimized for desktop productivity.

## Features
- **Compact Dashboard**: Single-screen view with no page scrolling.
- **Drag & Drop Schedule**: Plan your day by dragging tasks into time slots.
- **Visual Analytics**: Real-time charts for weekly progress, daily splits, and activity trends.
- **Theme Support**: Premium Dark Mode and Light Mode with persistence.
- **Local Data**: All data remains on your device (LocalStorage).

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

1.  **Configure Base URL**:
    Open `vite.config.js` and ensure the `base` option matches your repository name:
    ```js
    base: '/your-repo-name/',
    ```
    *(Currently set to `/daily-routine-tracker/`)*

2.  **Deploy Command**:
    Run the following command in your terminal:
    ```bash
    npm run deploy
    ```
    This script will:
    - Build the project (`npm run build`).
    - Push the `dist` folder to a `gh-pages` branch on your repository.

3.  **GitHub Settings**:
    - Go to your repository on GitHub.
    - Navigate to **Settings** > **Pages**.
    - Under **Build and deployment**, select **Source** as `Deploy from a branch`.
    - Select the `gh-pages` branch and `/ (root)` folder.
    - Click **Save**.

Your app will be live at `https://<your-username>.github.io/<repo-name>/`.

## Development

To run locally:
```bash
npm install
npm run dev
```
