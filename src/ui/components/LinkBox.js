import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import open from 'open'

function LinkBox({hidden, linkUrl, linkBoxRef, linkLine, dispatch}) {
  const formRef = useRef(null)
  const button1Ref = useRef(null)
  const button2Ref = useRef(null)

  const cancelPress = () => {
    dispatch({type: "closeLinkBox"})  
  }
  const openPress = (linkUrl) => {
    open(linkUrl) 
    dispatch({type: "closeLinkBox"})  
  }

  const handleKeyPressLinkBox = (ch, key) => {
    setImmediate(() => {
       if (key.full === 'C-c') {
        process.exit(0)
      } else if (key.name === 'escape' || key.name === 'c' || key.name === 'C'){
        cancelPress()
      } 
    })
  }

  useEffect(() => {
    if (!hidden && linkUrl.length) {
      formRef.current?.focus()
      formRef.current?.key('escape', function(ch, key) {
        cancelPress()
      })
      formRef.current?.key('c', function(ch, key) {
        cancelPress()
      })
      formRef.current?.key('o', function(ch, key) {
        openPress(linkUrl)
        dispatch({type: "closeLinkBox"})  
      })

      formRef.current?.key('O', function(ch, key) {
        openPress(linkUrl)
        dispatch({type: "closeLinkBox"})  
      })
    }
  }, [])

  return(
   <> 
    <form 
      left={"center"} 
      top={linkLine + 3} 
      border={{type: 'line'}} 
      shrink={true}
      label={"esc to close"}
      onKeypress={handleKeyPressLinkBox}
      hidden={hidden} 
      ref={formRef} 
      align={"center"} 
      onSubmit={() => openPress(linkUrl)} 
      onCancel={()=> cancelPress()}
      height={7}
    >
    <text align={"center"} top={1} content={linkUrl} />
    <box /*style={{border: {fg: 'cyan'}}} border={{type: 'line'}}*/ name={"button-group"} align={"center"} left={"center"} shrink={true} top={3}>

    <button keys bottom={0} left={"25%-3"} /*border={{type: 'line'}}*/ shrink={true} content={"g(o)"} onPress={() => formRef.current?.submit()} ref={button1Ref} mouse/> 

    <button keys bottom={0} left={"25%+3"} /*border={{type:'line'}}*/ ref={button2Ref} shrink={true}  onPress={() => formRef.current?.submit()} content={"(c)ancle"} onPress={cancelPress} /> 
    </box>
    </form>
   </>


  )
}
  export default LinkBox

