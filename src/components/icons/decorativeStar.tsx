import { SVGAttributes } from "react";

const DecorativeStar = ({
  height,
  width,
  ...props
}: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width={width || "75"}
      height={height || "75"}
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.1"
        d="M37.8311 26.6465C37.9898 32.3907 42.6093 37.0102 48.3535 37.1689L60.3447 37.5L48.3535 37.8311C42.6093 37.9898 37.9898 42.6093 37.8311 48.3535L37.5 60.3447L37.1689 48.3535C37.0102 42.6093 32.3907 37.9898 26.6465 37.8311L14.6543 37.5L26.6465 37.1689C32.3907 37.0102 37.0102 32.3907 37.1689 26.6465L37.5 14.6543L37.8311 26.6465Z"
        stroke="#1F1F1F"
        strokeWidth="0.808825"
      />
    </svg>
  );
};

export default DecorativeStar;
