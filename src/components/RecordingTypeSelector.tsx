import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusCircle, Video } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useDisclosure } from "@/hooks/useDisclosure"
import { useGetRecordingTypes } from "@/hooks/useGetRecordingTypes"
import { RecordingTypeItem } from "./RecordingTypeItem"
import { RecordingType } from "@/types/recording-types.types"

export function RecordingTypeSelector() {
  const {
    recordingTypes,
    selectedType,
    createRecord,
    selectType,
    updateRecord,
    deleteRecord,
  } = useGetRecordingTypes()
  const [newTypeName, setNewTypeName] = useState("")
  const [newTypeColor, setNewTypeColor] = useState("#000000")
  const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose, onChange: onDialogChange } = useDisclosure()
  const { isOpen: isDropdownOpen, onClose: onDropdownClose, onChange: onDropdownChange } = useDisclosure()

  function handleCreateRecordingType() {
    createRecord({ label: newTypeName, color: newTypeColor })
    setNewTypeName("")
    setNewTypeColor("#000000")
    onDialogClose()
  }

  function handleEditRecordingType(old: RecordingType, updatedType: RecordingType) {
    updateRecord(old.label, updatedType)
    const isSameTypeAsSelected = old.label === selectedType?.label
    if (isSameTypeAsSelected) {
      selectType(updatedType)
    }
  }

  function handleDeleteRecordingType(recordingType: RecordingType) {
    deleteRecord(recordingType.label)
    onDropdownClose()
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={onDropdownChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-start">
            <div className="flex flex-1 items-center">
              <Video className="mr-2 h-4 w-4" color={selectedType?.color ?? "white"} />
              <span>{selectedType?.label ?? "Select Recording Type"}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Recording Types</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {recordingTypes.map((type) => (
            <RecordingTypeItem
              key={type.label}
              recordingType={type}
              onSelect={selectType}
              onEdit={handleEditRecordingType}
              onDelete={handleDeleteRecordingType}
            />
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
              onDropdownClose()
              onDialogOpen()
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Recording Type</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Recording Type</DialogTitle>
            <DialogDescription>Add a new type to categorize your recordings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                placeholder="Ex: Tutorial"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Input 
                id="color" 
                type="color" 
                value={newTypeColor} 
                onChange={(e) => setNewTypeColor(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onDialogClose}>
              Cancel
            </Button>
            <Button onClick={handleCreateRecordingType}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

