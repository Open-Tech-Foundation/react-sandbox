import SandBox from '../../src/SandBox';
import styles from './App.module.css';

function App() {
  const code = `export default function App() {
    return <h1>Hello world</h1>
  }
  `;
  return (
    <div className={styles.app}>
      <h1>@opentf/react-sandbox</h1>
      <div className={styles.main}>
        <div />
        <SandBox template="react" code={code} />
        <div />
      </div>
    </div>
  );
}

export default App;
