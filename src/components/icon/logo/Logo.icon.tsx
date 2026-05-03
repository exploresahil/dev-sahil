import type { SVGProps } from "react";
import { Colors } from "@/utils/colors.utils";

const Logo = ({
  title = "Logo",
  fill = Colors.primary,
  size = 200,
  ...props
}: SVGProps<SVGSVGElement> & {
  title?: string;
  size?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={38.894}
      height={38.894}
      {...props}
    >
      <title>{title}</title>
      <path
        fill={fill}
        d="M0 0v5.5l27.9 27.9-5.5 5.5L0 16.5v11l11.392 11.394h27.5v-5.5L11.014 5.509l5.5-5.5 22.38 22.38v-11L27.5 0Z"
        data-name="sLogo"
      />
    </svg>
  );
};

export default Logo;
