import {useEffect, useState} from 'react';


 function useGetWien(obj) {
  const [renderObject, setRenderObject] = useState(null)

  useEffect(() => {

    async function getLatestWien() {
      const {data} = await axios.get('http://weekinethereumnews.com');
      const markdownNewsletter = applyMarkdown(data) 
      const date = formatDate(markdownNewsletter) 
      addNewsletter(date, markdownNewsletter) 
      setRenderObject({date, content:loadNewsletter(date)})
    }


    
    async function loadWienFromArchive(date)  {
     
    }

    async function getBackWien(start) {
   //changes url format 10/14/17 
   // full blast scrape is ~47
   // late 2021 archive undefined (not picking up month name abrv?)
    }

    async function searchWiens() {
    
    }    

    switch (obj) {
      case obj.search: searchWiens(searchTerm)  
      case obj.load: loadWienFromArchive() 
      case obj.back: getBackWien(start) 
      default: getLatestWien()
    }
  }, [])

  return renderObject
}

export {useGetWien}

