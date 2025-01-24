import useLocalStorageState from "use-local-storage-state";

export function useIsConfigOpen() {
  const [isConfigOpen, setIsConfigOpen] = useLocalStorageState("isConfigOpen", {
    defaultValue: false,
  });

  return {
    isConfigOpen,
    setIsConfigOpen,
  };
}
