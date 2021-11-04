import React from 'react';
import LinkButton from './LinkButton'

function ButtonBox(props) {

  return (
    <>
    {props.linkText}
    <LinkButton url={props.url} /> 
    </>
  )
  

}
export default ButtonBox























