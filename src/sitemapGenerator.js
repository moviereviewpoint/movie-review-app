// sitemapGenerator.js
const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const App = require('./src/App');

// Function to discover routes from the React components
function discoverRoutesFromComponents() {
  // Render the App component to a string
  const appString = renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>
  );

  // Extract the paths from the rendered string
  const matches = appString.match(/<Route path="([^"]+)" element=/g);

  // Map the matched paths to an array of route objects
  const routes = matches.map(match => {
    const pathMatch = match.match(/<Route path="([^"]+)" element=/);
    return { path: pathMatch[1] };
  });

  return routes;
}

async function generateSitemap() {
  const smStream = new SitemapStream({ hostname: 'https://moviereviewpoint.com' });

  const routes = discoverRoutesFromComponents();

  routes.forEach(route => {
    const path = route.path;

    smStream.write({
      url: path,
    });
  });

  smStream.end();

  return smStream;
}

generateSitemap().then(sm => sm.pipe(createWriteStream('../public/sitemap.xml')));
