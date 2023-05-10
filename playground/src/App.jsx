import SandBox from '../../src/SandBox';
import styles from './App.module.css';

function App() {
  const vanilaCode = `import {range} from "@opentf/utils";
  console.log(range(1, 8));
  console.log(range(1, 5));`;

  const nodeCode = `const http = require('http');

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
      <SandBox
        template="vanilla"
        code={vanilaCode}
        consoleType="Advanced"
        layout="Code_Console"
        deps={[
          '@opentf/utils',
          '@opentf/react-state@0.13.1',
          'lodash@4.17.21',
          'dequal',
        ]}
      />
      {/* <SandBox
        tabIndex={2}
        template="node"
        deps={['@opentf/utils']}
        code={nodeCode}
        consoleType="Advanced"
      /> */}
      {/* <SandBox
        tabIndex={1}
        template="nextjs"
        code={reactCode}
        consoleType="Advanced"
      /> */}
      {/* <SandBox
        tabIndex={1}
        template="static"
        code={htmlCode}
        files={{ '/styles.css': 'body {  color: orange; }' }}
      /> */}
      {/* <SandBox
        tabIndex={2}
        template="vite-react"
        code={reactCode}
        consoleType="Basic"
      /> */}
    </div>
  );
}

export default App;
