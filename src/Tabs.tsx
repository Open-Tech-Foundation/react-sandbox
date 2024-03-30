import { CSSProperties, useState } from 'react';

interface Props {
  labels: string[];
  panels: JSX.Element[];
  style: Record<string, string>;
  tabIndex?: number | undefined;
  theme: 'light' | 'dark';
}

export default function Tabs({
  tabIndex,
  labels,
  panels,
  style,
  theme,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(tabIndex || 0);
  const getStyles = (i: number) => {
    const bgColor = theme === 'dark' ? 'rgb(23, 26, 28)' : 'rgb(240, 244, 248)';
    const bgColorSelected =
      theme === 'dark' ? 'rgb(85, 94, 104)' : 'rgb(205, 215, 225)';
    const textColor =
      theme === 'dark' ? 'rgb(221, 231, 238)' : 'rgb(50, 56, 62)';
    const textColorSelected =
      theme === 'dark' ? 'rgb(240, 244, 248)' : 'rgb(23, 26, 28)';
    const borderBottomColor =
      theme === 'dark' ? 'rgb(240, 244, 248)' : 'rgb(23, 26, 28)';
    const styles: CSSProperties = {
      backgroundColor: i === selectedIndex ? bgColorSelected : bgColor,
      color: i === selectedIndex ? textColorSelected : textColor,
      padding: '6px',
      fontSize: '12px',
      fontWeight: i === selectedIndex ? 'bold' : undefined,
      cursor: 'pointer',
      border: 0,
    };

    styles['borderBottom'] =
      i === selectedIndex ? `2px solid ${borderBottomColor}` : '0px';

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
              top: 5,
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
