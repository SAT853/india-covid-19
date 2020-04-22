import React from "react";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
const ScrollButton = () => {
  return (
    <div>
      <ScrollUpButton
        EasingType="easeInQuad"
        ShowAtPosition={100}
        AnimationDuration={1000}
      />
    </div>
  );
};

export default ScrollButton;
