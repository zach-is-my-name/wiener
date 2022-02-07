import {useEffect, useState} from 'react';
import {applyMarkdown} from './applyMarkdown.js'
import {formatDate} from './utilities.js'
import {addNewsletterToDb} from './db.js'
import {format} from './format/format.js'
import axios from 'axios';

 function useGetWien(obj) {
  const [renderObject, setRenderObject] = useState(null)

  useEffect(() => {

    async function getLatestWien() {
      const {data} = await axios.get('http://weekinethereumnews.com');
      const markdownNewsletter = applyMarkdown(data) 
      const date = formatDate(markdownNewsletter) 
      addNewsletterToDb(date, markdownNewsletter) 
      setRenderObject({date, content:loadNewsletter(date)})
    }

    
    async function loadWienFromArchive(date)  {
     
    }

    async function getBackWiens(start) {
     // changes url format @ 10/14/17 
     // full blast scrape is ~47
     // late 2021 archive undefined (not picking up month name abrv?)
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

