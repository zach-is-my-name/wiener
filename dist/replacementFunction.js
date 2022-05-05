export function replacementFunction(content, node, options) {
  var linkRefCount = 0;
  var linkText = "{underline}" + "".concat(content) + "{/underline}";
  var url = "".concat(node.getAttribute('href'));
  var buttonBoxOpen = "<ButtonBox  url={".concat(url, ">");
  var linkButtonOpen = "<LinkButton>";
  var underlineOpen = "{underline}";
  var openTags = buttonBoxOpen + linkButtonOpen + underlineOpen;
  var underlineClose = " {/underline}";
  var linkButtonClose = "</LinkButton>";
  var buttonBoxClose = "</ButtonBox>";
  var closeTags = underlineClose + linkButtonClose + buttonBoxClose;
  linkRefCount++;
  return linkText + openTags + closeTags;
}
/*
`<ButtonBox ref={N} url={x}> 
   Google 
  <LinkButton>
  ${underline}http://google.com${/underline}
  </LinkButton> 
  </ButtonBox>`
*/