import { SVGAttributes } from "react";

const DeleteIcon = ({
  height,
  width,
  color,
  ...props
}: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width={width || "20"}
      height={height || "20"}
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 11.5V17.3333"
        stroke={color || "#AAAAAA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.668 11.5V17.3333"
        stroke={color || "#AAAAAA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 5.66669H19.6667"
        stroke={color || "#AAAAAA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33398 9.16669V18.5C3.33398 20.4331 4.90099 22 6.83398 22H13.834C15.767 22 17.334 20.4331 17.334 18.5V9.16669"
        stroke={color || "#AAAAAA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.83398 3.33333C6.83398 2.04467 7.87865 1 9.16732 1H11.5007C12.7894 1 13.834 2.04467 13.834 3.33333V5.66667H6.83398V3.33333Z"
        stroke={color || "#AAAAAA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;
