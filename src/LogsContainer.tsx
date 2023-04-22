import { Console } from 'console-feed';
import type { Message } from 'console-feed/lib/definitions/Component';
import { useSandpackConsole } from '@codesandbox/sandpack-react';

const LogsContainer = () => {
  const { logs, reset } = useSandpackConsole({
    showSyntaxError: true,
    resetOnPreviewRestart: true,
  });

  return (
    <div
      style={{
        backgroundColor: '#242424',
        height: '100%',
        padding: '15px',
        overflow: 'auto',
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
  );
};

export { LogsContainer };
