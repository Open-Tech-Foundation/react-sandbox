import { useState } from 'react';

interface Props {
  labels: string[];
  panels: JSX.Element[];
  style: Record<string, string>;
  tabIndex?: number | undefined;
}

export default function Tabs({ tabIndex, labels, panels, style }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(tabIndex || 0);
  const getStyles = (i: number) => {
    const styles: Record<string, string> = {
      background: i === selectedIndex ? '#0074D9' : '#AAAAAA',
      color: 'white',
      padding: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
    };
    if (selectedIndex === 0 && i == 1) {
      styles['borderLeft'] = styles['borderTop'] = styles['borderBottom'] = '0';
      styles['borderRight'] = '1px solid gray';
    } else if (selectedIndex === 2 && i == 1) {
      styles['borderRight'] =
        styles['borderTop'] =
        styles['borderBottom'] =
          '0';
      styles['borderLeft'] = '1px solid gray';
    } else {
      styles['border'] = '0';
    }
    return styles;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {labels.map((l, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            style={getStyles(i)}
          >
            {l}
          </button>
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          height: `calc(${style['height']} - 50px`,
        }}
      >
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
              height: '100%',
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
