import {loadNewsletterFromDb} from '../../db/db.js' 

export function useGetWien(argObj) {

  useEffect(() => {

    async function loadWienFromArchive(date)  {
      const newsletter = await loadNewsletterFromDb(date)
      dispatch({type:"setRenderObj", payload: { newsletter, date}})
    }
    
    async function fetchLatestWien() {
      const {data} = await axios.get('http://weekinethereumnews.com');
      const markdownNewsletter = applyMarkdown(data) 
      const date = getDateFromNewsletter(markdownNewsletter) 
      addNewsletterToDb(date, markdownNewsletter) 
      dispatch({type: "setRenderObject", payload: {date, content: loadNewsletter(date)})
    }

    //todo
    async function getBackWiens(start) {
    }

    //todo
    async function searchWiens() {
    }    

    switch (argObj) {
      default: fetchLatestWien()
      case argObj.search: searchWiens(searchTerm)  
      case argObj.load: loadWienFromArchive() 
      case argObj.back: getBackWiens(start) 
    }
  }, [])

}

