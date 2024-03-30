import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
  SandpackConsole,
  SandpackPredefinedTemplate,
  SandpackThemeProp,
} from '@codesandbox/sandpack-react';
import Tabs from './Tabs';
import { LogsContainer } from './LogsContainer';
import SplitPanel from './SplitPanel';

interface Props {
  code: string;
  layout?: 'Default' | 'Tabs' | 'Code_Console';
  consoleType?: 'Basic' | 'Advanced';
  tabIndex?: number;
  deps?: string[];
  files?: Record<string, string>;
  template?: SandpackPredefinedTemplate;
  cdns?: string[];
  style?: Record<string, string>;
  theme?: SandpackThemeProp;
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
    consoleType = 'Basic',
    layout = 'Default',
    theme = 'auto',
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
  deps.forEach((d) => {
    const match = d.match(/(?:(@.+\/))?(.+)/);
    if (match) {
      const org = match[1] || '';
      const [pkgName, ver] = (match[2] || '').split('@');
      sandboxDeps[org + pkgName] = ver || 'latest';
    }
  });

  const renderByLayout = () => {
    switch (layout) {
      case 'Tabs':
        return (
          <Tabs
            tabIndex={tabIndex}
            style={styles}
            labels={['CODE', 'PREVIEW', 'CONSOLE']}
            theme={theme === 'dark' ? 'dark' : 'light'}
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
              consoleType === 'Basic' ? (
                <SandpackConsole
                  showSyntaxError
                  resetOnPreviewRestart
                  style={{ height: '100%' }}
                />
              ) : (
                <LogsContainer />
              ),
            ]}
          />
        );
      case 'Code_Console':
        return (
          <SandpackLayout style={{ height: '100%' }}>
            <SandpackPreview style={{ display: 'none' }} />
            <SplitPanel
              left={
                <SandpackCodeEditor
                  showInlineErrors
                  showLineNumbers
                  showTabs
                  showRunButton
                  style={{ height: '100%' }}
                />
              }
              right={
                consoleType === 'Basic' ? (
                  <SandpackConsole
                    showSyntaxError
                    resetOnPreviewRestart
                    style={{ height: '100%' }}
                  />
                ) : (
                  <LogsContainer />
                )
              }
            />
          </SandpackLayout>
        );
      default:
        return (
          <SandpackLayout style={{ height: '100%' }}>
            <SplitPanel
              left={
                <SandpackCodeEditor
                  showInlineErrors
                  showLineNumbers
                  showTabs
                  showRunButton
                  style={{ height: '100%' }}
                />
              }
              right={
                <SandpackPreview showNavigator style={{ height: '100%' }} />
              }
            />
          </SandpackLayout>
        );
    }
  };

  return (
    <div style={styles}>
      <SandpackProvider
        style={{ height: '100%' }}
        template={template}
        options={{ externalResources: cdns }}
        theme={theme}
        files={sandboxFiles}
        customSetup={{
          dependencies: sandboxDeps,
        }}
      >
        {renderByLayout()}
      </SandpackProvider>
    </div>
  );
}
