import {useRef} from 'react'


export function useGetRefs () {
  const mainBoxRef = useRef(null)
  const scrollToScrollHeightFlagRef = useRef(false)
  const scrollToZeroFlagRef = useRef(false)
  const cursorRef = useRef(null)
  const isFirstRender = useRef(true)
  return [{mainBoxRef, scrollToScrollHeightFlagRef, scrollToZeroFlagRef, cursorRef, isFirstRender}]
}
