import { useState } from 'react';

interface Props {
  labels: string[];
  panels: JSX.Element[];
}

export default function Tabs({ labels, panels }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {labels.map((l, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            style={{
              background: i === selectedIndex ? '#0074D9' : '#AAAAAA',
              color: 'white',
              padding: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: '0',
              cursor: 'pointer',
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div style={{ position: 'relative' }}>
        {panels.map((p, i) => (
          <div
            key={i}
            style={{
              visibility: selectedIndex === i ? 'visible' : 'hidden',
              position: 'absolute',
              top: 10,
              left: 0,
              width: '100%',
              border: '1px solid gray',
              borderRadius: '5px',
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
