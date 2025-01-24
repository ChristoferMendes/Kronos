import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, TrashIcon } from "lucide-react";
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PopoverClose } from "@radix-ui/react-popover";

export interface RecordingType {
  id: string;
  name: string;
  color: string;
}

export function RecordingTypeManager() {
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeColor, setNewTypeColor] = useState("#000000");
  const { createRecord, recordingTypes: types, deleteRecord } = useGetRecordingTypes();

  const handleAddType = () => {
    createRecord({
      color: newTypeColor,
      label: newTypeName,
    });
  };

  const canAdd = newTypeName && newTypeName;

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <Plus className="mr-2 h-4 w-4" /> Adicionar Tipo
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Novo Tipo de Gravação</h4>
              <p className="text-sm text-muted-foreground">Crie um novo tipo de gravação com nome e cor personalizados.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={newTypeName} onChange={(e) => setNewTypeName(e.target.value)} placeholder="Ex: Daily" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Cor</Label>
              <Input id="color" type="color" value={newTypeColor} onChange={(e) => setNewTypeColor(e.target.value)} />
            </div>
            <PopoverClose asChild>
              <Button onClick={handleAddType} disabled={!canAdd}>
                Add
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
      <div className="mt-4 space-y-2">
        {types?.map((type) => (
          <div
            key={type.label}
            className="flex items-center space-x-2 rounded p-2"
            style={{ backgroundColor: type.color + "20" }}
          >
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: type.color }} />
            <span>{type.label}</span>
            <div className={"flex flex-1 items-center justify-end"}>
              <Dialog>
                <DialogTrigger>
                  <TrashIcon className="h-4 w-4 cursor-pointer rounded-full" />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Delete {type.label}</DialogTitle>
                  <DialogDescription>Are you sure you want to delete the {type.label} type?</DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"}>No</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={() => deleteRecord(type.label)}>Yes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
