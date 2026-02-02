import { SVGAttributes } from "react";

const BellIcon = ({
  height,
  width,
  color,
  ...props
}: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width={width || "26"}
      height={height || "26"}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.0221 3.15234C9.4363 3.15234 6.52213 6.06651 6.52213 9.65234V12.7832C6.52213 13.444 6.24046 14.4515 5.90463 15.0148L4.65879 17.084C3.88963 18.3623 4.42046 19.7815 5.82879 20.2582C10.498 21.8182 15.5355 21.8182 20.2046 20.2582C21.5155 19.8248 22.0896 18.2757 21.3746 17.084L20.1288 15.0148C19.8038 14.4515 19.5221 13.444 19.5221 12.7832V9.65234C19.5221 6.07734 16.5971 3.15234 13.0221 3.15234Z"
        stroke={color || "#C4161C"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M15.0259 3.46656C14.6901 3.36906 14.3434 3.29323 13.9859 3.2499C12.9459 3.1199 11.9492 3.19573 11.0176 3.46656C11.3317 2.6649 12.1117 2.10156 13.0217 2.10156C13.9317 2.10156 14.7117 2.6649 15.0259 3.46656Z"
        stroke={color || "#C4161C"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2715 20.6484C16.2715 22.4359 14.809 23.8984 13.0215 23.8984C12.1332 23.8984 11.3098 23.5301 10.7248 22.9451C10.1398 22.3601 9.77148 21.5368 9.77148 20.6484"
        stroke={color || "#C4161C"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default BellIcon;
