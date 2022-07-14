import React, { useRef, useState, useEffect } from 'react';

function Test1 (props) {
  const items = ["cow","pig","chicken", "goat"] 

  return (
    <list
    focused
    class={{
      border: { type: 'line'},
        style: { border: { fg: 'blue' } },
    }}
    keys
    vi
    width="50%"
    height="50%"
    left="25%"
    top="25%"
    style={{
      item: { fg: 'black' },
        selected: { fg: 'white', bg: 'black' },
    }}
    items={ items }
    />
  )
}

export default Test1

