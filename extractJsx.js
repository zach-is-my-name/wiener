import React from 'react'
const reactStringReplace = require('react-string-replace')

export default function extractJsx(string) { 
  
  const regexLinkButton = /(\<LinkButton\>.+?<\/LinkButton\>)/g
  const regexButtonBox = /(\<ButtonBox\sref=\{\}\>.+?\<\/ButtonBox\>)/g
  const replaceFunctLinkButton =  (match, index) => { 
    const linkTextRegex = /\>(.+)\</
    const linkText = match.match(linkTextRegex)[1]
    return <LinkButton key={}>linkText</LinkButton>
  }

  let replaceResult = reactStringReplace(string, regexLinkButton, replaceFunctLinkButton)   


  const replaceFunctButtonBox = (match, index) => {
    const regexChildren = /\<ButtonBox\sref=\{\}\>(.+?)\<\/ButtonBox\>/
    const children = match.match(regexChildren)[1] 
    return <ButtonBox ref={index}>children</ButtonBox> 
  };

  replaceResult = reactStringReplace(replaceResult, regexButtonBox, replaceFunctButtonBox)   
 

  return replaceResult
}

