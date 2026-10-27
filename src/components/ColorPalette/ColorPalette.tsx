type ColorPaletteProbs = {
  colors: string[];
};

export default function ColorPalette({ colors }: ColorPaletteProbs) {
  return (
    <ul className="palette">
      {colors.map((color, index) => (
        <li
          key={`${color}-${index}`}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </ul>
  );
}
