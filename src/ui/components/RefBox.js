import React, {useEffect, useState, useRef} from 'react';
import open from 'open' 

function RefBox({initialRefNum, dispatch, linkArray, mainBoxRef, hidden}) {
  const formRef = useRef(null)
  const textAreaRef = useRef(null)
  const [refNum, setRefNum] = useState(initialRefNum)

  useEffect(() => {
    textAreaRef.current?.setValue(refNum) 
  }, [refNum])

  const cancelPress = () => {
    dispatch({type: "closeRefBox"})  
  }
  const openPress = () => {
    const linkIndex = parseInt(refNum, 10)
    if (typeof linkIndex === 'number') {
      const linkUrl = linkArray[linkIndex]
      open(linkUrl)
      dispatch({type: "closeRefBox"})  
    } else {
      dispatch({type: "closeRefBox"})  
    }
  }

  const handleKeyPressRefBox = (ch, key) => {
    setImmediate(() => {
      if (key.full === 'escape') {
        dispatch({type: "closeRefBox"})  
      }
      if (key.name === 'escape' || key.name === 'c' || key.name === 'C'){
        cancelPress() 
      }
      if (["0","1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9"].includes(key.full)) {
        setRefNum(refNum + key.full) 
      } else if (key.name === 'enter') {
        openPress()
      }
    })
  }

  useEffect(() => {
    if (!hidden) {
      formRef.current?.focus()
      formRef.current?.key('escape', function(ch, key) {
        cancelPress()
      })
      formRef.current?.key('o', function(ch, key) {
      })

      formRef.current?.key('O', function(ch, key) {
      })
    }
  }, [])

  return(
    <> 
    <form 
    left={"left"} 
    top={mainBoxRef.current?.height -1} 
    onKeypress={handleKeyPressRefBox} 
    hidden={hidden} 
    ref={formRef} 
    align={"left"} 
    onSubmit={() => openPress()} 
    onCancel={()=> cancelPress()}
    content={"Enter link #:"}
    height={1}
    style={{bg: "blue", fg: "white"}}
    >
    <textarea ref={textAreaRef} width={4} style={{bg: "blue", fg: "white"}} left={15} content={initialRefNum} / > 
    </form>

    </>


  )
}
export default RefBox


