import React from "react";

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3 3 3M3 3 3 9M3 3 11 11M5 14 5 16.2C5 17.8802 5 18.7202 5.327 19.362 5.6146 19.9265 6.0735 20.3854 6.638 20.673 7.2798 21 8.1198 21 9.8 21L16.2 21C17.8802 21 18.7202 21 19.362 20.673 19.9265 20.3854 20.3854 19.9265 20.673 19.362 21 18.7202 21 17.8802 21 16.2L21 9.8C21 8.1198 21 7.2798 20.673 6.638 20.3854 6.0735 19.9265 5.6146 19.362 5.327 18.7202 5 17.8802 5 16.2 5L14 5"
      />
    </svg>
  );
}

export default ExternalLinkIcon;
