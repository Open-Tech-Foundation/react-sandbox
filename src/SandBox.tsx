import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';

export type Files = Record<string, string>;

interface SandBoxProps {
  lib: string;
  code: string;
  files: Files;
  ts: boolean;
}

export default function SandBox(props: SandBoxProps) {
  const { lib, code, files, ts } = props;

  const ORG_NAME = '@open-tech-world';
  const sandboxFiles = files
    ? files
    : ts
    ? {
        '/App.tsx': code,
      }
    : {
        '/App.js': code,
      };

  const dependencies: Record<string, string> = {
    react: 'latest',
    'react-dom': 'latest',
    'react-scripts': 'latest',
  };

  dependencies[`${ORG_NAME}/${lib}`] = 'latest';

  return (
    <SandpackProvider
      template={ts ? 'react-ts' : 'react'}
      customSetup={{
        files: sandboxFiles,
        dependencies: dependencies,
      }}
    >
      <SandpackThemeProvider theme={'monokai-pro'}>
        <SandpackCodeEditor
          showInlineErrors
          showLineNumbers
          customStyle={{ height: '500px' }}
          showTabs
        />
        <SandpackPreview
          customStyle={{
            marginTop: '15px',
            border: '1px solid black',
            height: '500px',
          }}
          showNavigator
        />
      </SandpackThemeProvider>
    </SandpackProvider>
  );
}
