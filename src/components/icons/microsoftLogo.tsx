import { SVGAttributes } from "react";

const MicrosoftLogo = ({ height, width }: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width={width || "60"}
      height={height || "60"}
      viewBox="0 0 60 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50.625 32.3887H31.875V51.1387H50.625V32.3887Z" fill="#FEBA08" />
      <path d="M28.125 32.3887H9.375V51.1387H28.125V32.3887Z" fill="#05A6F0" />
      <path d="M50.625 9.8887H31.875V28.6387H50.625V9.8887Z" fill="#80BC06" />
      <path d="M28.125 9.8887H9.375V28.6387H28.125V9.8887Z" fill="#F25325" />
    </svg>
  );
};

export default MicrosoftLogo;
