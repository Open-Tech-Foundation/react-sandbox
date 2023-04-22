import SandBox from '../../src/SandBox';
import styles from './App.module.css';

function App() {
  const nodeCode = `import {range} from "@opentf/utils";
  console.log(range(1, 8));
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
      <h1>@opentf/react-sandbox</h1>
      <SandBox
        tabIndex={1}
        template="react"
        code={reactCode}
        style={{ height: '500px' }}
      />
      {/* <SandBox
        tabIndex={1}
        template="static"
        code={htmlCode}
        files={{ '/styles.css': 'body {  color: orange; }' }}
      /> */}
      <SandBox
        tabIndex={1}
        template="vite-react"
        code={reactCode}
        consoleType="Advanced"
      />
    </div>
  );
}

export default App;
