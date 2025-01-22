import {  useState } from "react";
import { RecordingType } from "@/types/recording-types.types";

const key = "record-types";
export function useRecordingTypes() {
  const [recordingTypes, setRecordingTypes] = useState<RecordingType[]>(() => {
    const records = localStorage.getItem(key);
    return records ? JSON.parse(records) : [];
  });

  function set(value: RecordingType) {
    const newRecordingTypes = [...recordingTypes, value];
    localStorage.setItem(key, JSON.stringify(newRecordingTypes));
    setRecordingTypes(newRecordingTypes);
  }

  function remove(label: string) {
    const newRecordingTypes = recordingTypes.filter((record) => record.label !== label);
    localStorage.setItem(key, JSON.stringify(newRecordingTypes));
    setRecordingTypes(newRecordingTypes);
  }

  return {
    recordingTypes,
    setRecordingTypes: set,
    removeRecordingTypes: remove
  }
}