import {useEffect, useState} from 'react'
import {_logger} from '../../devLog/logger.js' 
import {format} from '../format/format.js'

export function useFormatWien(renderObj) {
  const [renderText, setRenderText] = useState(null)
  useEffect(() => {
    if (renderObj?.text) {
    (async () => {
      const formatted = await format(renderObj.text)
      setRenderText(formatted)
    })()
    }
  }, [renderObj])
return renderText 
}

