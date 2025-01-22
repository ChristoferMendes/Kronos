import RLSkeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

type SkeletonProps = React.ComponentProps<typeof RLSkeleton>;

export function Skeleton(props: SkeletonProps) {
  return (
    <SkeletonTheme baseColor="#7a7a7a" highlightColor="#9e9e9e">
      <RLSkeleton {...props} />
    </SkeletonTheme>
  );
}
