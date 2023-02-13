
import React from 'react';
import chalk from 'chalk'


const text = `
?      ............... help
q      ............... quit (usually)  
Ctrl-c ............... quit (always) 
esc    ............... back

Move
j / k .......................... up/down
h / l .......................... left/right
w / b .......................... 10 chars. right/left
{ / } .......................... 10 chars. up/down 
g  ........................... top  
G  ........................... bottom 
0  ........................... begin. line
$  ........................... end line
Ctrl-u/Ctrl-d ................ 20 chars. up/down

Nav
0-99  ........................ type link ref #  
enter ........................ confirm typed link ref # / follow link ref # under cursor (opens link in default browser)
H (shift-h) .................. goto prev. newsletter
L (shift-l) .................. goto next newsletter
S (shift-s) .................. search page
Ctrl-h / backspace........... goto most recent newsletter in archive 


Search Page 

  Search Box
esc   ........................ exit search
enter ........................ focus results

  Search Results
j/k   ......................... up/down results
enter ......................... select result (goto newsletter)`
function HelpPage({helpPageHidden}) {

return (
<box
  top={"top"}
  left={"15%"}
  width={"100%"}
  height={"100%"}  
  hidden={helpPageHidden}
  content={text}
  /> 

)
}

export default HelpPage
export {text}
