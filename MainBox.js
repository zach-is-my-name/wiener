import React from 'react';
import  {useState, useEffect, useRef, useCallback} from 'react';
import ansiRegex from 'ansi-regex'
import reactStringReplace from 'react-string-replace'
import processString from 'react-process-string'
import {renderMarkdown} from './renderMarkdown'
//import secondRenderMarkdown from './secondRenderMarkdown'
import blessed from 'blessed'
import Cursor from './Cursor'
import ButtonBox from './ButtonBox'
import LinkButton from './LinkButton'
const regex = ansiRegex({onlyFirst: true});
const stripAnsi = require('strip-ansi');
function hasAnsi(string) {
	return regex.test(string);
}

/*
 (async () => { 
   let rm = await renderMarkdown()
   console.log(rm.match(ansiRegex()))
})()
*/
const MainBox = () =>  {
  const [markdown, setMarkdown] = useState(null)
  const [jsx, setJsx] = useState(null)
  const [cursorTop, setCursorTop] = useState(0) 
  const [cursorLeft, setCursorLeft] = useState(0)
  const [linkButtonRendered, setLinkButtonRendered] = useState(null)
  const [linkButtonFocused, setLinkButtonFocused] = useState(null)
  const mainBoxRef = useRef(null)

  const clickHandler = async (mouse) => {
    // move the cursor
    //cursor.detach()
    const { x, y } = mouse
    setCursorTop((mainBoxRef.current.childBase + y) - 1)
    setCursorLeft(x - 1)
    //renderCursor()
    //screen.render()

    // check if the clicked chunk is a markdown link
    await followLinkUnderCursor()
  }

  const linkButtonPress = useCallback( () => {
  }, [])

  const keyHandler = async (ch, key) => {
    if (key.full === 'escape' || key.full === 'q' || key.full === 'C-c') {
      return process.exit(0);

    } else {
      updateCoordinate(key.full)
    }

    function nextCursorPosition( current, forward, maxLength, adjustment )  {
      let position = current + (forward ? 1 : -1)
      position = position < 0 ? 0 : position
      position =
        position > maxLength - adjustment ? maxLength - adjustment : position

      return position
    }

    function updateCoordinate (input)  {
      if (input === 'j' || input === 'k') {
        setCursorTop(nextCursorPosition(
          cursorTop,
          input === 'j',
          mainBoxRef.current.getScrollHeight(),
          1,
        ))
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === 'h' || input === 'l') {

        setCursorLeft(nextCursorPosition(
          cursorLeft,
          input === 'l',
          mainBoxRef.current.width,
          3,
        ))
      } else if (input === 'g') {
        setCursorTop(0)
        setCursorLeft(0)
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === 'S-g') {
        setCursorTop(mainBoxRef.current.getScreenLines().length - 1)
        setCursorLeft(0)
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === '0') {
        setCursorLeft(0)
      } else if (input === '$') {
        setCursorLeft((mainBoxRef.current.width) - 3)
      } else if (input === 'd' || input === 'C-d') {
        setCursorTop( (cursorTop + mainBoxRef.current.height) - 2)
        if (cursorTop > mainBoxRef.current.getScrollHeight()) {
          setCursorTop(mainBoxRef.current.getScrollHeight() - 1)
        }
        mainBoxRef.current.scrollTo(mainBoxRef.currrent.getScrollHeight())
        mainBoxRef.current.scrollTo(cursorTop)
      } else if (input === 'u' || input === 'C-u') {
        setCursorTop((cursorTop - (mainBoxRef.current.height)) - 1)
        if (cursorTop < 0) {
          setCursorTop(0)
        }
        mainBoxRef.current.scrollTo(0)
        mainBoxRef.current.scrollTo(cursorTop)
      }
    }
  }


  useEffect( () => {
    async function getMarkdown() {
      const response = await renderMarkdown()
      
      let config = [{
        regex: /\{"linkText":"(.+?)","url":"(https?:\/\/.+?)"\}/gm,
        fn: (key, result) => {
          return (<ButtonBox url={`${result[2]}`} linkText={`${result[1]}`} key={key} />)
        }
      }]
      
      const processedString = processString(config)(stripAnsi(response))

      setMarkdown(processedString);
    }
    getMarkdown()
  }, []) 


  return(
    
    <box 
    top={"center"}
    left={"center"}
    width={"100%"}
    height={"100%"}  
    align={"left"}
    tags
    focused={true}
    keyable={true}
    input={true}
    onKeypress={keyHandler}
    mouse 
    onClick={clickHandler}
    scrollable={true}
    ref={mainBoxRef}
    >
    <layout width={"100%"} height={"100%"} border={{type: 'line', fg: 'blue'} } >
    {markdown}
    </layout> 
    <Cursor cursorTop={cursorTop} cursorLeft={cursorLeft} />   
    </box>
    
  )
  
}
/*


*/
 
 /*
 function extractJsx(string) { 
   const regex = /(\{"linkText":".+?","url":"https?:\/\/.+?"\})/gm
   const replaceResult = reactStringReplace(string, regex, ((match, index) => {     
     const urlRegex = /"url":"(https?:\/\/.+?)"/
     const url = match.match(urlRegex)[1]
     const linkTextRegex = /\{"linkText":(.+?)"/
     const linkText = match.match(linkTextRegex)[1]
     
    return <ButtonBox url={url} linkText={linkText} key={index} />
   })
   )  
   //console.log("booky")
  // console.log(replaceResult)
   return replaceResult
 }*/

export default MainBox

