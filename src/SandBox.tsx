import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
  SandpackConsole,
} from '@codesandbox/sandpack-react';
import Tabs from './Tabs';

interface Props {
  code: string;
  deps?: string[];
  files?: Record<string, string>;
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts';
  cdns?: string[];
}

function getDefaultTemplateFile(code: string, template: string) {
  const templateFile: Record<string, string> = {
    react: '/App.js',
    'react-ts': '/App.tsx',
    vanilla: '/index.js',
    'vanilla-ts': '/index.ts',
  };
  const key = templateFile[template];

  return {
    [key as string]: code,
  };
}

export default function SandBox(props: Props) {
  const { deps = [], code, files, template = 'react', cdns = [] } = props;
  const sandboxFiles = { ...getDefaultTemplateFile(code, template), ...files };

  const sandboxDeps: Record<string, string> = {};
  deps.forEach((d) => (sandboxDeps[d] = 'latest'));

  return (
    <SandpackProvider
      template={template}
      options={{ externalResources: cdns }}
      theme="dark"
      files={sandboxFiles}
      customSetup={{
        dependencies: sandboxDeps,
      }}
    >
      <Tabs
        labels={['CODE', 'PREVIEW', 'CONSOLE']}
        panels={[
          <SandpackLayout>
            <SandpackCodeEditor showInlineErrors showLineNumbers showTabs />
          </SandpackLayout>,
          <SandpackPreview />,
          <SandpackConsole standalone resetOnPreviewRestart />,
        ]}
      />
    </SandpackProvider>
  );
}
