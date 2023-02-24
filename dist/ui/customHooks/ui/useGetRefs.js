import { useRef } from 'react';
export function useGetRefs() {
  var mainBoxRef = useRef(null);
  var scrollToScrollHeightFlagRef = useRef(false);
  var cursorRef = useRef(null);
  var linkBoxRef = useRef(null);
  return {
    mainBoxRef: mainBoxRef,
    scrollToScrollHeightFlagRef: scrollToScrollHeightFlagRef,
    cursorRef: cursorRef,
    linkBoxRef: linkBoxRef
  };
}
//# sourceMappingURL=useGetRefs.js.map