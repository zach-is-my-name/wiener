import React, {useEffect, useState} from 'react'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import {loadNewsletterFromDb} from '../../db/db.js' 
import {applyMarkdown} from '../../transform/applyMarkdown.js'
import {convertAndStore} from '../../transform/convert.js'
import {fetchDateFromHtml} from '../../utilities.js'

export function useGetWien(hookString, dispatch ) {

  const [newsletterObj, setNewsletterObj] = useState(null)

  useEffect(() => {
    if (runHookString === "useFetchLatest") {
      (async () => {
        const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2500 })

        const {data} = await http.get('http://weekinethereumnews.com');
         const date = convertAndStore(data)
         setNewsletterObj(await loadNewsletterFromDb())
      })()
      dispatch({type: "setRenderObject", newsletterObj})

    }

    if (hookString === "useLoadArchiveMostRecent") {
      (async () => {
        setNewsletterObj(await loadNewsletterFromDb(""))
      })()
      dispatch({type: "setRenderObj", newsletterObj})

    }
   return () => dispatch({type:"getHook", payload: "" })
   
  }, [hookString])

}

