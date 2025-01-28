import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import { Toaster } from "sonner";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DragWindowRegion title="Kronos" />
      <Toaster />
      <hr />
      <main>{children}</main>
    </>
  );
}
