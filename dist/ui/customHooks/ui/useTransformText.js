import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { useEffect, useState, useMemo } from 'react';
import blessed from "blessed";
export function useTransformText(renderText, message, ctrDispatch) {
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    text = _useState2[0],
    setText = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    linkArray = _useState4[0],
    setLinkObjArr = _useState4[1];
  var joinedText = useMemo(function () {
    return renderText && renderText.join('\n');
  }, [renderText]);
  var linkCount = -1;
  useEffect(function () {
    if (joinedText !== null && joinedText !== void 0 && joinedText.length) {
      setLinkObjArr([]);
      var replacer = function replacer(match, linkUrl) {
        setLinkObjArr(function (current) {
          return [].concat(_toConsumableArray(current), [linkUrl]);
        });
        linkCount++;
        var replacement = "[".concat(linkCount, "]");
        return replacement;
      };
      var regEx2 = /\$\$([^$]*)\$\$/g;
      var linkFormatedText = joinedText.replace(regEx2, replacer);
      setText(linkFormatedText);
    }
  }, [joinedText]);
  useEffect(function () {
    if (renderText === undefined && message.length) {
      setText(message);
    }
  }, [renderText, message]);
  useEffect(function () {
    if (text.length) ctrDispatch({
      type: "clearMessage"
    });
  }, [text]);
  return [text, linkArray];
}
//# sourceMappingURL=useTransformText.js.map