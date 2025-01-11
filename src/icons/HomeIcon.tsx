import React from "react";

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M 26.2 29.49 C 26.7 29.49 27.2 28.99 27.2 28.49 V 17.79 H 29.8 H 29.8 C 31 17.79 32 15.79 30.9 14.69 L 27.5 11.79 V 6.89 C 27.5 6.39 27 5.89 26.5 5.89 H 24.3 C 23.8 5.89 23.3 6.39 23.3 6.89 V 8.19 L 17.3 2.89 C 16.6 2.39 15.7 2.39 15 2.89 L 1.3 14.79 C 0 15.79 1 17.79 2.4 17.89 H 5.1 V 28.49 C 5.1 28.99 5.6 29.49 6.1 29.49 H 11.9 V 21.69 C 11.9 20.69 12.9 19.69 13.9 19.69 H 18.3 C 19.3 19.69 20.3 20.69 20.3 21.69 V 29.49 H 26.2 Z" />
    </svg>
  );
}

export default HomeIcon;
