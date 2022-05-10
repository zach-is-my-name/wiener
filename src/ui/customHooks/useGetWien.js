import {loadNewsletterFromDb} from '../../db/db.js' 

export function useGetWien(argObj) {

  useEffect(() => {

    async function loadNewsletterFromArchive(date)  {
      const newsletter = await loadNewsletterFromDb(date)
      dispatch({type:"setRenderObj", payload: { newsletter, date}})
    }
    
    async function fetchLatestNewsletter() {
      dispatch({type: "setRenderObject", payload: {date, content: loadNewsletter(date)})
    }

    //todo
    async function getBackNewsletters(start) {
    }

    //todo
    async function searchNewsletters() {
    }    

  }, [])

}

