import {_logger, logger2} from '../../devLog/logger.js' 
import React from 'react';
import {argObj} from '../../index.js'
import {fetchDateFromCurrentNewsletter} from '../../utilities.js'
import MainBox from './MainBox.js' 
import {useHasInternet,
  useHasLatestInArchive,
  useGetWien, 
  useUpdateNewsletters,
  useHookController, 
  useFormatWien,
  
  useDev,
  useDevMarkdown
} from '../customHooks/index.js'


function App(props) {
  // const hasInternet = useHasInternet()

  // const {dateCurrentNewsletter:{dateWithMonth="waiting"}, hasLatestInArchive ="waiting"} = useHasLatestInArchive() 

  // let [ { getHook, updateHook, loading }, {ctrDispatch}] = useHookController(hasInternet, hasLatestInArchive) 

  //useUpdateNewsletters(updateHook, ctrDispatch, dateWithMonth) 

  //const renderObj = useGetWien(getHook, ctrDispatch, dateWithMonth );


  // const markdownText = useFormatWien(renderObj) 

  // const renderMarkdown = useRenderMarkdown()

  const html = useDev()
  const markdownText = useDevMarkdown(html);
  _logger.info(markdownText)
  return (
    // <MainBox argObj={argObj} renderText={markdownText} renderObj={renderObj}  />
    // <MainBox  renderText={markdownText} />
  <MainBox   />)
}

export default App
