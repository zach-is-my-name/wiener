import React, {useEffect, useState} from 'react'
import isReachable from 'is-reachable'

export function useHasInternet() {
  const [hasInternet, setHasInternet] = useState("loading")

  useEffect(() => {
    (async () => {
      setHasInternet(await isReachable('https://weekinethereumnews.com'));
    })()
  });
  
 return hasInternet
}
