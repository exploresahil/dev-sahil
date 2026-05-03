"use client";

import type { Route } from "next";
import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { usePageTransitionContext } from "../pageTransition/PageTransition.context";

type TransitionLinkProps = Omit<LinkProps<string>, "href"> & {
  href: Route | LinkProps<string>["href"];
  children: ReactNode;
  className?: string;
  id?: string;
};

const TransitionLink = ({ href, children, ...rest }: TransitionLinkProps) => {
  const { navigateTo } = usePageTransitionContext();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        rest.onClick?.(e);
        navigateTo(href);
      }}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
