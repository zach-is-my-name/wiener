import {_logger} from '../../devLog/logger.js' 
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'

export function useUpdateNewsletters(hookBool, dispatch) {
  useEffect(() => {
    if (hookBool === true) {
    (async () => {
      // logger.info({useUpdateCalled: "useUpdateCalled"})
      await fetchBackFromLocalLatest(dispatch)
    })()
    }
    //return () => dispatch({type: "updateHook", payload: false})
  }, [hookBool])
}

