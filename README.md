# Next.js Project with Docker

This project is a [Next.js project](https://nextjs.org/) initialized with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and configured to run in a Docker environment.

## Prerequisites

- Docker
- Link-360
- [DNSMasq URL](https://allanphilipbarku.medium.com/setup-automatic-local-domains-with-dnsmasq-on-macos-ventura-b4cd460d8cb3)

## Getting Started

To start the development server with Docker, execute IN link-360:

```bash
docker compose up ui
```

Then in the React-ui projet, run :

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Global Style and Theme

This project uses a global stylesheet and a theme file to ensure consistent styling across the application. The global styles are applied through a `theme.css` file, which is imported into the application's root layout component (`layout.tsx`). This approach allows for easy customization and ensures that the theme styles are available throughout the application.

### Importing the Theme

The `theme.css` file should be imported at the top level of your application to ensure its variables and styles are globally available. In a Next.js project, this is typically done in the `pages/_app.js` or `pages/_app.tsx` file, which acts as the application's root component.

For example, to import the global theme in a Next.js application:

```jsx
import './theme.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### Using CSS Variables in Components

After importing the theme, you can use the CSS variables defined in theme.css throughout your components. For instance:

```css
/* components/MyComponent.module.css */
.myComponent {
  background-color: var(--primary-color);
  font-family: var(--font-primary);
}
```

This ensures that all components in the application can access and use the global styles and variables defined in the theme, promoting consistency and ease of maintenance.

## File Storage in CDN Bucket

This project leverages the `morning-react-ui-data` GCP bucket for storing and serving static assets such as images, stylesheets, and JavaScript files. Utilizing a CDN for these assets allows for improved loading times, reduced server load by caching files closer to the user and serving them over a distributed network and a simpler URL to use.

### How It Works

All static assets are uploaded to the `morning-react-ui-data` bucket on Google Cloud Storage (GCS), where they are made publicly accessible. These assets can then be directly referenced within the application using absolute URLs, following the base path `https://cdn.morning.fr/`. This approach ensures efficient delivery of content to users across the globe, leveraging GCS's robust scalability and Google's extensive network infrastructure.

### Benefits

- **Reduced Latency**: By serving assets from locations geographically closer to the user, we significantly reduce content delivery times.
- **Scalability**: Google Cloud Storage automatically scales to meet demand, ensuring that assets are always available regardless of traffic spikes.
- **Cost-Efficiency**: Offloading static asset serving to a CDN can reduce the bandwidth and computation costs on the primary servers.

### Implementing Changes

To update or add new assets to the CDN, files should be uploaded to the `morning-react-ui-data` bucket following the project's asset management guidelines.
