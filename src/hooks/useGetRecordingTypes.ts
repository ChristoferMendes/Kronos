import useLocalStorageState from 'use-local-storage-state'
import type { RecordingType } from "@/types/recording-types.types";
import { toast } from "sonner";

const key = "getRecordingTypes";
const selectedKey = "selectedRecordingType";

export function useGetRecordingTypes() {
  const [recordingTypes, setRecordingTypes] = useLocalStorageState<RecordingType[]>(key, {
    defaultValue: [],
  });
  const [selectedRecording, setSelectedRecording] = useLocalStorageState<string>(selectedKey)

  function createRecord(recordingType: RecordingType) {
    const existingRecordingType = recordingTypes.find((item) => item.label === recordingType.label);
    if (existingRecordingType) {
      toast.error("Recording type already exists");
      return;
    }

    setRecordingTypes(prev => [...prev, recordingType]);
  }

  function deleteRecord(label: string) {
    const isSelected = label === selectedRecording;

    if (isSelected) {
      setSelectedRecording(undefined)
    }

    const newRecordingType = recordingTypes.filter((recordingType) => recordingType.label !== label);

    setRecordingTypes(newRecordingType);
  }


  return {
    createRecord,
    deleteRecord,
    recordingTypes,
    setSelectedRecording,
    selectedRecording,
  };
}
