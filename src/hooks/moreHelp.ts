import { useCallback, useEffect, useRef, useState } from "react";

export function useRefCallback<T extends(...args: any[]) => any>(callback: T) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback((...args: any[]) => callbackRef.current(...args), []) as T;
}

export function useRefState<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>] {
  const [state, setState] = useState<T>(initialValue)
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  return [state, setState, stateRef ]
}
