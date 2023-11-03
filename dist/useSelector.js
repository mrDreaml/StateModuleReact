"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
const EMPTY_ARRAY = [];
const identity = s => s;
const useSelector = function useSelector(StateModule) {
  let selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  let deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_ARRAY;
  const ref = (0, _react.useRef)();
  ref.current = selector;
  const [state, updateState] = (0, _react.useState)();
  const isMultyStore = Array.isArray(StateModule);
  const getMultyState = () => StateModule.map(m => m.state);
  (0, _react.useEffect)(() => {
    updateState(ref.current(...(isMultyStore ? getMultyState() : [StateModule.state])));
  }, deps);
  (0, _react.useEffect)(() => {
    const subscriber = () => {
      updateState(ref.current(...(isMultyStore ? getMultyState() : [StateModule.state])));
    };
    isMultyStore ? StateModule.forEach(m => m.subscribe(subscriber)) : StateModule.subscribe(subscriber);
    return () => isMultyStore ? StateModule.forEach(m => m.unsubscribe(subscriber)) : StateModule.unsubscribe(subscriber);
  }, []);
  return state !== null && state !== void 0 ? state : selector(...(isMultyStore ? getMultyState() : [StateModule.state]));
};
var _default = exports.default = useSelector;