import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {_logger, logger2} from '../../devLog/logger.js' 
import React, {useLayoutEffect, useEffect, useState, useRef} from 'react'
import {useSearchWien} from '../customHooks/useSearchWien.js' 

function SearchPage({searchPageHidden, setDateFromSearch, setLineFromSearch, ctrDispatch} ) {
  const textBoxRef = useRef(null) 
  const listRef = useRef(null)

  const [query, setQuery] = useState("")
  const [items, setItems] = useState([])
  const [dateIndex, setDateIndex] = useState([])
  const [focus, setFocus] = useState('textBox')

  useEffect(()=> {
    if (focus === 'textBox' && !searchPageHidden) {
      textBoxRef.current.focus()
    } else if (focus === 'list' && !searchPageHidden) {
      listRef.current.pick(()=>{})
    } 
  }, [focus, searchPageHidden])

  const handleKeyPressTextbox = (ch, key) => {
    setImmediate(() => {
      if (key.name === 'enter') {
        setFocus("list")
      } else if (key.full === 'C-c') {
        process.exit(0)
      }
      useSearchWien(textBoxRef.current.value, setItems, setDateIndex)
      if (key.name === 'escape'){
        ctrDispatch({type: "exitSearchPage"})  
      }
    })
  }

  const handleSelect = (item, index) => {
    if (items.length) {
      const res = dateIndex.find(obj => obj.index === index) 
      const {date, line} = res
      setDateFromSearch(date)
      setLineFromSearch(line)
      ctrDispatch({type:"toggleRenderSearch"})
    }
  }

  return (
    <form
    onReset={() => ctrDispatch({type:"toggleRenderSearch"})}
    left="1%"
    top="5%"
    width="99%"
    hidden={searchPageHidden}
    height="99%"
    name={"form_"}
    >
    <box     
    top={"5%"}
    width={"80%"}
    height={3}
    left={"center"}
    border={{type: 'line'}}
    style={{border: {fg: 'white'}}}
    >
    Search:
    <textbox
    ref={textBoxRef}
    top={"5%"}
    left={"10%"}
    width={"70%"}
    onKeypress={handleKeyPressTextbox}
    inputOnFocus
    keys
    mouse
    name={"thin-textBox"}
    />
    </box> 

    <list 
    height={"85%"}
    top={"13%"}
    width={"80%"}
    left={"center"}
    onKeypress={(ch, key)=> {if (key === 'escape') {ctrDispatch({type:"exitSearchPage"})} else if (key.full ==='C-c') {process.exit(0)}}}
    items={items}
    onSelect={handleSelect}
    onCancel={() => ctrDispatch({type:"exitSearchPage"})}
    keys
    vi
    name={"list"}
    border={{type: 'line'}}
    style={{selected:{fg:'white',bg:'black' },border:{fg: 'white'}}}
    ref={listRef}
    /> 
    </form>

  )
}


export default SearchPage
