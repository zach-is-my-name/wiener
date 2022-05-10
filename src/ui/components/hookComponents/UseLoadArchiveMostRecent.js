import React, {useEffect, useState} from 'react'
import {loadNewsletterFromDb} from '../../db.js'
const [newsletter, setNewsletter] = useState("")


export function UseLoadArchiveMostRecent({dispatch}) {
  useEffect(() => {
    (async () => {
      setNewsletter(await loadNewsletterFromDb(""))
    })()

    dispatch({type: "setRenderObj", newsletter})
  }
    return null
}
