import {_logger, logger2, logger3} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js' 
import axios from 'axios'

export function useDev() {
  const [html, setHtml] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  useEffect(() => {
    (async () => {
      const {data:res} = await axios.get('https://weekinethereumnews.com/week-in-ethereum-news-june-18-2022/') 
      setHtml(res)
    })();
  })
  _logger.info(html)
  return html 
}
