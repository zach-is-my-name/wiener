import React, {useEffect, useState} from 'react'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore, convertAndStoreCurrent} from '../../transform/convert.js'
import {fetchDateFromLocalLatest} from './fetch/fetchDateFromLocalLatest.js'
import {fetchDateFromHtml} from '../../utilities.js'

export function useUpdateNewsletters(hookString, dispatch) {

  useEffect(() => {
      (async () => {




      })()
  }, [])

}

