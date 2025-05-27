import React from 'react';

type LeafIconProps = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

const LeafIcon: React.FC<LeafIconProps> = ({
  width = 31,
  height = 35,
  color = '#1AA24A',
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.7226 20.1875C14.452 20.1911 13.2264 19.7477 12.2888 18.9453C11.3513 18.1429 10.7702 17.0401 10.6609 15.8556C10.5517 14.6711 10.9221 13.4914 11.6988 12.5505C12.4756 11.6096 13.6018 10.9763 14.8543 10.776C18.9787 10.0312 20.064 9.67916 21.5112 8C22.2348 9.35416 22.9583 10.8302 22.9583 13.4167C22.9583 17.1406 19.4996 20.1875 15.7226 20.1875Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21C9 18.8333 10.3809 17.1289 12.7919 16.6667C14.5983 16.32 16.4643 15.2222 17.2108 14.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 28V26C6.73478 26 6.48043 25.8946 6.29289 25.7071C6.10536 25.5196 6 25.2652 6 25V24C6 23.4696 6.21071 22.9609 6.58579 22.5858C6.96086 22.2107 7.46957 22 8 22H10C10.5304 22 11.0391 22.2107 11.4142 22.5858C11.7893 22.9609 12 23.4696 12 24V25C12 25.2652 11.8946 25.5196 11.7071 25.7071C11.5196 25.8946 11.2652 26 11 26"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 28V26H7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeafIcon;
