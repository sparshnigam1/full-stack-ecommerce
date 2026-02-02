import { SVGAttributes } from "react";

const MenuIcon = ({
  height,
  width,
  color,
  ...props
}: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width={width || "16"}
      height={height || "10"}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 0.5H15.5M0.5 5H9.875M0.5 9.5H5.1875"
        stroke={color || "#1F1F1F"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
