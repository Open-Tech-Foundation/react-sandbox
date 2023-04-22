import SandBox from '../../src/SandBox';
import styles from './App.module.css';

function App() {
  const nodeCode = `import {range} from "@opentf/utils";
  console.log(range(1, 8));
  console.log(range(1, 5));
  const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Hello world');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});
  `;
  const reactCode = `export default function App() {
    console.log('App rendered');
    return <h1>Hello React world</h1>
  }`;

  const htmlCode = `<!DOCTYPE html>
  <html>
  
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  
  <body>
    <h1>Hello world from static code</h1>
    <script>
      console.log('asdf')
    </script>
  </body>
  
  </html>`;

  const indexJSCode = `import "./styles.css";
  
  document.getElementById("app").innerHTML = "<h1>Hello world</h1>";
  `;

  return (
    <div className={styles.app}>
      <h1>@opentf/react-sandbox</h1>
      <SandBox
        tabIndex={2}
        template="vite-react"
        code={reactCode}
        consoleType="Advanced"
      />
      <SandBox
        tabIndex={2}
        template="node"
        deps={['@opentf/utils']}
        code={nodeCode}
        consoleType="Advanced"
      />
      {/* <SandBox
        tabIndex={1}
        template="react"
        code={reactCode}
        consoleType="Basic"
      /> */}
      {/* <SandBox
        tabIndex={1}
        template="static"
        code={htmlCode}
        files={{ '/styles.css': 'body {  color: orange; }' }}
      /> */}
      <SandBox
        tabIndex={2}
        template="vite-react"
        code={reactCode}
        consoleType="Basic"
      />
    </div>
  );
}

export default App;
