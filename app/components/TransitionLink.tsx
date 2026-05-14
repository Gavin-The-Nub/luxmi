"use client";

import { Link } from "next-transition-router";
import { ComponentProps, forwardRef } from "react";

/**
 * TransitionLink
 * ==============
 * A drop-in replacement for next/link that integrates with our
 * page transition system.
 */

type TransitionLinkProps = ComponentProps<typeof Link>;

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink(props, ref) {
    return <Link ref={ref} {...props} />;
  }
);

export default TransitionLink;
