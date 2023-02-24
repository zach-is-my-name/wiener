import React from 'react';
import chalk from 'chalk'

let text = `
?      ............... help
q      ............... quit (usually)  
Ctrl-c ............... quit (always) 
esc    ............... back

Move
j / up ......................... up
k / down ....................... down
h / l .......................... left/right
w / b .......................... 10 chars. right/left
{ / } .......................... 10 chars. up/down 
g / home  ...................... top  
G / end   ...................... bottom 
0  ............................. begin. line
$  ............................. end line
Ctrl-u / Pg Up.................. 20 chars. up/down
Ctrl-d / Pg Dn ................. 20 chars. up/down

Nav
0-99  ........................ type link ref #  
enter ........................ confirm typed link ref # /
                               follow link ref # under cursor                   
                               (opens link in default browser)
H (shift-h) .................. goto prev. newsletter
L (shift-l) .................. goto next newsletter
S (shift-s) .................. search page
Ctrl-h / backspace............ goto most recent newsletter in archive 


Search Page 

  Search Box
esc   ........................ exit search
enter ........................ focus results

  Search Results
j/k   ......................... up/down results
enter ......................... select result (goto newsletter)

$ wienr --help 

$ wienr --version

$ wienr --bug
`
function HelpPage({helpPageHidden, ctrDispatch}) {

  const handleKeyPress = (ch, key) => {
    setImmediate(() => {
      if (key.full === 'escape') {
        ctrDispatch({type: "toggleHelpPage"})  
      }
    })
  }

  return (
    <box
    top={"top"}
    left={"15%"}
    width={"100%"}
    height={"100%"}  
    focused={true}
    hidden={helpPageHidden}
    onKeypress={handleKeyPress}
    content={text}
    scrollable={true}
    alwaysScroll={true}
    keys={true}
    vi={true}
    /> 

  )
}

export default HelpPage
export {text}
