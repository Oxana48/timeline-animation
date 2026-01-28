import React from "react";

interface ArrowSvgProps {
  width?: number;
  height?: number;
  color?: string;
  direction?: "left" | "right";
}

const ArrowSvg: React.FC<ArrowSvgProps> = ({
  width = 24,
  height = 24,
  color = "#010007ff",
  direction = "left",
}) => {
  const getTransform = () => {
    switch (direction) {
      case "right":
        return "rotate(0)";
      case "left":
        return "rotate(180deg)";

      default:
        return "rotate(180deg)";
    }
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8.37128 13.9142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getTransform() }}
    >
      <path
        d="M6.25 12.5L0 6.25L6.25 0"
        stroke={color}
        strokeWidth="2"
        transform="matrix(1,8.58333e-08,8.90417e-08,-1,1.41418,13.2071)"
      />
    </svg>
  );
};

export default ArrowSvg;
