export function replacementFunction (content, node, options) {
    let linkRefCount = 0
    const linkText = "{underline}" + `${content}` + "{/underline}";
 
    const url = `${node.getAttribute('href')}`
    const buttonBoxOpen = `<ButtonBox  url={${url}>`
    const linkButtonOpen = `<LinkButton>`
    const underlineOpen = "{underline}"
  
    const openTags = buttonBoxOpen + linkButtonOpen + underlineOpen


    const underlineClose = " {/underline}"
    const linkButtonClose ="</LinkButton>" 
    const buttonBoxClose = "</ButtonBox>"
    const closeTags = underlineClose + linkButtonClose + buttonBoxClose  
    linkRefCount++

    return linkText + openTags + closeTags 
  }





/*
`<ButtonBox ref={N} url={x}> 
   Google 
  <LinkButton>
  ${underline}http://google.com${/underline}
  </LinkButton> 
  </ButtonBox>`
*/

























