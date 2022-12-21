import React, {useEffect, useState, useRef} from 'react';
import open from 'open'
import {logger} from '../../devLog/logger.js' 
logger.level = "debug"

function LinkBox({hidden, linkUrl, linkBoxRef, linkLine, dispatch}) {
  const formRef = useRef(null)
  const button1Ref = useRef(null)
  const button2Ref = useRef(null)

  const cancelPress = () => {
    dispatch({type: "closeLinkBox"})  
  }
  const openPress = () => {
    open(linkUrl) 
    dispatch({type: "closeLinkBox"})  
    logger.debug("called open")
  }

  const handleKeyPressLinkBox = (ch, key) => {
    /* logger.debug("keypress: ", key)*/
    setImmediate(() => {
       if (key.full === 'C-c') {
        process.exit(0)
      }
      if (key.name === 'escape' || key.name === 'c' || key.name === 'C'){
        cancelPress() 
      } else if (key.name === 'o' || key.name === 'O' || key.name === 'enter')
        openPress()
    })
  }

  useEffect(() => {
    if (!hidden) {
      formRef.current?.focus()
      formRef.current?.key('escape', function(ch, key) {
        cancelPress()
      })
      formRef.current?.key('o', function(ch, key) {
        open(linkUrl)
        dispatch({type: "closeLinkBox"})  
      })

      formRef.current?.key('O', function(ch, key) {
        open(linkUrl)
        dispatch({type: "closeLinkBox"})  
      })

      // logger.debug("form focused?: ", formRef.current?.height)
      // logger.debug("button 1: ", {top:button1Ref.current?.top,left: button1Ref.current?.left })
      //logger.debug("form focused?: ", formRef.current?.height)
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
      onSubmit={() => openPress()} 
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
  // <question  focused={hidden ? false : true} shrink={true} left={"center"} align={"left"} hidden={hidden} autoPadding={true} border={{type: 'line'}} bg={'white'}>{url}</question>

   // useEffect(() => {
   //    if (!hidden) {
   //     linkBoxRef.current?.ask(`Open: ${url}`, open(url)) 
   //    }
   //    return dispatch({type: "closeLinkBox"})
   // })
  // useEffect(() => {
  //   // logger.debug("line: ", line)
  //   // logger.debug("form top: ", formRef.current?.top)
  //   // logger.debug("form focused?: ", formRef.current?.focused)
  // })

