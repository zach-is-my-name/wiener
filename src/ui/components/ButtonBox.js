import React from 'react';
import LinkButton from './LinkButton'
import LinkText from './LinkText'

function ButtonBox(props) {

  return (
    <> 
    <LinkText linkText={props.linkText} />
    <LinkButton url={props.url} />
    </>
  )
 /* 
    <layout height={"100%"} width={"100%"} border={{type: 'line', fg: 'red'} }>
    </layout>
  
*/
}
export default ButtonBox























