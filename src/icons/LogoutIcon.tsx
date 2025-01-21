import React from "react";

function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(180)"
      {...props}
    >
      <path
        d="M7 4C7.55228 4 8 3.55228 8 3C8 2.44772 7.55228 2 7 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H7C7.55228 22 8 21.5523 8 21C8 20.4477 7.55228 20 7 20H4V4H7Z"
        fill="currentColor"
      />
      <path
        d="M21.7071 12.7071L16.7071 17.7071C16.3166 18.0976 15.6834 18.0976 15.2929 17.7071C14.9024 17.3166 14.9024 16.6834 15.2929 16.2929L18.5858 13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44771 11 8 11H18.5858L15.2929 7.70711C14.9024 7.31658 14.9024 6.68342 15.2929 6.29289C15.6834 5.90237 16.3166 5.90237 16.7071 6.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default LogoutIcon;
