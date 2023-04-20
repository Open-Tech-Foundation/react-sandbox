import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
  SandpackConsole,
  SandpackPredefinedTemplate,
} from '@codesandbox/sandpack-react';
import Tabs from './Tabs';

interface Props {
  code: string;
  tabIndex?: number;
  deps?: string[];
  files?: Record<string, string>;
  template?: SandpackPredefinedTemplate;
  cdns?: string[];
  style?: Record<string, string>;
}

function getDefaultTemplateFile(code: string, template: string) {
  const templateFile: Record<string, string> = {
    react: '/App.js',
    'react-ts': '/App.tsx',
    vanilla: '/index.js',
    'vanilla-ts': '/index.ts',
    static: '/index.html',
    nextjs: 'pages/index.js',
    node: '/index.js',
    vite: '/index.js',
    'vite-react': '/App.jsx',
    'vite-react-ts': '/App.tsx',
  };
  const key = templateFile[template];

  if (!key) {
    return {};
  }

  return {
    [key as string]: code,
  };
}

export default function SandBox(props: Props) {
  const {
    tabIndex,
    deps = [],
    code,
    files,
    template = 'react',
    cdns = [],
    ...otherProps
  } = props;
  const sandboxFiles = { ...getDefaultTemplateFile(code, template), ...files };
  const defaultStyles = {
    height: '350px',
  };

  const styles = {
    ...defaultStyles,
    ...otherProps.style,
  };

  const sandboxDeps: Record<string, string> = {};
  deps.forEach((d) => (sandboxDeps[d] = 'latest'));

  return (
    <div style={styles}>
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
          tabIndex={tabIndex}
          style={styles}
          labels={['CODE', 'PREVIEW', 'CONSOLE']}
          panels={[
            <SandpackLayout style={{ height: '100%' }}>
              <SandpackCodeEditor
                showInlineErrors
                showLineNumbers
                showTabs
                showRunButton
                style={{ height: '100%' }}
              />
            </SandpackLayout>,
            <SandpackPreview showNavigator style={{ height: '100%' }} />,
            <SandpackConsole
              showSyntaxError
              resetOnPreviewRestart
              style={{ height: '100%' }}
            />,
          ]}
        />
      </SandpackProvider>
    </div>
  );
}
