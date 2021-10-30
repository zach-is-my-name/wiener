import React from 'react';
import LinkButton from './LinkButton'

function ButtonBox(props) {

  return (
    <box 
      //onPress={linkBoxPress}
      height={3}
      width='shrink' 
      //focused={linkButtonFocused}
      mouse 
      tags={true}
      hidden={true} 
      //ref={props.refProp} 
     // url={props.url}
    >
    {props.children}
    <LinkButton /> 
    </box>
  )
  

}
// <LinkButton url={props} / > 
export default ButtonBox























