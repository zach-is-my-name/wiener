import {useEffect, useState, useMemo} from 'react'
import blessed from "blessed"
import fs from 'fs'
import {logger} from '../../../devLog/logger.js' 
logger.level = "debug"

export function useTransformText(renderText, message) {

  const [text, setText] = useState("")
  const [linkArray, setLinkObjArr]= useState([])
   
  let joinedText = useMemo(() => renderText && renderText.join('\n'), [renderText]) 

  let linkCount = -1

  useEffect(() => {
    if (joinedText?.length) {
      const replacer = (match, linkUrl) => {
        setLinkObjArr(current => [...current, linkUrl])
        linkCount++
        const replacement = `[${linkCount}]`
        return replacement 
      }

      const regEx2 = /\$\$([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))\$\$/g 

      const linkFormatedText = joinedText.replace(regEx2, replacer)
      setText(linkFormatedText)
    } else if (renderText === undefined && message.length) {
      setText(message)
    } 
  }, [renderText, message, joinedText])

  // logger.debug("debug linkArray", Array.isArray(linkArray))
  // logger.debug("linkArray length",  linkArray?.length)

  return [text, linkArray]
}
