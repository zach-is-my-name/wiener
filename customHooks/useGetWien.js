import {useEffect, useState} from 'react';
import {applyMarkdown} from './applyMarkdown.js'
import {getDateFromNewsletter} from './utilities.js'
import {addNewsletterToDb} from './db.js'
import axios from 'axios';
import fs from 'fs'

 function useGetWien(obj) {
  const [renderObject, setRenderObject] = useState(null)

  useEffect(() => {

    async function getLatestWien() {
      const {data} = await axios.get('http://weekinethereumnews.com');
      const markdownNewsletter = applyMarkdown(data) 
      const date = getDateFromNewsletter(markdownNewsletter) 
      addNewsletterToDb(date, markdownNewsletter) 
      setRenderObject({date, content:loadNewsletter(date)})
    }

    
    async function loadWienFromArchive(date)  {
    const newsletter = fs.readFileSync('./archive/markdownNewsletters/' + date, {encoding:'utf8', flag:'r'})
      return newsletter
    }

    async function getBackWiens(start) {

    }

    async function searchWiens() {
    
    }    

    switch (obj) {
      case obj.search: searchWiens(searchTerm)  
      case obj.load: loadWienFromArchive() 
      case obj.back: getBackWiens(start) 
      default: getLatestWien()
    }
  }, [])

  return renderObject
}

export {useGetWien}

