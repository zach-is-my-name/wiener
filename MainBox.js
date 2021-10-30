import React from 'react';
const {useState, useEffect, useRef, useCallback} = require('react');
const reactStringReplace = require('react-string-replace')
//const {renderMarkdown} = require('./_renderMarkdown')
const {getMarkdown} = require('./_getMarkdown')
import blessed from 'blessed'
import Cursor from './Cursor'
import ButtonBox from './ButtonBox'
import LinkButton from './LinkButton'

const MainBox = () =>  {
  const [markdown, setMarkdown] = useState(null)
  const [cursorTop, setCursorTop] = useState(0) 
  const [cursorLeft, setCursorLeft] = useState(0)
  const [linkButtonRendered, setLinkButtonRendered] = useState(null)
  const [linkButtonFocused, setLinkButtonFocused] = useState(null)
  const mainBoxRef = useRef(null)

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

  useEffect( () => {
    async function _getMarkdown() {
      const response = await getMarkdown()
      const parsedMarkdown = extractJsx(response);
      setMarkdown(parsedMarkdown);
    }
    _getMarkdown()
  }, []) 

  const linkButtonPress = useCallback( () => {
    //setLinkButtonRendered();
    //setLinkButtonFocused();
  }, [])

  return(
    <box 
    top={"center"}
    left={"center"}
    width={"100%"}
    height={"100%"}  
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
    {markdown && markdown}
    <Cursor cursorTop={cursorTop} cursorLeft={cursorLeft} />   
    </box>
  )
}

 function extractJsx(string) { 
  
  const regexLinkButton = /(\<LinkButton\>.+?<\/LinkButton\>)/g

  const replaceFunctLinkButton =  (match, index) => { 

    const linkUrlRegex = /\>(.+?)\</
    const linkUrl = match.match(linkUrlRegex)[1]

    return <LinkButton key={index}>{linkUrl}</LinkButton>
  }

  let replaceResult = reactStringReplace(string, regexLinkButton, replaceFunctLinkButton)   

  const regexButtonBox = /(\<ButtonBox\>.+?\<LinkButton\>.+?\<\/LinkButton\>\<\/ButtonBox\>)/g

  const replaceFunctButtonBox = (match, index) => {
    const regexChildren = /\<ButtonBox\>.+?(\<LinkButton\>.+?\<\/LinkButton\>)\<\/ButtonBox\>/
    const regexLinkText=  /\<ButtonBox\>(.+?)\<LinkButton\>.+?\<\/LinkButton\>\<\/ButtonBox\>/

    const children = match.match(regexChildren)[1] 

    const linkText = match.match(regexLinkText)[1]
    return <ButtonBox key={index} refProp={index}>{linkText} + {children}</ButtonBox> 
  };
  
  replaceResult = reactStringReplace(replaceResult, regexButtonBox, replaceFunctButtonBox)   


  return replaceResult
}

export default MainBox

