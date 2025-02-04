import { useState } from "react";

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onToggle() {
    setIsOpen(!isOpen);
  }

  function onChange(isOpen: boolean) {
    setIsOpen(isOpen);
  }

  return { isOpen, onOpen, onClose, onToggle, onChange };
}
