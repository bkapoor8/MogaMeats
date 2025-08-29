import { IconProps } from "./IconProps";

export const BellIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`h-auto ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 0 0 5.093-1.017 8.967 8.967 0 0 1-1.32-4.682V9a6.375 6.375 0 1 0-12.75 0v2.383c0 1.646-.47 3.263-1.32 4.682 1.614.59 3.315.99 5.093 1.017m5.204 0a6.375 6.375 0 0 1-10.408 0m10.408 0H9.653"
    />
  </svg>
);
