import {_logger, logger2, logger3} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import {applyMarkdown} from '../../transform/applyMarkdown.js' 
import axios from 'axios'

export function useDevMarkdown(html) {
  const [markdown, setMarkdown] = useState(null);
  useEffect(() => {
    (async () => {
      setMarkdown(await applyMarkdown(html))
    })();
  }, [html])
  _logger.info(markdown)
  return markdown 
}
