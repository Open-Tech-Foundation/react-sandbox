import { useState } from 'react';
import { Console } from 'console-feed';
import type { Message } from 'console-feed/lib/definitions/Component';
import {
  useSandpack,
  useSandpackConsole,
  useSandpackShellStdout,
} from '@codesandbox/sandpack-react';
import stripAnsi from 'strip-ansi';

function LogsContainer() {
  const {
    sandpack: { environment },
  } = useSandpack();
  const [tab, setTab] = useState(environment === 'node' ? 'Server' : 'Client');
  const { logs: shellLogs, reset: shellReset } = useSandpackShellStdout({
    resetOnPreviewRestart: true,
    clientId: undefined,
  });
  const { logs: clientLogs, reset: clientReset } = useSandpackConsole({
    showSyntaxError: true,
    resetOnPreviewRestart: true,
  });
  const logs =
    tab === 'Server'
      ? shellLogs.map((o) => ({
          id: o.id,
          data: [stripAnsi(o.data)],
          method: 'log',
        }))
      : clientLogs;
  const reset = tab === 'Server' ? shellReset : clientReset;
  const getTabStyles = (tabName: string) => {
    const styles = {
      background: tabName === tab ? '#0074D9' : '#AAAAAA',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '15px',
      border: '0',
      padding: '5px 10px',
      marginRight: '5px',
      cursor: 'pointer',
    };

    return styles;
  };

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          background: '#151515',
          padding: '8px',
          height: '35px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg style={{ width: '20px', height: '20px', fill: 'gray' }}>
            <path d="M5.65871 3.62037C5.44905 3.44066 5.1334 3.46494 4.95368 3.6746C4.77397 3.88427 4.79825 4.19992 5.00792 4.37963L5.65871 3.62037ZM5.00792 11.6204C4.79825 11.8001 4.77397 12.1157 4.95368 12.3254C5.1334 12.5351 5.44905 12.5593 5.65871 12.3796L5.00792 11.6204ZM9.9114 7.92407L10.2368 7.54445L9.9114 7.92407ZM5.00792 4.37963L9.586 8.3037L10.2368 7.54445L5.65871 3.62037L5.00792 4.37963ZM9.586 7.6963L5.00792 11.6204L5.65871 12.3796L10.2368 8.45555L9.586 7.6963ZM9.586 8.3037C9.39976 8.14407 9.39976 7.85594 9.586 7.6963L10.2368 8.45555C10.5162 8.2161 10.5162 7.7839 10.2368 7.54445L9.586 8.3037Z" />
            <path d="M10 11.5C9.72386 11.5 9.5 11.7239 9.5 12C9.5 12.2761 9.72386 12.5 10 12.5V11.5ZM14.6667 12.5C14.9428 12.5 15.1667 12.2761 15.1667 12C15.1667 11.7239 14.9428 11.5 14.6667 11.5V12.5ZM10 12.5H14.6667V11.5H10V12.5Z" />
          </svg>
          <span style={{ color: 'gray' }}>Terminal</span>
        </div>
        <div>
          <button
            style={getTabStyles('Client')}
            onClick={() => setTab('Client')}
          >
            Client
          </button>
          <button
            style={getTabStyles('Server')}
            onClick={() => setTab('Server')}
          >
            Server
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#242424',
          padding: '10px',
          overflow: 'auto',
          height: 'calc(100% - 35px)',
          boxSizing: 'border-box',
        }}
      >
        <Console logs={logs as Message[]} variant="dark" />
        <button
          title="Clear"
          onClick={reset}
          style={{
            borderRadius: '50%',
            position: 'absolute',
            right: '20px',
            bottom: '15px',
            border: '0px',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            padding: '0px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg
            style={{ margin: 'auto', width: '20px', fill: 'white' }}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ClearAllOutlinedIcon"
          >
            <path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export { LogsContainer };
