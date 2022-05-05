import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
export function useStateWithCallbackLazy(initialValue) {
  var callbackRef = useRef(null);

  var _useState = useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  useEffect(function () {
    if (callbackRef.current) {
      callbackRef.current(value);
      callbackRef.current = null;
    }
  }, [value]);

  var setValueWithCallback = function setValueWithCallback(newValue, callback) {
    callbackRef.current = callback;
    return setValue(newValue);
  };

  return [value, setValueWithCallback];
}
;