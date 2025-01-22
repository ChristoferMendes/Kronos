import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { PlusIcon } from "lucide-react";
import { AddSourceDialogContent } from "./AddSourceDialogContent";

export function AddSourceDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <AddSourceDialogContent />
      </DialogContent>
    </Dialog>
  );
}
