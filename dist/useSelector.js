"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const EMPTY_ARRAY = [];

const useSelector = function useSelector(StateModule, selector) {
  let deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_ARRAY;
  const ref = (0, _react.useRef)();
  ref.current = selector;
  const [state, updateState] = (0, _react.useState)(selector(_objectSpread({}, StateModule.state)));
  (0, _react.useEffect)(() => {
    updateState(ref.current(_objectSpread({}, StateModule.state)));
  }, deps);
  (0, _react.useEffect)(() => {
    const subscriber = newRootState => {
      const newState = ref.current(newRootState);
      updateState(newState);
    };

    StateModule.subscribe(subscriber);
    return () => StateModule.unsubscribe(subscriber);
  }, []);
  return state;
};

var _default = useSelector;
exports.default = _default;