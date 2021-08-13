import { useContext, useState } from "react";
import { BlockPicker } from "react-color";

export default function Name({ backgroundColor }) {
  console.log(backgroundColor);
  const [bgColor, setBgColor] = useState(backgroundColor);
  const handleChangeComplete = (color) => {
    setBgColor(color);
  };
  return (
    <main>
      <BlockPicker color={bgColor} onChangeComplete={handleChangeComplete} />
    </main>
  );
}
