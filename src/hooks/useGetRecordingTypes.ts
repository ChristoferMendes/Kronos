import useLocalStorageState from 'use-local-storage-state'
import type { RecordingType } from "@/types/recording-types.types";
import { toast } from "sonner";

const key = "getRecordingTypes";
const selectedKey = "selectedRecordingType";

export function useGetRecordingTypes() {
  const [recordingTypes, setRecordingTypes] = useLocalStorageState<RecordingType[]>(key, {
    defaultValue: [],
  });
  const [selectedType, setSelectedType] = useLocalStorageState<RecordingType | null>(selectedKey, {
    defaultValue: null,
  })

  function createRecord(recordingType: RecordingType) {
    const existingRecordingType = recordingTypes.find((item) => item.label === recordingType.label);
    if (existingRecordingType) {
      toast.error("Recording type already exists");
      return;
    }

    setRecordingTypes(prev => [...prev, recordingType]);
  }

  function deleteRecord(label: string) {
    const isSelected = label === selectedType?.label;

    if (isSelected) {
      setSelectedType(null)
    }

    const newRecordingType = recordingTypes.filter((recordingType) => recordingType.label !== label);

    setRecordingTypes(newRecordingType);
  }

  function selectType(type: RecordingType) {
    setSelectedType(type);
  }

  function updateRecord(label: string, updatedType: RecordingType) {
    const updatedRecordingTypes = recordingTypes.map((recordingType) =>
      recordingType.label === label ? updatedType : recordingType
    );
    setRecordingTypes(updatedRecordingTypes);
  }

  return {
    createRecord,
    deleteRecord,
    recordingTypes,
    selectedType,
    selectType,
    updateRecord,
  };
}
