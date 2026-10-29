import { useState  } from "react";

type ColorPaletteProbs = {
  colors: string[];
};

export default function ColorPalette({ colors }: ColorPaletteProbs) {
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





  return (
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
  );
}
