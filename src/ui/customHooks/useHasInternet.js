import React, {useEffect, useState} from 'react'
import isOnline from 'is-online'

export function useHasInternet() {
  const [hasInternet, setHasInternet] = useState(false)

  useEffect(() => {
    (async () => {
      const hasInternet = await isOnline();
      setHasInternet(hasInternet);
    })()
  }, []);

 return hasInternet
}
