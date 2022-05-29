import React, {useEffect, useState} from 'react'
import isOnline from 'is-online'

export function useHasInternet() {
  const [hasInternet, setHasInternet] = useState(false)
  useEffect(() => {
      console.log({run: "run"});
    (async () => {
      setHasInternet(await isOnline());
    })()
  } );
  console.log({hasInternet})
 return hasInternet
}
