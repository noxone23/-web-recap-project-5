import { useState  } from "react";

type ColorPaletteProps = {
  colors: string[];
};

export default function ColorPalette({ colors }: ColorPaletteProps) {
  const[copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const handleCopy = async (color: string, index: number) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Fehler beim Kopieren: ", error)
    }
  };





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
        {colors.map((color, index) => {
        const isCopied = copiedIndex === index;

        return (
          <li
            key={`${color}-${index}`} onClick={() => handleCopy(color, index)}>

            <div className="palette-circle"
              style={{ backgroundColor: color }}
              title="Click to copy Hex code"
          />
        <span className={isCopied ? "palette-hex-copied" : "palette-hex"}>
          {isCopied ? "Copied!" : color}

        </span>
        </li>
          )
      })}
      </ul>
    </div>
  );
}