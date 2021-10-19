   const [renderedMarkdown, setRenderedMarkdown] = useState(null)

  useEffect( () => {
    async function getRenderedMarkdown() {
      const response = await renderMarkdown()
      setRenderedMarkdown(response);
    }
    getRenderedMarkdown()

  }, []) 

 console.log(renderedMarkdown ? renderedMarkdown.trim(): null) 
  return (

    <Text> {renderedMarkdown ? renderedMarkdown.trim(): null  } </Text>
  );
};


