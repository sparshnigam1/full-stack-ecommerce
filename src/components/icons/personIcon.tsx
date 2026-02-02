import { SVGAttributes } from "react";

const PersonIcon = ({
  height,
  width,
  color,
  ...props
}: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width={width || "21"}
      height={height || "26"}
      viewBox="0 0 21 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.2057 10.2083C12.7831 10.2083 14.8724 8.119 14.8724 5.54167C14.8724 2.96434 12.7831 0.875 10.2057 0.875C7.6284 0.875 5.53906 2.96434 5.53906 5.54167C5.53906 8.119 7.6284 10.2083 10.2057 10.2083Z"
        stroke={color || "#1F1F1F"}
        strokeWidth="1.75"
      />
      <path
        d="M19.5387 19.5417C19.5417 19.3501 19.5417 19.1555 19.5417 18.9584C19.5417 16.0589 15.363 13.7084 10.2083 13.7084C5.05367 13.7084 0.875 16.0589 0.875 18.9584C0.875 21.8579 0.875 24.2084 10.2083 24.2084C12.8112 24.2084 14.6881 24.0256 16.0417 23.699"
        stroke={color || "#1F1F1F"}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PersonIcon;
