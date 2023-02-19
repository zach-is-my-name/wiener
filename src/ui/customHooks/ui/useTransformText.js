import {useEffect, useState, useMemo} from 'react'
import blessed from "blessed"

export function useTransformText(renderText, message, ctrDispatch) {

  const [text, setText] = useState("")
  const [linkArray, setLinkObjArr]= useState([])

  let joinedText = useMemo(() => renderText && renderText.join('\n'), [renderText]) 

  let linkCount = -1

  useEffect(() => {
    if (joinedText?.length) {
        setLinkObjArr([])
      const replacer = (match, linkUrl) => {
        setLinkObjArr(current => [...current, linkUrl])
        linkCount++
        const replacement = `[${linkCount}]`
        return replacement 
      }

      const regEx2 = /\$\$([^$]*)\$\$/g
      const linkFormatedText = joinedText.replace(regEx2, replacer)
      setText(linkFormatedText)
    } 
  }, [joinedText])

  useEffect(() => {
    if (renderText === undefined && message.length) {
      setText(message)
    }
  },[renderText, message])

  useEffect(() => {
    if (text.length) ctrDispatch({type: "clearMessage"})
  }, [text])

  return [text, linkArray]
}
