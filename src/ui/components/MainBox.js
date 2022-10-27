import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger, logger2} from '../../devLog/logger.js' 
import React from 'react';
import Cursor from "./Cursor.js"  
import terminalLink from 'terminal-link'
import  {useLayoutEffect, useEffect, useState, useMemo} from 'react';
import {useUiHooks} from '../customHooks/ui/useUiHooks.js' 
import HelpPage from './HelpPage.js'
import SearchPage from './SearchPage.js'

const MainBox = ({setDateFromSearch, setLineFromSearch, lineFromSearch, searchPageHidden, renderText, ctrDispatch, savedCursorPos=undefined, helpPageHidden}) =>  {

  const [ { keyHandler, clickHandler }, {cursorRef, mainBoxRef}, {cursorLeft, cursorTop} ] = useUiHooks(ctrDispatch, lineFromSearch, setLineFromSearch)

  const text = useMemo(() => renderText &&  renderText.join('\n'), [renderText]) 
  const searchPage = <SearchPage searchPageHidden={searchPageHidden} setLineFromSearch={setLineFromSearch} setDateFromSearch={setDateFromSearch} ctrDispatch={ctrDispatch}/>

   
    return  ( 
      <box 
      top={"top"}
      left={"left"}
      width={"100%"}
      height={"100%"}  
      focused={searchPageHidden}
      hidden={!helpPageHidden || !searchPageHidden  }
      keyable={true}
      input={true}
      scrollable={true}
      mouse={true} 
      tags={true}
      onKeypress={keyHandler}
      onClick={clickHandler}
      ref={mainBoxRef}
      name={"mainbox"}
      content={text}
      > 
      <Cursor cursorRef={cursorRef} cursorTop={cursorTop} cursorLeft={cursorLeft} savedCursorPos={savedCursorPos} />   
      </box>
      <HelpPage helpPageHidden={helpPageHidden} /> 
      {!searchPageHidden ? searchPage : null}
      </>
    )
  } 



export default MainBox

