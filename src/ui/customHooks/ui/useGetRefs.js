import {useRef} from 'react'


export function useGetRefs () {
  const mainBoxRef = useRef(null)
  const scrollToScrollHeightFlagRef = useRef(false)
  const cursorRef = useRef(null)
  const linkBoxRef = useRef(null) 
  return [{mainBoxRef, scrollToScrollHeightFlagRef, cursorRef, linkBoxRef}]
}
