import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import valtio from "../stores/index.js";

const ColorPicker = () => {
  const snap = useSnapshot(valtio);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (valtio.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
