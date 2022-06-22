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
} from '../customHooks/index.js'


function App(props) {
  const hasInternet = useHasInternet()

  const {dateCurrentNewsletter:{dateWithMonth="waiting"}, hasLatestInArchive ="waiting"} = useHasLatestInArchive() 

  logger2.info({hasLatestInArchive}) 

  let [ { getHook, updateHook, loading }, {ctrDispatch}] = useHookController(hasInternet, hasLatestInArchive) 

  const renderObj = useGetWien(getHook, ctrDispatch, dateWithMonth );

  const renderText = useFormatWien(renderObj) 
  useUpdateNewsletters(updateHook, ctrDispatch, dateWithMonth) 

  return (
    <MainBox argObj={argObj} renderText={renderText} renderObj={renderObj}  />
  )
}

export default App
