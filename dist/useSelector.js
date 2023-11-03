"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
var _react = require("react");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const EMPTY_ARRAY = [];
const identity = s => s;
const repack = s => _objectSpread({}, s);
const useSelector = function useSelector(StateModule) {
  let selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  let deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_ARRAY;
  const ref = (0, _react.useRef)();
  ref.current = selector;
  const [state, updateState] = (0, _react.useState)();
  const isMultyStore = Array.isArray(StateModule);
  const getMultyState = () => StateModule.map(m => repack(m.state));
  (0, _react.useEffect)(() => {
    updateState(ref.current(...(isMultyStore ? getMultyState() : [repack(StateModule.state)])));
  }, deps);
  (0, _react.useEffect)(() => {
    const subscriber = () => {
      updateState(ref.current(...(isMultyStore ? getMultyState() : [repack(StateModule.state)])));
    };
    isMultyStore ? StateModule.forEach(m => m.subscribe(subscriber)) : StateModule.subscribe(subscriber);
    return () => isMultyStore ? StateModule.forEach(m => m.unsubscribe(subscriber)) : StateModule.unsubscribe(subscriber);
  }, []);
  return state !== null && state !== void 0 ? state : selector(...(isMultyStore ? getMultyState() : [repack(StateModule.state)]));
};
var _default = exports.default = useSelector;