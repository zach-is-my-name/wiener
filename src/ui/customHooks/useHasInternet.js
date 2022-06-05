import React, {useEffect, useState} from 'react'
import isOnline from 'is-online'

export function useHasInternet() {
  const [hasInternet, setHasInternet] = useState("loading")
  useEffect(() => {
    (async () => {
      setHasInternet(await isOnline());
    })()
  } );
 return hasInternet
}
