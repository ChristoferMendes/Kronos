import { useEffect, useRef, useState } from "react";

export function useRecordingTime(isRecording: boolean) {
  const [counter, setCounter] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  function clearInterval() {
    if (!interval.current) return;

    clearTimeout(interval.current);
    interval.current = null;
  }

  function startCounter() {
    const intervalId = setInterval(() => setCounter((prev) => prev + 1), 1000);

    interval.current = intervalId;
  }

  function resetCounter() {
    setCounter(0);
  }

  useEffect(() => {
    if (!isRecording) {
      resetCounter();
      clearInterval();
      return;
    }

    startCounter();

    return () => {
      clearInterval();
    };
  }, [isRecording]);

  return {
    counter,
  };
}
