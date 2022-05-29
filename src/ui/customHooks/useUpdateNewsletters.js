import React, {useEffect, useState} from 'react'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore} from '../../transform/convert.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'
import {fetchDateFromHtml} from '../../utilities.js'

export function useUpdateNewsletters(hookString, dispatch) {

  useEffect(() => {
      (async () => {
        fetchBackFromLocalLatest()
      })()
    return () => dispatch({type: "updateHook", payload: false})
  }, [hookString])
}

