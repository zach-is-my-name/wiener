import React, {useEffect, useState} from 'react'
import isOnline from 'is-online'
import isReachable from 'is-reachable'



export function useHasInternet() {
  const [hasInternet, setHasInternet] = useState("loading")
  const [wienIsReachable, setWienIsReachable] = useState("loading")
  useEffect(() => {
    (async () => {
      setHasInternet(await isOnline() && await isReachable('https://weekinethereumnews.com') );
    })()
  } );
  
 return hasInternet
}
