type ColorPaletteProps = {
  colors: string[];
};

export default function ColorPalette({ colors }: ColorPaletteProps) {
  const paletteStyle = {
    "--palette-gradient": `linear-gradient(120deg, ${colors.join(", ")})`,
  } as React.CSSProperties;

  return (
    <div className="art-palette">
      <div
        className="palette-blend"
        style={paletteStyle}
        aria-label="Blended artwork color palette"
      />

      <ul className="palette">
        {colors.map((color, index) => (
          <li
            key={`${color}-${index}`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </ul>
    </div>
  );
}