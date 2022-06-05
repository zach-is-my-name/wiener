import React, {useEffect, useState} from 'react'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore} from '../../transform/convert.js'
import {fetchBackFromLocalLatest} from '../../fetch/fetchBackFromLocalLatest.js'
import {fetchDateFromHtml} from '../../utilities.js'

export function useUpdateNewsletters(hookBool, dispatch) {

  useEffect(() => {
    if (hookBool === true) {
      (async () => {
        fetchBackFromLocalLatest()
      })()
    return () => dispatch({type: "updateHook", payload: false})
    }
  }, [hookBool])
}

