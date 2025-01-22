import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import NavigationMenu from "@/components/NavigationMenu";
import { Toaster } from "sonner";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DragWindowRegion title="electron-shadcn" />
      <Toaster />
      {/*<NavigationMenu />*/}
      <hr />
      <main>{children}</main>
    </>
  );
}
