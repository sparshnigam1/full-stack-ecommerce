import { SVGAttributes } from "react";

const PencilLineIcon = ({
  height,
  width,
  color,
  ...props
}: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width={width || "15"}
      height={height || "15"}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.22876 13.3918H13.75M8.76301 2.10988L1.85937 9.36129C1.35405 9.89211 0.955081 10.5364 0.833625 11.2761C0.710987 12.0229 0.670172 12.9498 1.09098 13.3918C1.51178 13.8339 2.3942 13.791 3.10526 13.6621C3.80949 13.5346 4.42287 13.1155 4.92819 12.5847L11.8318 5.33329M8.76301 2.10988C8.76301 2.10988 11.0646 -0.307683 12.599 1.30402C14.1334 2.91573 11.8318 5.33329 11.8318 5.33329M8.76301 2.10988L11.8318 5.33329"
        stroke={color || "#AAAAAA"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PencilLineIcon;
