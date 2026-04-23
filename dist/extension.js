"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode3 = __toESM(require("vscode"));

// src/providers/DiagramTabProvider.ts
var vscode = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default = arrayMap;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var baseToString_default = baseToString;

// node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var trimmedEndIndex_default = trimmedEndIndex;

// node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;

// node_modules/lodash-es/toFinite.js
var INFINITY2 = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_default = toFinite;

// node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result = toFinite_default(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_default = toInteger;

// node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_WeakMap.js
var WeakMap = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap;

// node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ function () {
  function object() {
  }
  return function (proto) {
    if (!isObject_default(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var baseCreate_default = baseCreate;

// node_modules/lodash-es/_apply.js
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var apply_default = apply;

// node_modules/lodash-es/noop.js
function noop() {
}
var noop_default = noop;

// node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var copyArray_default = copyArray;

// node_modules/lodash-es/_shortOut.js
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function () {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var shortOut_default = shortOut;

// node_modules/lodash-es/constant.js
function constant(value) {
  return function () {
    return value;
  };
}
var constant_default = constant;

// node_modules/lodash-es/_defineProperty.js
var defineProperty = function () {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty_default = defineProperty;

// node_modules/lodash-es/_baseSetToString.js
var baseSetToString = !defineProperty_default ? identity_default : function (func, string) {
  return defineProperty_default(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant_default(string),
    "writable": true
  });
};
var baseSetToString_default = baseSetToString;

// node_modules/lodash-es/_setToString.js
var setToString = shortOut_default(baseSetToString_default);
var setToString_default = setToString;

// node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEach_default = arrayEach;

// node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var baseFindIndex_default = baseFindIndex;

// node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
var baseIsNaN_default = baseIsNaN;

// node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var strictIndexOf_default = strictIndexOf;

// node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
var baseIndexOf_default = baseIndexOf;

// node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
var arrayIncludes_default = arrayIncludes;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/lodash-es/_assignValue.js
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignValue_default = assignValue;

// node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default = copyObject;

// node_modules/lodash-es/_overRest.js
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function () {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply_default(func, this, otherArgs);
  };
}
var overRest_default = overRest;

// node_modules/lodash-es/_baseRest.js
function baseRest(func, start) {
  return setToString_default(overRest_default(func, start, identity_default), func + "");
}
var baseRest_default = baseRest;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/_isIterateeCall.js
function isIterateeCall(value, index, object) {
  if (!isObject_default(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike_default(object) && isIndex_default(index, object.length) : type == "string" && index in object) {
    return eq_default(object[index], value);
  }
  return false;
}
var isIterateeCall_default = isIterateeCall;

// node_modules/lodash-es/_createAssigner.js
function createAssigner(assigner) {
  return baseRest_default(function (object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var createAssigner_default = createAssigner;

// node_modules/lodash-es/_isPrototype.js
var objectProto5 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto6 = Object.prototype;
var hasOwnProperty4 = objectProto6.hasOwnProperty;
var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ function () {
  return arguments;
}()) ? baseIsArguments_default : function (value) {
  return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function () {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto7 = Object.prototype;
var hasOwnProperty5 = objectProto7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty6.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/assign.js
var objectProto9 = Object.prototype;
var hasOwnProperty7 = objectProto9.hasOwnProperty;
var assign = createAssigner_default(function (object, source) {
  if (isPrototype_default(source) || isArrayLike_default(source)) {
    copyObject_default(source, keys_default(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty7.call(source, key)) {
      assignValue_default(object, key, source[key]);
    }
  }
});
var assign_default = assign;

// node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var nativeKeysIn_default = nativeKeysIn;

// node_modules/lodash-es/_baseKeysIn.js
var objectProto10 = Object.prototype;
var hasOwnProperty8 = objectProto10.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var baseKeysIn_default = baseKeysIn;

// node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto11 = Object.prototype;
var hasOwnProperty9 = objectProto11.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty9.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto12 = Object.prototype;
var hasOwnProperty10 = objectProto12.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty10.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function () {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var memoizeCapped_default = memoizeCapped;

// node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function (string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath_default = stringToPath;

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// node_modules/lodash-es/_toKey.js
var INFINITY3 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY3 ? "-0" : result;
}
var toKey_default = toKey;

// node_modules/lodash-es/_baseGet.js
function baseGet(object, path2) {
  path2 = castPath_default(path2, object);
  var index = 0, length = path2.length;
  while (object != null && index < length) {
    object = object[toKey_default(path2[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default = baseGet;

// node_modules/lodash-es/get.js
function get(object, path2, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path2);
  return result === void 0 ? defaultValue : result;
}
var get_default = get;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/_isFlattenable.js
var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var isFlattenable_default = isFlattenable;

// node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush_default(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var baseFlatten_default = baseFlatten;

// node_modules/lodash-es/flatten.js
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, 1) : [];
}
var flatten_default = flatten;

// node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object);
var getPrototype_default = getPrototype;

// node_modules/lodash-es/_baseSlice.js
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var baseSlice_default = baseSlice;

// node_modules/lodash-es/_arrayReduce.js
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
var arrayReduce_default = arrayReduce;

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
var baseAssign_default = baseAssign;

// node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
var baseAssignIn_default = baseAssignIn;

// node_modules/lodash-es/_cloneBuffer.js
var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var cloneBuffer_default = cloneBuffer;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto13 = Object.prototype;
var propertyIsEnumerable2 = objectProto13.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
var copySymbols_default = copySymbols;

// node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function (object) {
  var result = [];
  while (object) {
    arrayPush_default(result, getSymbols_default(object));
    object = getPrototype_default(object);
  }
  return result;
};
var getSymbolsIn_default = getSymbolsIn;

// node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
var copySymbolsIn_default = copySymbolsIn;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default = getAllKeysIn;

// node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView");
var DataView_default = DataView;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set");
var Set_default = Set2;

// node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function (value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_initCloneArray.js
var objectProto14 = Object.prototype;
var hasOwnProperty11 = objectProto14.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty11.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var initCloneArray_default = initCloneArray;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array;
var Uint8Array_default = Uint8Array2;

// node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
  return result;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var cloneDataView_default = cloneDataView;

// node_modules/lodash-es/_cloneRegExp.js
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var cloneRegExp_default = cloneRegExp;

// node_modules/lodash-es/_cloneSymbol.js
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var cloneSymbol_default = cloneSymbol;

// node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// node_modules/lodash-es/_initCloneByTag.js
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag2:
      return cloneArrayBuffer_default(object);
    case boolTag2:
    case dateTag2:
      return new Ctor(+object);
    case dataViewTag3:
      return cloneDataView_default(object, isDeep);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray_default(object, isDeep);
    case mapTag3:
      return new Ctor();
    case numberTag2:
    case stringTag2:
      return new Ctor(object);
    case regexpTag2:
      return cloneRegExp_default(object);
    case setTag3:
      return new Ctor();
    case symbolTag2:
      return cloneSymbol_default(object);
  }
}
var initCloneByTag_default = initCloneByTag;

// node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// node_modules/lodash-es/_baseIsMap.js
var mapTag4 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag4;
}
var baseIsMap_default = baseIsMap;

// node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
var isMap_default = isMap;

// node_modules/lodash-es/_baseIsSet.js
var setTag4 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag4;
}
var baseIsSet_default = baseIsSet;

// node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
var isSet_default = isSet;

// node_modules/lodash-es/_baseClone.js
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var boolTag3 = "[object Boolean]";
var dateTag3 = "[object Date]";
var errorTag2 = "[object Error]";
var funcTag3 = "[object Function]";
var genTag2 = "[object GeneratorFunction]";
var mapTag5 = "[object Map]";
var numberTag3 = "[object Number]";
var objectTag3 = "[object Object]";
var regexpTag3 = "[object RegExp]";
var setTag5 = "[object Set]";
var stringTag3 = "[object String]";
var symbolTag3 = "[object Symbol]";
var weakMapTag3 = "[object WeakMap]";
var arrayBufferTag3 = "[object ArrayBuffer]";
var dataViewTag4 = "[object DataView]";
var float32Tag3 = "[object Float32Array]";
var float64Tag3 = "[object Float64Array]";
var int8Tag3 = "[object Int8Array]";
var int16Tag3 = "[object Int16Array]";
var int32Tag3 = "[object Int32Array]";
var uint8Tag3 = "[object Uint8Array]";
var uint8ClampedTag3 = "[object Uint8ClampedArray]";
var uint16Tag3 = "[object Uint16Array]";
var uint32Tag3 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag3] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag3] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject_default(value)) {
    return value;
  }
  var isArr = isArray_default(value);
  if (isArr) {
    result = initCloneArray_default(value);
    if (!isDeep) {
      return copyArray_default(value, result);
    }
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
    if (isBuffer_default(value)) {
      return cloneBuffer_default(value, isDeep);
    }
    if (tag == objectTag3 || tag == argsTag3 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject_default(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag_default(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet_default(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_default(value)) {
    value.forEach(function (subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach_default(props || value, function (subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var baseClone_default = baseClone;

// node_modules/lodash-es/clone.js
var CLONE_SYMBOLS_FLAG2 = 4;
function clone(value) {
  return baseClone_default(value, CLONE_SYMBOLS_FLAG2);
}
var clone_default = clone;

// node_modules/lodash-es/compact.js
function compact(array) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var compact_default = compact;

// node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/lodash-es/_SetCache.js
function SetCache(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values2[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function (othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag4 = "[object Boolean]";
var dateTag4 = "[object Date]";
var errorTag3 = "[object Error]";
var mapTag6 = "[object Map]";
var numberTag4 = "[object Number]";
var regexpTag4 = "[object RegExp]";
var setTag6 = "[object Set]";
var stringTag4 = "[object String]";
var symbolTag4 = "[object Symbol]";
var arrayBufferTag4 = "[object ArrayBuffer]";
var dataViewTag5 = "[object DataView]";
var symbolProto3 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf2 = symbolProto3 ? symbolProto3.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag5:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag4:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag4:
    case dateTag4:
    case numberTag4:
      return eq_default(+object, +other);
    case errorTag3:
      return object.name == other.name && object.message == other.message;
    case regexpTag4:
    case stringTag4:
      return object == other + "";
    case mapTag6:
      var convert = mapToArray_default;
    case setTag6:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag4:
      if (symbolValueOf2) {
        return symbolValueOf2.call(object) == symbolValueOf2.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto15 = Object.prototype;
var hasOwnProperty12 = objectProto15.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty12.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag4 = "[object Arguments]";
var arrayTag3 = "[object Array]";
var objectTag4 = "[object Object]";
var objectProto16 = Object.prototype;
var hasOwnProperty13 = objectProto16.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag3 : getTag_default(object), othTag = othIsArr ? arrayTag3 : getTag_default(other);
  objTag = objTag == argsTag4 ? objectTag4 : objTag;
  othTag = othTag == argsTag4 ? objectTag4 : othTag;
  var objIsObj = objTag == objectTag4, othIsObj = othTag == objectTag4, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty13.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty13.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
var getMatchData_default = getMatchData;

// node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function (object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// node_modules/lodash-es/_hasPath.js
function hasPath(object, path2, hasFunc) {
  path2 = castPath_default(path2, object);
  var index = -1, length = path2.length, result = false;
  while (++index < length) {
    var key = toKey_default(path2[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// node_modules/lodash-es/hasIn.js
function hasIn(object, path2) {
  return object != null && hasPath_default(object, path2, baseHasIn_default);
}
var hasIn_default = hasIn;

// node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path2, srcValue) {
  if (isKey_default(path2) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path2), srcValue);
  }
  return function (object) {
    var objValue = get_default(object, path2);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path2) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function (object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path2) {
  return function (object) {
    return baseGet_default(object, path2);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// node_modules/lodash-es/property.js
function property(path2) {
  return isKey_default(path2) ? baseProperty_default(toKey_default(path2)) : basePropertyDeep_default(path2);
}
var property_default = property;

// node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// node_modules/lodash-es/_arrayAggregator.js
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}
var arrayAggregator_default = arrayAggregator;

// node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default = createBaseFor;

// node_modules/lodash-es/_baseFor.js
var baseFor = createBaseFor_default();
var baseFor_default = baseFor;

// node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee) {
  return object && baseFor_default(object, iteratee, keys_default);
}
var baseForOwn_default = baseForOwn;

// node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var createBaseEach_default = createBaseEach;

// node_modules/lodash-es/_baseEach.js
var baseEach = createBaseEach_default(baseForOwn_default);
var baseEach_default = baseEach;

// node_modules/lodash-es/_baseAggregator.js
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach_default(collection, function (value, key, collection2) {
    setter(accumulator, value, iteratee(value), collection2);
  });
  return accumulator;
}
var baseAggregator_default = baseAggregator;

// node_modules/lodash-es/_createAggregator.js
function createAggregator(setter, initializer) {
  return function (collection, iteratee) {
    var func = isArray_default(collection) ? arrayAggregator_default : baseAggregator_default, accumulator = initializer ? initializer() : {};
    return func(collection, setter, baseIteratee_default(iteratee, 2), accumulator);
  };
}
var createAggregator_default = createAggregator;

// node_modules/lodash-es/defaults.js
var objectProto17 = Object.prototype;
var hasOwnProperty14 = objectProto17.hasOwnProperty;
var defaults = baseRest_default(function (object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index < length) {
    var source = sources[index];
    var props = keysIn_default(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq_default(value, objectProto17[key]) && !hasOwnProperty14.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
var defaults_default = defaults;

// node_modules/lodash-es/isArrayLikeObject.js
function isArrayLikeObject(value) {
  return isObjectLike_default(value) && isArrayLike_default(value);
}
var isArrayLikeObject_default = isArrayLikeObject;

// node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var arrayIncludesWith_default = arrayIncludesWith;

// node_modules/lodash-es/_baseDifference.js
var LARGE_ARRAY_SIZE2 = 200;
function baseDifference(array, values2, iteratee, comparator) {
  var index = -1, includes2 = arrayIncludes_default, isCommon = true, length = array.length, result = [], valuesLength = values2.length;
  if (!length) {
    return result;
  }
  if (iteratee) {
    values2 = arrayMap_default(values2, baseUnary_default(iteratee));
  }
  if (comparator) {
    includes2 = arrayIncludesWith_default;
    isCommon = false;
  } else if (values2.length >= LARGE_ARRAY_SIZE2) {
    includes2 = cacheHas_default;
    isCommon = false;
    values2 = new SetCache_default(values2);
  }
  outer:
  while (++index < length) {
    var value = array[index], computed = iteratee == null ? value : iteratee(value);
    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values2[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    } else if (!includes2(values2, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}
var baseDifference_default = baseDifference;

// node_modules/lodash-es/difference.js
var difference = baseRest_default(function (array, values2) {
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true)) : [];
});
var difference_default = difference;

// node_modules/lodash-es/last.js
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_default = last;

// node_modules/lodash-es/drop.js
function drop(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  return baseSlice_default(array, n < 0 ? 0 : n, length);
}
var drop_default = drop;

// node_modules/lodash-es/dropRight.js
function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  n = length - n;
  return baseSlice_default(array, 0, n < 0 ? 0 : n);
}
var dropRight_default = dropRight;

// node_modules/lodash-es/_castFunction.js
function castFunction(value) {
  return typeof value == "function" ? value : identity_default;
}
var castFunction_default = castFunction;

// node_modules/lodash-es/forEach.js
function forEach(collection, iteratee) {
  var func = isArray_default(collection) ? arrayEach_default : baseEach_default;
  return func(collection, castFunction_default(iteratee));
}
var forEach_default = forEach;

// node_modules/lodash-es/_arrayEvery.js
function arrayEvery(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}
var arrayEvery_default = arrayEvery;

// node_modules/lodash-es/_baseEvery.js
function baseEvery(collection, predicate) {
  var result = true;
  baseEach_default(collection, function (value, index, collection2) {
    result = !!predicate(value, index, collection2);
    return result;
  });
  return result;
}
var baseEvery_default = baseEvery;

// node_modules/lodash-es/every.js
function every(collection, predicate, guard) {
  var func = isArray_default(collection) ? arrayEvery_default : baseEvery_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var every_default = every;

// node_modules/lodash-es/_baseFilter.js
function baseFilter(collection, predicate) {
  var result = [];
  baseEach_default(collection, function (value, index, collection2) {
    if (predicate(value, index, collection2)) {
      result.push(value);
    }
  });
  return result;
}
var baseFilter_default = baseFilter;

// node_modules/lodash-es/filter.js
function filter(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, baseIteratee_default(predicate, 3));
}
var filter_default = filter;

// node_modules/lodash-es/_createFind.js
function createFind(findIndexFunc) {
  return function (collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike_default(collection)) {
      var iteratee = baseIteratee_default(predicate, 3);
      collection = keys_default(collection);
      predicate = function (key) {
        return iteratee(iterable[key], key, iterable);
      };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : void 0;
  };
}
var createFind_default = createFind;

// node_modules/lodash-es/findIndex.js
var nativeMax2 = Math.max;
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax2(length + index, 0);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index);
}
var findIndex_default = findIndex;

// node_modules/lodash-es/find.js
var find = createFind_default(findIndex_default);
var find_default = find;

// node_modules/lodash-es/head.js
function head(array) {
  return array && array.length ? array[0] : void 0;
}
var head_default = head;

// node_modules/lodash-es/_baseMap.js
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function (value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
var baseMap_default = baseMap;

// node_modules/lodash-es/map.js
function map(collection, iteratee) {
  var func = isArray_default(collection) ? arrayMap_default : baseMap_default;
  return func(collection, baseIteratee_default(iteratee, 3));
}
var map_default = map;

// node_modules/lodash-es/flatMap.js
function flatMap(collection, iteratee) {
  return baseFlatten_default(map_default(collection, iteratee), 1);
}
var flatMap_default = flatMap;

// node_modules/lodash-es/groupBy.js
var objectProto18 = Object.prototype;
var hasOwnProperty15 = objectProto18.hasOwnProperty;
var groupBy = createAggregator_default(function (result, value, key) {
  if (hasOwnProperty15.call(result, key)) {
    result[key].push(value);
  } else {
    baseAssignValue_default(result, key, [value]);
  }
});
var groupBy_default = groupBy;

// node_modules/lodash-es/_baseHas.js
var objectProto19 = Object.prototype;
var hasOwnProperty16 = objectProto19.hasOwnProperty;
function baseHas(object, key) {
  return object != null && hasOwnProperty16.call(object, key);
}
var baseHas_default = baseHas;

// node_modules/lodash-es/has.js
function has(object, path2) {
  return object != null && hasPath_default(object, path2, baseHas_default);
}
var has_default = has;

// node_modules/lodash-es/isString.js
var stringTag5 = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray_default(value) && isObjectLike_default(value) && baseGetTag_default(value) == stringTag5;
}
var isString_default = isString;

// node_modules/lodash-es/_baseValues.js
function baseValues(object, props) {
  return arrayMap_default(props, function (key) {
    return object[key];
  });
}
var baseValues_default = baseValues;

// node_modules/lodash-es/values.js
function values(object) {
  return object == null ? [] : baseValues_default(object, keys_default(object));
}
var values_default = values;

// node_modules/lodash-es/includes.js
var nativeMax3 = Math.max;
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike_default(collection) ? collection : values_default(collection);
  fromIndex = fromIndex && !guard ? toInteger_default(fromIndex) : 0;
  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax3(length + fromIndex, 0);
  }
  return isString_default(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf_default(collection, value, fromIndex) > -1;
}
var includes_default = includes;

// node_modules/lodash-es/indexOf.js
var nativeMax4 = Math.max;
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index < 0) {
    index = nativeMax4(length + index, 0);
  }
  return baseIndexOf_default(array, value, index);
}
var indexOf_default = indexOf;

// node_modules/lodash-es/isEmpty.js
var mapTag7 = "[object Map]";
var setTag7 = "[object Set]";
var objectProto20 = Object.prototype;
var hasOwnProperty17 = objectProto20.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_default(value) && (isArray_default(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer_default(value) || isTypedArray_default(value) || isArguments_default(value))) {
    return !value.length;
  }
  var tag = getTag_default(value);
  if (tag == mapTag7 || tag == setTag7) {
    return !value.size;
  }
  if (isPrototype_default(value)) {
    return !baseKeys_default(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty17.call(value, key)) {
      return false;
    }
  }
  return true;
}
var isEmpty_default = isEmpty;

// node_modules/lodash-es/_baseIsRegExp.js
var regexpTag5 = "[object RegExp]";
function baseIsRegExp(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == regexpTag5;
}
var baseIsRegExp_default = baseIsRegExp;

// node_modules/lodash-es/isRegExp.js
var nodeIsRegExp = nodeUtil_default && nodeUtil_default.isRegExp;
var isRegExp = nodeIsRegExp ? baseUnary_default(nodeIsRegExp) : baseIsRegExp_default;
var isRegExp_default = isRegExp;

// node_modules/lodash-es/isUndefined.js
function isUndefined(value) {
  return value === void 0;
}
var isUndefined_default = isUndefined;

// node_modules/lodash-es/negate.js
var FUNC_ERROR_TEXT2 = "Expected a function";
function negate(predicate) {
  if (typeof predicate != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  return function () {
    var args = arguments;
    switch (args.length) {
      case 0:
        return !predicate.call(this);
      case 1:
        return !predicate.call(this, args[0]);
      case 2:
        return !predicate.call(this, args[0], args[1]);
      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}
var negate_default = negate;

// node_modules/lodash-es/_baseSet.js
function baseSet(object, path2, value, customizer) {
  if (!isObject_default(object)) {
    return object;
  }
  path2 = castPath_default(path2, object);
  var index = -1, length = path2.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = toKey_default(path2[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject_default(objValue) ? objValue : isIndex_default(path2[index + 1]) ? [] : {};
      }
    }
    assignValue_default(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
var baseSet_default = baseSet;

// node_modules/lodash-es/_basePickBy.js
function basePickBy(object, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path2 = paths[index], value = baseGet_default(object, path2);
    if (predicate(value, path2)) {
      baseSet_default(result, castPath_default(path2, object), value);
    }
  }
  return result;
}
var basePickBy_default = basePickBy;

// node_modules/lodash-es/pickBy.js
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap_default(getAllKeysIn_default(object), function (prop) {
    return [prop];
  });
  predicate = baseIteratee_default(predicate);
  return basePickBy_default(object, props, function (value, path2) {
    return predicate(value, path2[0]);
  });
}
var pickBy_default = pickBy;

// node_modules/lodash-es/_baseReduce.js
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function (value, index, collection2) {
    accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
  });
  return accumulator;
}
var baseReduce_default = baseReduce;

// node_modules/lodash-es/reduce.js
function reduce(collection, iteratee, accumulator) {
  var func = isArray_default(collection) ? arrayReduce_default : baseReduce_default, initAccum = arguments.length < 3;
  return func(collection, baseIteratee_default(iteratee, 4), accumulator, initAccum, baseEach_default);
}
var reduce_default = reduce;

// node_modules/lodash-es/reject.js
function reject(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, negate_default(baseIteratee_default(predicate, 3)));
}
var reject_default = reject;

// node_modules/lodash-es/_baseSome.js
function baseSome(collection, predicate) {
  var result;
  baseEach_default(collection, function (value, index, collection2) {
    result = predicate(value, index, collection2);
    return !result;
  });
  return !!result;
}
var baseSome_default = baseSome;

// node_modules/lodash-es/some.js
function some(collection, predicate, guard) {
  var func = isArray_default(collection) ? arraySome_default : baseSome_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var some_default = some;

// node_modules/lodash-es/_createSet.js
var INFINITY4 = 1 / 0;
var createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY4) ? noop_default : function (values2) {
  return new Set_default(values2);
};
var createSet_default = createSet;

// node_modules/lodash-es/_baseUniq.js
var LARGE_ARRAY_SIZE3 = 200;
function baseUniq(array, iteratee, comparator) {
  var index = -1, includes2 = arrayIncludes_default, length = array.length, isCommon = true, result = [], seen = result;
  if (comparator) {
    isCommon = false;
    includes2 = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE3) {
    var set = iteratee ? null : createSet_default(array);
    if (set) {
      return setToArray_default(set);
    }
    isCommon = false;
    includes2 = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index], computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    } else if (!includes2(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}
var baseUniq_default = baseUniq;

// node_modules/lodash-es/uniq.js
function uniq(array) {
  return array && array.length ? baseUniq_default(array) : [];
}
var uniq_default = uniq;

// node_modules/@chevrotain/utils/lib/src/print.js
function PRINT_ERROR(msg) {
  if (console && console.error) {
    console.error(`Error: ${msg}`);
  }
}
function PRINT_WARNING(msg) {
  if (console && console.warn) {
    console.warn(`Warning: ${msg}`);
  }
}

// node_modules/@chevrotain/utils/lib/src/timer.js
function timer(func) {
  const start = (/* @__PURE__ */ new Date()).getTime();
  const val = func();
  const end = (/* @__PURE__ */ new Date()).getTime();
  const total = end - start;
  return { time: total, value: val };
}

// node_modules/@chevrotain/utils/lib/src/to-fast-properties.js
function toFastProperties(toBecomeFast) {
  function FakeConstructor() {
  }
  FakeConstructor.prototype = toBecomeFast;
  const fakeInstance = new FakeConstructor();
  function fakeAccess() {
    return typeof fakeInstance.bar;
  }
  fakeAccess();
  fakeAccess();
  if (1)
    return toBecomeFast;
  (0, eval)(toBecomeFast);
}

// node_modules/@chevrotain/gast/lib/src/model.js
function tokenLabel(tokType) {
  if (hasTokenLabel(tokType)) {
    return tokType.LABEL;
  } else {
    return tokType.name;
  }
}
function hasTokenLabel(obj) {
  return isString_default(obj.LABEL) && obj.LABEL !== "";
}
var AbstractProduction = class {
  get definition() {
    return this._definition;
  }
  set definition(value) {
    this._definition = value;
  }
  constructor(_definition) {
    this._definition = _definition;
  }
  accept(visitor2) {
    visitor2.visit(this);
    forEach_default(this.definition, (prod) => {
      prod.accept(visitor2);
    });
  }
};
var NonTerminal = class extends AbstractProduction {
  constructor(options) {
    super([]);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
  set definition(definition) {
  }
  get definition() {
    if (this.referencedRule !== void 0) {
      return this.referencedRule.definition;
    }
    return [];
  }
  accept(visitor2) {
    visitor2.visit(this);
  }
};
var Rule = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.orgText = "";
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Alternative = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.ignoreAmbiguities = false;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Option = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var RepetitionMandatory = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var RepetitionMandatoryWithSeparator = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Repetition = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var RepetitionWithSeparator = class extends AbstractProduction {
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Alternation = class extends AbstractProduction {
  get definition() {
    return this._definition;
  }
  set definition(value) {
    this._definition = value;
  }
  constructor(options) {
    super(options.definition);
    this.idx = 1;
    this.ignoreAmbiguities = false;
    this.hasPredicates = false;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
};
var Terminal = class {
  constructor(options) {
    this.idx = 1;
    assign_default(this, pickBy_default(options, (v) => v !== void 0));
  }
  accept(visitor2) {
    visitor2.visit(this);
  }
};
function serializeGrammar(topRules) {
  return map_default(topRules, serializeProduction);
}
function serializeProduction(node) {
  function convertDefinition(definition) {
    return map_default(definition, serializeProduction);
  }
  if (node instanceof NonTerminal) {
    const serializedNonTerminal = {
      type: "NonTerminal",
      name: node.nonTerminalName,
      idx: node.idx
    };
    if (isString_default(node.label)) {
      serializedNonTerminal.label = node.label;
    }
    return serializedNonTerminal;
  } else if (node instanceof Alternative) {
    return {
      type: "Alternative",
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Option) {
    return {
      type: "Option",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionMandatory) {
    return {
      type: "RepetitionMandatory",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionMandatoryWithSeparator) {
    return {
      type: "RepetitionMandatoryWithSeparator",
      idx: node.idx,
      separator: serializeProduction(new Terminal({ terminalType: node.separator })),
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof RepetitionWithSeparator) {
    return {
      type: "RepetitionWithSeparator",
      idx: node.idx,
      separator: serializeProduction(new Terminal({ terminalType: node.separator })),
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Repetition) {
    return {
      type: "Repetition",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Alternation) {
    return {
      type: "Alternation",
      idx: node.idx,
      definition: convertDefinition(node.definition)
    };
  } else if (node instanceof Terminal) {
    const serializedTerminal = {
      type: "Terminal",
      name: node.terminalType.name,
      label: tokenLabel(node.terminalType),
      idx: node.idx
    };
    if (isString_default(node.label)) {
      serializedTerminal.terminalLabel = node.label;
    }
    const pattern = node.terminalType.PATTERN;
    if (node.terminalType.PATTERN) {
      serializedTerminal.pattern = isRegExp_default(pattern) ? pattern.source : pattern;
    }
    return serializedTerminal;
  } else if (node instanceof Rule) {
    return {
      type: "Rule",
      name: node.name,
      orgText: node.orgText,
      definition: convertDefinition(node.definition)
    };
  } else {
    throw Error("non exhaustive match");
  }
}

// node_modules/@chevrotain/gast/lib/src/visitor.js
var GAstVisitor = class {
  visit(node) {
    const nodeAny = node;
    switch (nodeAny.constructor) {
      case NonTerminal:
        return this.visitNonTerminal(nodeAny);
      case Alternative:
        return this.visitAlternative(nodeAny);
      case Option:
        return this.visitOption(nodeAny);
      case RepetitionMandatory:
        return this.visitRepetitionMandatory(nodeAny);
      case RepetitionMandatoryWithSeparator:
        return this.visitRepetitionMandatoryWithSeparator(nodeAny);
      case RepetitionWithSeparator:
        return this.visitRepetitionWithSeparator(nodeAny);
      case Repetition:
        return this.visitRepetition(nodeAny);
      case Alternation:
        return this.visitAlternation(nodeAny);
      case Terminal:
        return this.visitTerminal(nodeAny);
      case Rule:
        return this.visitRule(nodeAny);
      default:
        throw Error("non exhaustive match");
    }
  }
  /* c8 ignore next */
  visitNonTerminal(node) {
  }
  /* c8 ignore next */
  visitAlternative(node) {
  }
  /* c8 ignore next */
  visitOption(node) {
  }
  /* c8 ignore next */
  visitRepetition(node) {
  }
  /* c8 ignore next */
  visitRepetitionMandatory(node) {
  }
  /* c8 ignore next 3 */
  visitRepetitionMandatoryWithSeparator(node) {
  }
  /* c8 ignore next */
  visitRepetitionWithSeparator(node) {
  }
  /* c8 ignore next */
  visitAlternation(node) {
  }
  /* c8 ignore next */
  visitTerminal(node) {
  }
  /* c8 ignore next */
  visitRule(node) {
  }
};

// node_modules/@chevrotain/gast/lib/src/helpers.js
function isSequenceProd(prod) {
  return prod instanceof Alternative || prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
}
function isOptionalProd(prod, alreadyVisited = []) {
  const isDirectlyOptional = prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionWithSeparator;
  if (isDirectlyOptional) {
    return true;
  }
  if (prod instanceof Alternation) {
    return some_default(prod.definition, (subProd) => {
      return isOptionalProd(subProd, alreadyVisited);
    });
  } else if (prod instanceof NonTerminal && includes_default(alreadyVisited, prod)) {
    return false;
  } else if (prod instanceof AbstractProduction) {
    if (prod instanceof NonTerminal) {
      alreadyVisited.push(prod);
    }
    return every_default(prod.definition, (subProd) => {
      return isOptionalProd(subProd, alreadyVisited);
    });
  } else {
    return false;
  }
}
function isBranchingProd(prod) {
  return prod instanceof Alternation;
}
function getProductionDslName(prod) {
  if (prod instanceof NonTerminal) {
    return "SUBRULE";
  } else if (prod instanceof Option) {
    return "OPTION";
  } else if (prod instanceof Alternation) {
    return "OR";
  } else if (prod instanceof RepetitionMandatory) {
    return "AT_LEAST_ONE";
  } else if (prod instanceof RepetitionMandatoryWithSeparator) {
    return "AT_LEAST_ONE_SEP";
  } else if (prod instanceof RepetitionWithSeparator) {
    return "MANY_SEP";
  } else if (prod instanceof Repetition) {
    return "MANY";
  } else if (prod instanceof Terminal) {
    return "CONSUME";
  } else {
    throw Error("non exhaustive match");
  }
}

// node_modules/chevrotain/lib/src/parse/grammar/rest.js
var RestWalker = class {
  walk(prod, prevRest = []) {
    forEach_default(prod.definition, (subProd, index) => {
      const currRest = drop_default(prod.definition, index + 1);
      if (subProd instanceof NonTerminal) {
        this.walkProdRef(subProd, currRest, prevRest);
      } else if (subProd instanceof Terminal) {
        this.walkTerminal(subProd, currRest, prevRest);
      } else if (subProd instanceof Alternative) {
        this.walkFlat(subProd, currRest, prevRest);
      } else if (subProd instanceof Option) {
        this.walkOption(subProd, currRest, prevRest);
      } else if (subProd instanceof RepetitionMandatory) {
        this.walkAtLeastOne(subProd, currRest, prevRest);
      } else if (subProd instanceof RepetitionMandatoryWithSeparator) {
        this.walkAtLeastOneSep(subProd, currRest, prevRest);
      } else if (subProd instanceof RepetitionWithSeparator) {
        this.walkManySep(subProd, currRest, prevRest);
      } else if (subProd instanceof Repetition) {
        this.walkMany(subProd, currRest, prevRest);
      } else if (subProd instanceof Alternation) {
        this.walkOr(subProd, currRest, prevRest);
      } else {
        throw Error("non exhaustive match");
      }
    });
  }
  walkTerminal(terminal, currRest, prevRest) {
  }
  walkProdRef(refProd, currRest, prevRest) {
  }
  walkFlat(flatProd, currRest, prevRest) {
    const fullOrRest = currRest.concat(prevRest);
    this.walk(flatProd, fullOrRest);
  }
  walkOption(optionProd, currRest, prevRest) {
    const fullOrRest = currRest.concat(prevRest);
    this.walk(optionProd, fullOrRest);
  }
  walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
    const fullAtLeastOneRest = [
      new Option({ definition: atLeastOneProd.definition })
    ].concat(currRest, prevRest);
    this.walk(atLeastOneProd, fullAtLeastOneRest);
  }
  walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
    const fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
    this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
  }
  walkMany(manyProd, currRest, prevRest) {
    const fullManyRest = [
      new Option({ definition: manyProd.definition })
    ].concat(currRest, prevRest);
    this.walk(manyProd, fullManyRest);
  }
  walkManySep(manySepProd, currRest, prevRest) {
    const fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
    this.walk(manySepProd, fullManySepRest);
  }
  walkOr(orProd, currRest, prevRest) {
    const fullOrRest = currRest.concat(prevRest);
    forEach_default(orProd.definition, (alt) => {
      const prodWrapper = new Alternative({ definition: [alt] });
      this.walk(prodWrapper, fullOrRest);
    });
  }
};
function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
  const repSepRest = [
    new Option({
      definition: [
        new Terminal({ terminalType: repSepProd.separator })
      ].concat(repSepProd.definition)
    })
  ];
  const fullRepSepRest = repSepRest.concat(currRest, prevRest);
  return fullRepSepRest;
}

// node_modules/chevrotain/lib/src/parse/grammar/first.js
function first(prod) {
  if (prod instanceof NonTerminal) {
    return first(prod.referencedRule);
  } else if (prod instanceof Terminal) {
    return firstForTerminal(prod);
  } else if (isSequenceProd(prod)) {
    return firstForSequence(prod);
  } else if (isBranchingProd(prod)) {
    return firstForBranching(prod);
  } else {
    throw Error("non exhaustive match");
  }
}
function firstForSequence(prod) {
  let firstSet = [];
  const seq = prod.definition;
  let nextSubProdIdx = 0;
  let hasInnerProdsRemaining = seq.length > nextSubProdIdx;
  let currSubProd;
  let isLastInnerProdOptional = true;
  while (hasInnerProdsRemaining && isLastInnerProdOptional) {
    currSubProd = seq[nextSubProdIdx];
    isLastInnerProdOptional = isOptionalProd(currSubProd);
    firstSet = firstSet.concat(first(currSubProd));
    nextSubProdIdx = nextSubProdIdx + 1;
    hasInnerProdsRemaining = seq.length > nextSubProdIdx;
  }
  return uniq_default(firstSet);
}
function firstForBranching(prod) {
  const allAlternativesFirsts = map_default(prod.definition, (innerProd) => {
    return first(innerProd);
  });
  return uniq_default(flatten_default(allAlternativesFirsts));
}
function firstForTerminal(terminal) {
  return [terminal.terminalType];
}

// node_modules/chevrotain/lib/src/parse/constants.js
var IN = "_~IN~_";

// node_modules/chevrotain/lib/src/parse/grammar/follow.js
var ResyncFollowsWalker = class extends RestWalker {
  constructor(topProd) {
    super();
    this.topProd = topProd;
    this.follows = {};
  }
  startWalking() {
    this.walk(this.topProd);
    return this.follows;
  }
  walkTerminal(terminal, currRest, prevRest) {
  }
  walkProdRef(refProd, currRest, prevRest) {
    const followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
    const fullRest = currRest.concat(prevRest);
    const restProd = new Alternative({ definition: fullRest });
    const t_in_topProd_follows = first(restProd);
    this.follows[followName] = t_in_topProd_follows;
  }
};
function computeAllProdsFollows(topProductions) {
  const reSyncFollows = {};
  forEach_default(topProductions, (topProd) => {
    const currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
    assign_default(reSyncFollows, currRefsFollow);
  });
  return reSyncFollows;
}
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
  return inner.name + occurenceInParent + IN;
}

// node_modules/@chevrotain/regexp-to-ast/lib/src/utils.js
function cc(char) {
  return char.charCodeAt(0);
}
function insertToSet(item, set) {
  if (Array.isArray(item)) {
    item.forEach(function (subItem) {
      set.push(subItem);
    });
  } else {
    set.push(item);
  }
}
function addFlag(flagObj, flagKey) {
  if (flagObj[flagKey] === true) {
    throw "duplicate flag " + flagKey;
  }
  const x = flagObj[flagKey];
  flagObj[flagKey] = true;
}
function ASSERT_EXISTS(obj) {
  if (obj === void 0) {
    throw Error("Internal Error - Should never get here!");
  }
  return true;
}
function ASSERT_NEVER_REACH_HERE() {
  throw Error("Internal Error - Should never get here!");
}
function isCharacter(obj) {
  return obj["type"] === "Character";
}

// node_modules/@chevrotain/regexp-to-ast/lib/src/character-classes.js
var digitsCharCodes = [];
for (let i = cc("0"); i <= cc("9"); i++) {
  digitsCharCodes.push(i);
}
var wordCharCodes = [cc("_")].concat(digitsCharCodes);
for (let i = cc("a"); i <= cc("z"); i++) {
  wordCharCodes.push(i);
}
for (let i = cc("A"); i <= cc("Z"); i++) {
  wordCharCodes.push(i);
}
var whitespaceCodes = [
  cc(" "),
  cc("\f"),
  cc("\n"),
  cc("\r"),
  cc("	"),
  cc("\v"),
  cc("	"),
  cc("\xA0"),
  cc("\u1680"),
  cc("\u2000"),
  cc("\u2001"),
  cc("\u2002"),
  cc("\u2003"),
  cc("\u2004"),
  cc("\u2005"),
  cc("\u2006"),
  cc("\u2007"),
  cc("\u2008"),
  cc("\u2009"),
  cc("\u200A"),
  cc("\u2028"),
  cc("\u2029"),
  cc("\u202F"),
  cc("\u205F"),
  cc("\u3000"),
  cc("\uFEFF")
];

// node_modules/@chevrotain/regexp-to-ast/lib/src/regexp-parser.js
var hexDigitPattern = /[0-9a-fA-F]/;
var decimalPattern = /[0-9]/;
var decimalPatternNoZero = /[1-9]/;
var RegExpParser = class {
  constructor() {
    this.idx = 0;
    this.input = "";
    this.groupIdx = 0;
  }
  saveState() {
    return {
      idx: this.idx,
      input: this.input,
      groupIdx: this.groupIdx
    };
  }
  restoreState(newState) {
    this.idx = newState.idx;
    this.input = newState.input;
    this.groupIdx = newState.groupIdx;
  }
  pattern(input) {
    this.idx = 0;
    this.input = input;
    this.groupIdx = 0;
    this.consumeChar("/");
    const value = this.disjunction();
    this.consumeChar("/");
    const flags = {
      type: "Flags",
      loc: { begin: this.idx, end: input.length },
      global: false,
      ignoreCase: false,
      multiLine: false,
      unicode: false,
      sticky: false
    };
    while (this.isRegExpFlag()) {
      switch (this.popChar()) {
        case "g":
          addFlag(flags, "global");
          break;
        case "i":
          addFlag(flags, "ignoreCase");
          break;
        case "m":
          addFlag(flags, "multiLine");
          break;
        case "u":
          addFlag(flags, "unicode");
          break;
        case "y":
          addFlag(flags, "sticky");
          break;
      }
    }
    if (this.idx !== this.input.length) {
      throw Error("Redundant input: " + this.input.substring(this.idx));
    }
    return {
      type: "Pattern",
      flags,
      value,
      loc: this.loc(0)
    };
  }
  disjunction() {
    const alts = [];
    const begin = this.idx;
    alts.push(this.alternative());
    while (this.peekChar() === "|") {
      this.consumeChar("|");
      alts.push(this.alternative());
    }
    return { type: "Disjunction", value: alts, loc: this.loc(begin) };
  }
  alternative() {
    const terms = [];
    const begin = this.idx;
    while (this.isTerm()) {
      terms.push(this.term());
    }
    return { type: "Alternative", value: terms, loc: this.loc(begin) };
  }
  term() {
    if (this.isAssertion()) {
      return this.assertion();
    } else {
      return this.atom();
    }
  }
  assertion() {
    const begin = this.idx;
    switch (this.popChar()) {
      case "^":
        return {
          type: "StartAnchor",
          loc: this.loc(begin)
        };
      case "$":
        return { type: "EndAnchor", loc: this.loc(begin) };
      case "\\":
        switch (this.popChar()) {
          case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(begin)
            };
          case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(begin)
            };
        }
        throw Error("Invalid Assertion Escape");
      case "(":
        this.consumeChar("?");
        let type;
        switch (this.popChar()) {
          case "=":
            type = "Lookahead";
            break;
          case "!":
            type = "NegativeLookahead";
            break;
          case "<": {
            switch (this.popChar()) {
              case "=":
                type = "Lookbehind";
                break;
              case "!":
                type = "NegativeLookbehind";
            }
            break;
          }
        }
        ASSERT_EXISTS(type);
        const disjunction = this.disjunction();
        this.consumeChar(")");
        return {
          type,
          value: disjunction,
          loc: this.loc(begin)
        };
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  quantifier(isBacktracking = false) {
    let range = void 0;
    const begin = this.idx;
    switch (this.popChar()) {
      case "*":
        range = {
          atLeast: 0,
          atMost: Infinity
        };
        break;
      case "+":
        range = {
          atLeast: 1,
          atMost: Infinity
        };
        break;
      case "?":
        range = {
          atLeast: 0,
          atMost: 1
        };
        break;
      case "{":
        const atLeast = this.integerIncludingZero();
        switch (this.popChar()) {
          case "}":
            range = {
              atLeast,
              atMost: atLeast
            };
            break;
          case ",":
            let atMost;
            if (this.isDigit()) {
              atMost = this.integerIncludingZero();
              range = {
                atLeast,
                atMost
              };
            } else {
              range = {
                atLeast,
                atMost: Infinity
              };
            }
            this.consumeChar("}");
            break;
        }
        if (isBacktracking === true && range === void 0) {
          return void 0;
        }
        ASSERT_EXISTS(range);
        break;
    }
    if (isBacktracking === true && range === void 0) {
      return void 0;
    }
    if (ASSERT_EXISTS(range)) {
      if (this.peekChar(0) === "?") {
        this.consumeChar("?");
        range.greedy = false;
      } else {
        range.greedy = true;
      }
      range.type = "Quantifier";
      range.loc = this.loc(begin);
      return range;
    }
  }
  atom() {
    let atom;
    const begin = this.idx;
    switch (this.peekChar()) {
      case ".":
        atom = this.dotAll();
        break;
      case "\\":
        atom = this.atomEscape();
        break;
      case "[":
        atom = this.characterClass();
        break;
      case "(":
        atom = this.group();
        break;
    }
    if (atom === void 0 && this.isPatternCharacter()) {
      atom = this.patternCharacter();
    }
    if (ASSERT_EXISTS(atom)) {
      atom.loc = this.loc(begin);
      if (this.isQuantifier()) {
        atom.quantifier = this.quantifier();
      }
      return atom;
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  dotAll() {
    this.consumeChar(".");
    return {
      type: "Set",
      complement: true,
      value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
    };
  }
  atomEscape() {
    this.consumeChar("\\");
    switch (this.peekChar()) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return this.decimalEscapeAtom();
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  decimalEscapeAtom() {
    const value = this.positiveInteger();
    return { type: "GroupBackReference", value };
  }
  characterClassEscape() {
    let set;
    let complement = false;
    switch (this.popChar()) {
      case "d":
        set = digitsCharCodes;
        break;
      case "D":
        set = digitsCharCodes;
        complement = true;
        break;
      case "s":
        set = whitespaceCodes;
        break;
      case "S":
        set = whitespaceCodes;
        complement = true;
        break;
      case "w":
        set = wordCharCodes;
        break;
      case "W":
        set = wordCharCodes;
        complement = true;
        break;
    }
    if (ASSERT_EXISTS(set)) {
      return { type: "Set", value: set, complement };
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  controlEscapeAtom() {
    let escapeCode;
    switch (this.popChar()) {
      case "f":
        escapeCode = cc("\f");
        break;
      case "n":
        escapeCode = cc("\n");
        break;
      case "r":
        escapeCode = cc("\r");
        break;
      case "t":
        escapeCode = cc("	");
        break;
      case "v":
        escapeCode = cc("\v");
        break;
    }
    if (ASSERT_EXISTS(escapeCode)) {
      return { type: "Character", value: escapeCode };
    }
    return ASSERT_NEVER_REACH_HERE();
  }
  controlLetterEscapeAtom() {
    this.consumeChar("c");
    const letter = this.popChar();
    if (/[a-zA-Z]/.test(letter) === false) {
      throw Error("Invalid ");
    }
    const letterCode = letter.toUpperCase().charCodeAt(0) - 64;
    return { type: "Character", value: letterCode };
  }
  nulCharacterAtom() {
    this.consumeChar("0");
    return { type: "Character", value: cc("\0") };
  }
  hexEscapeSequenceAtom() {
    this.consumeChar("x");
    return this.parseHexDigits(2);
  }
  regExpUnicodeEscapeSequenceAtom() {
    this.consumeChar("u");
    return this.parseHexDigits(4);
  }
  identityEscapeAtom() {
    const escapedChar = this.popChar();
    return { type: "Character", value: cc(escapedChar) };
  }
  classPatternCharacterAtom() {
    switch (this.peekChar()) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
      case "\\":
      case "]":
        throw Error("TBD");
      default:
        const nextChar = this.popChar();
        return { type: "Character", value: cc(nextChar) };
    }
  }
  characterClass() {
    const set = [];
    let complement = false;
    this.consumeChar("[");
    if (this.peekChar(0) === "^") {
      this.consumeChar("^");
      complement = true;
    }
    while (this.isClassAtom()) {
      const from = this.classAtom();
      const isFromSingleChar = from.type === "Character";
      if (isCharacter(from) && this.isRangeDash()) {
        this.consumeChar("-");
        const to = this.classAtom();
        const isToSingleChar = to.type === "Character";
        if (isCharacter(to)) {
          if (to.value < from.value) {
            throw Error("Range out of order in character class");
          }
          set.push({ from: from.value, to: to.value });
        } else {
          insertToSet(from.value, set);
          set.push(cc("-"));
          insertToSet(to.value, set);
        }
      } else {
        insertToSet(from.value, set);
      }
    }
    this.consumeChar("]");
    return { type: "Set", complement, value: set };
  }
  classAtom() {
    switch (this.peekChar()) {
      case "]":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        throw Error("TBD");
      case "\\":
        return this.classEscape();
      default:
        return this.classPatternCharacterAtom();
    }
  }
  classEscape() {
    this.consumeChar("\\");
    switch (this.peekChar()) {
      case "b":
        this.consumeChar("b");
        return { type: "Character", value: cc("\b") };
      case "d":
      case "D":
      case "s":
      case "S":
      case "w":
      case "W":
        return this.characterClassEscape();
      case "f":
      case "n":
      case "r":
      case "t":
      case "v":
        return this.controlEscapeAtom();
      case "c":
        return this.controlLetterEscapeAtom();
      case "0":
        return this.nulCharacterAtom();
      case "x":
        return this.hexEscapeSequenceAtom();
      case "u":
        return this.regExpUnicodeEscapeSequenceAtom();
      default:
        return this.identityEscapeAtom();
    }
  }
  group() {
    let capturing = true;
    this.consumeChar("(");
    switch (this.peekChar(0)) {
      case "?":
        this.consumeChar("?");
        this.consumeChar(":");
        capturing = false;
        break;
      default:
        this.groupIdx++;
        break;
    }
    const value = this.disjunction();
    this.consumeChar(")");
    const groupAst = {
      type: "Group",
      capturing,
      value
    };
    if (capturing) {
      groupAst["idx"] = this.groupIdx;
    }
    return groupAst;
  }
  positiveInteger() {
    let number = this.popChar();
    if (decimalPatternNoZero.test(number) === false) {
      throw Error("Expecting a positive integer");
    }
    while (decimalPattern.test(this.peekChar(0))) {
      number += this.popChar();
    }
    return parseInt(number, 10);
  }
  integerIncludingZero() {
    let number = this.popChar();
    if (decimalPattern.test(number) === false) {
      throw Error("Expecting an integer");
    }
    while (decimalPattern.test(this.peekChar(0))) {
      number += this.popChar();
    }
    return parseInt(number, 10);
  }
  patternCharacter() {
    const nextChar = this.popChar();
    switch (nextChar) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
        throw Error("TBD");
      default:
        return { type: "Character", value: cc(nextChar) };
    }
  }
  isRegExpFlag() {
    switch (this.peekChar(0)) {
      case "g":
      case "i":
      case "m":
      case "u":
      case "y":
        return true;
      default:
        return false;
    }
  }
  isRangeDash() {
    return this.peekChar() === "-" && this.isClassAtom(1);
  }
  isDigit() {
    return decimalPattern.test(this.peekChar(0));
  }
  isClassAtom(howMuch = 0) {
    switch (this.peekChar(howMuch)) {
      case "]":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  isTerm() {
    return this.isAtom() || this.isAssertion();
  }
  isAtom() {
    if (this.isPatternCharacter()) {
      return true;
    }
    switch (this.peekChar(0)) {
      case ".":
      case "\\":
      case "[":
      case "(":
        return true;
      default:
        return false;
    }
  }
  isAssertion() {
    switch (this.peekChar(0)) {
      case "^":
      case "$":
        return true;
      case "\\":
        switch (this.peekChar(1)) {
          case "b":
          case "B":
            return true;
          default:
            return false;
        }
      case "(":
        return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!" || this.peekChar(2) === "<" && (this.peekChar(3) === "=" || this.peekChar(3) === "!"));
      default:
        return false;
    }
  }
  isQuantifier() {
    const prevState = this.saveState();
    try {
      return this.quantifier(true) !== void 0;
    } catch (e) {
      return false;
    } finally {
      this.restoreState(prevState);
    }
  }
  isPatternCharacter() {
    switch (this.peekChar()) {
      case "^":
      case "$":
      case "\\":
      case ".":
      case "*":
      case "+":
      case "?":
      case "(":
      case ")":
      case "[":
      case "|":
      case "/":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        return false;
      default:
        return true;
    }
  }
  parseHexDigits(howMany) {
    let hexString = "";
    for (let i = 0; i < howMany; i++) {
      const hexChar = this.popChar();
      if (hexDigitPattern.test(hexChar) === false) {
        throw Error("Expecting a HexDecimal digits");
      }
      hexString += hexChar;
    }
    const charCode = parseInt(hexString, 16);
    return { type: "Character", value: charCode };
  }
  peekChar(howMuch = 0) {
    return this.input[this.idx + howMuch];
  }
  popChar() {
    const nextChar = this.peekChar(0);
    this.consumeChar(void 0);
    return nextChar;
  }
  consumeChar(char) {
    if (char !== void 0 && this.input[this.idx] !== char) {
      throw Error("Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
    }
    if (this.idx >= this.input.length) {
      throw Error("Unexpected end of input");
    }
    this.idx++;
  }
  loc(begin) {
    return { begin, end: this.idx };
  }
};

// node_modules/@chevrotain/regexp-to-ast/lib/src/base-regexp-visitor.js
var BaseRegExpVisitor = class {
  visitChildren(node) {
    for (const key in node) {
      const child = node[key];
      if (node.hasOwnProperty(key)) {
        if (child.type !== void 0) {
          this.visit(child);
        } else if (Array.isArray(child)) {
          child.forEach((subChild) => {
            this.visit(subChild);
          }, this);
        }
      }
    }
  }
  visit(node) {
    switch (node.type) {
      case "Pattern":
        this.visitPattern(node);
        break;
      case "Flags":
        this.visitFlags(node);
        break;
      case "Disjunction":
        this.visitDisjunction(node);
        break;
      case "Alternative":
        this.visitAlternative(node);
        break;
      case "StartAnchor":
        this.visitStartAnchor(node);
        break;
      case "EndAnchor":
        this.visitEndAnchor(node);
        break;
      case "WordBoundary":
        this.visitWordBoundary(node);
        break;
      case "NonWordBoundary":
        this.visitNonWordBoundary(node);
        break;
      case "Lookahead":
        this.visitLookahead(node);
        break;
      case "NegativeLookahead":
        this.visitNegativeLookahead(node);
        break;
      case "Lookbehind":
        this.visitLookbehind(node);
        break;
      case "NegativeLookbehind":
        this.visitNegativeLookbehind(node);
        break;
      case "Character":
        this.visitCharacter(node);
        break;
      case "Set":
        this.visitSet(node);
        break;
      case "Group":
        this.visitGroup(node);
        break;
      case "GroupBackReference":
        this.visitGroupBackReference(node);
        break;
      case "Quantifier":
        this.visitQuantifier(node);
        break;
    }
    this.visitChildren(node);
  }
  visitPattern(node) {
  }
  visitFlags(node) {
  }
  visitDisjunction(node) {
  }
  visitAlternative(node) {
  }
  // Assertion
  visitStartAnchor(node) {
  }
  visitEndAnchor(node) {
  }
  visitWordBoundary(node) {
  }
  visitNonWordBoundary(node) {
  }
  visitLookahead(node) {
  }
  visitNegativeLookahead(node) {
  }
  visitLookbehind(node) {
  }
  visitNegativeLookbehind(node) {
  }
  // atoms
  visitCharacter(node) {
  }
  visitSet(node) {
  }
  visitGroup(node) {
  }
  visitGroupBackReference(node) {
  }
  visitQuantifier(node) {
  }
};

// node_modules/chevrotain/lib/src/scan/reg_exp_parser.js
var regExpAstCache = {};
var regExpParser = new RegExpParser();
function getRegExpAst(regExp) {
  const regExpStr = regExp.toString();
  if (regExpAstCache.hasOwnProperty(regExpStr)) {
    return regExpAstCache[regExpStr];
  } else {
    const regExpAst = regExpParser.pattern(regExpStr);
    regExpAstCache[regExpStr] = regExpAst;
    return regExpAst;
  }
}
function clearRegExpParserCache() {
  regExpAstCache = {};
}

// node_modules/chevrotain/lib/src/scan/reg_exp.js
var complementErrorMessage = "Complement Sets are not supported for first char optimization";
var failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
function getOptimizedStartCodesIndices(regExp, ensureOptimizations = false) {
  try {
    const ast = getRegExpAst(regExp);
    const firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
    return firstChars;
  } catch (e) {
    if (e.message === complementErrorMessage) {
      if (ensureOptimizations) {
        PRINT_WARNING(`${failedOptimizationPrefixMsg}	Unable to optimize: < ${regExp.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
      }
    } else {
      let msgSuffix = "";
      if (ensureOptimizations) {
        msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
      }
      PRINT_ERROR(`${failedOptimizationPrefixMsg}
	Failed parsing: < ${regExp.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + msgSuffix);
    }
  }
  return [];
}
function firstCharOptimizedIndices(ast, result, ignoreCase) {
  switch (ast.type) {
    case "Disjunction":
      for (let i = 0; i < ast.value.length; i++) {
        firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
      }
      break;
    case "Alternative":
      const terms = ast.value;
      for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        switch (term.type) {
          case "EndAnchor":
          case "GroupBackReference":
          case "Lookahead":
          case "NegativeLookahead":
          case "Lookbehind":
          case "NegativeLookbehind":
          case "StartAnchor":
          case "WordBoundary":
          case "NonWordBoundary":
            continue;
        }
        const atom = term;
        switch (atom.type) {
          case "Character":
            addOptimizedIdxToResult(atom.value, result, ignoreCase);
            break;
          case "Set":
            if (atom.complement === true) {
              throw Error(complementErrorMessage);
            }
            forEach_default(atom.value, (code) => {
              if (typeof code === "number") {
                addOptimizedIdxToResult(code, result, ignoreCase);
              } else {
                const range = code;
                if (ignoreCase === true) {
                  for (let rangeCode = range.from; rangeCode <= range.to; rangeCode++) {
                    addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                  }
                } else {
                  for (let rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) {
                    addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                  }
                  if (range.to >= minOptimizationVal) {
                    const minUnOptVal = range.from >= minOptimizationVal ? range.from : minOptimizationVal;
                    const maxUnOptVal = range.to;
                    const minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
                    const maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
                    for (let currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                      result[currOptIdx] = currOptIdx;
                    }
                  }
                }
              }
            });
            break;
          case "Group":
            firstCharOptimizedIndices(atom.value, result, ignoreCase);
            break;
          default:
            throw Error("Non Exhaustive Match");
        }
        const isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
        if (
          // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          atom.type === "Group" && isWholeOptional(atom) === false || // If this term is not a group it may only be optional if it has an optional quantifier
          atom.type !== "Group" && isOptionalQuantifier === false
        ) {
          break;
        }
      }
      break;
    default:
      throw Error("non exhaustive match!");
  }
  return values_default(result);
}
function addOptimizedIdxToResult(code, result, ignoreCase) {
  const optimizedCharIdx = charCodeToOptimizedIndex(code);
  result[optimizedCharIdx] = optimizedCharIdx;
  if (ignoreCase === true) {
    handleIgnoreCase(code, result);
  }
}
function handleIgnoreCase(code, result) {
  const char = String.fromCharCode(code);
  const upperChar = char.toUpperCase();
  if (upperChar !== char) {
    const optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
    result[optimizedCharIdx] = optimizedCharIdx;
  } else {
    const lowerChar = char.toLowerCase();
    if (lowerChar !== char) {
      const optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
      result[optimizedCharIdx] = optimizedCharIdx;
    }
  }
}
function findCode(setNode, targetCharCodes) {
  return find_default(setNode.value, (codeOrRange) => {
    if (typeof codeOrRange === "number") {
      return includes_default(targetCharCodes, codeOrRange);
    } else {
      const range = codeOrRange;
      return find_default(targetCharCodes, (targetCode) => range.from <= targetCode && targetCode <= range.to) !== void 0;
    }
  });
}
function isWholeOptional(ast) {
  const quantifier = ast.quantifier;
  if (quantifier && quantifier.atLeast === 0) {
    return true;
  }
  if (!ast.value) {
    return false;
  }
  return isArray_default(ast.value) ? every_default(ast.value, isWholeOptional) : isWholeOptional(ast.value);
}
var CharCodeFinder = class extends BaseRegExpVisitor {
  constructor(targetCharCodes) {
    super();
    this.targetCharCodes = targetCharCodes;
    this.found = false;
  }
  visitChildren(node) {
    if (this.found === true) {
      return;
    }
    switch (node.type) {
      case "Lookahead":
        this.visitLookahead(node);
        return;
      case "NegativeLookahead":
        this.visitNegativeLookahead(node);
        return;
      case "Lookbehind":
        this.visitLookbehind(node);
        return;
      case "NegativeLookbehind":
        this.visitNegativeLookbehind(node);
        return;
    }
    super.visitChildren(node);
  }
  visitCharacter(node) {
    if (includes_default(this.targetCharCodes, node.value)) {
      this.found = true;
    }
  }
  visitSet(node) {
    if (node.complement) {
      if (findCode(node, this.targetCharCodes) === void 0) {
        this.found = true;
      }
    } else {
      if (findCode(node, this.targetCharCodes) !== void 0) {
        this.found = true;
      }
    }
  }
};
function canMatchCharCode(charCodes, pattern) {
  if (pattern instanceof RegExp) {
    const ast = getRegExpAst(pattern);
    const charCodeFinder = new CharCodeFinder(charCodes);
    charCodeFinder.visit(ast);
    return charCodeFinder.found;
  } else {
    return find_default(pattern, (char) => {
      return includes_default(charCodes, char.charCodeAt(0));
    }) !== void 0;
  }
}

// node_modules/chevrotain/lib/src/scan/lexer.js
var PATTERN = "PATTERN";
var DEFAULT_MODE = "defaultMode";
var MODES = "modes";
function analyzeTokenTypes(tokenTypes, options) {
  options = defaults_default(options, {
    debug: false,
    safeMode: false,
    positionTracking: "full",
    lineTerminatorCharacters: ["\r", "\n"],
    tracer: (msg, action) => action()
  });
  const tracer = options.tracer;
  tracer("initCharCodeToOptimizedIndexMap", () => {
    initCharCodeToOptimizedIndexMap();
  });
  let onlyRelevantTypes;
  tracer("Reject Lexer.NA", () => {
    onlyRelevantTypes = reject_default(tokenTypes, (currType) => {
      return currType[PATTERN] === Lexer.NA;
    });
  });
  let hasCustom = false;
  let allTransformedPatterns;
  tracer("Transform Patterns", () => {
    hasCustom = false;
    allTransformedPatterns = map_default(onlyRelevantTypes, (currType) => {
      const currPattern = currType[PATTERN];
      if (isRegExp_default(currPattern)) {
        const regExpSource = currPattern.source;
        if (regExpSource.length === 1 && // only these regExp meta characters which can appear in a length one regExp
          regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) {
          return regExpSource;
        } else if (regExpSource.length === 2 && regExpSource[0] === "\\" && // not a meta character
          !includes_default([
            "d",
            "D",
            "s",
            "S",
            "t",
            "r",
            "n",
            "t",
            "0",
            "c",
            "b",
            "B",
            "f",
            "v",
            "w",
            "W"
          ], regExpSource[1])) {
          return regExpSource[1];
        } else {
          return addStickyFlag(currPattern);
        }
      } else if (isFunction_default(currPattern)) {
        hasCustom = true;
        return { exec: currPattern };
      } else if (typeof currPattern === "object") {
        hasCustom = true;
        return currPattern;
      } else if (typeof currPattern === "string") {
        if (currPattern.length === 1) {
          return currPattern;
        } else {
          const escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
          const wrappedRegExp = new RegExp(escapedRegExpString);
          return addStickyFlag(wrappedRegExp);
        }
      } else {
        throw Error("non exhaustive match");
      }
    });
  });
  let patternIdxToType;
  let patternIdxToGroup;
  let patternIdxToLongerAltIdxArr;
  let patternIdxToPushMode;
  let patternIdxToPopMode;
  tracer("misc mapping", () => {
    patternIdxToType = map_default(onlyRelevantTypes, (currType) => currType.tokenTypeIdx);
    patternIdxToGroup = map_default(onlyRelevantTypes, (clazz) => {
      const groupName = clazz.GROUP;
      if (groupName === Lexer.SKIPPED) {
        return void 0;
      } else if (isString_default(groupName)) {
        return groupName;
      } else if (isUndefined_default(groupName)) {
        return false;
      } else {
        throw Error("non exhaustive match");
      }
    });
    patternIdxToLongerAltIdxArr = map_default(onlyRelevantTypes, (clazz) => {
      const longerAltType = clazz.LONGER_ALT;
      if (longerAltType) {
        const longerAltIdxArr = isArray_default(longerAltType) ? map_default(longerAltType, (type) => indexOf_default(onlyRelevantTypes, type)) : [indexOf_default(onlyRelevantTypes, longerAltType)];
        return longerAltIdxArr;
      }
    });
    patternIdxToPushMode = map_default(onlyRelevantTypes, (clazz) => clazz.PUSH_MODE);
    patternIdxToPopMode = map_default(onlyRelevantTypes, (clazz) => has_default(clazz, "POP_MODE"));
  });
  let patternIdxToCanLineTerminator;
  tracer("Line Terminator Handling", () => {
    const lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
    patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => false);
    if (options.positionTracking !== "onlyOffset") {
      patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => {
        if (has_default(tokType, "LINE_BREAKS")) {
          return !!tokType.LINE_BREAKS;
        } else {
          return checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false && canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
        }
      });
    }
  });
  let patternIdxToIsCustom;
  let patternIdxToShort;
  let emptyGroups;
  let patternIdxToConfig;
  tracer("Misc Mapping #2", () => {
    patternIdxToIsCustom = map_default(onlyRelevantTypes, isCustomPattern);
    patternIdxToShort = map_default(allTransformedPatterns, isShortPattern);
    emptyGroups = reduce_default(onlyRelevantTypes, (acc, clazz) => {
      const groupName = clazz.GROUP;
      if (isString_default(groupName) && !(groupName === Lexer.SKIPPED)) {
        acc[groupName] = [];
      }
      return acc;
    }, {});
    patternIdxToConfig = map_default(allTransformedPatterns, (x, idx) => {
      return {
        pattern: allTransformedPatterns[idx],
        longerAlt: patternIdxToLongerAltIdxArr[idx],
        canLineTerminator: patternIdxToCanLineTerminator[idx],
        isCustom: patternIdxToIsCustom[idx],
        short: patternIdxToShort[idx],
        group: patternIdxToGroup[idx],
        push: patternIdxToPushMode[idx],
        pop: patternIdxToPopMode[idx],
        tokenTypeIdx: patternIdxToType[idx],
        tokenType: onlyRelevantTypes[idx]
      };
    });
  });
  let canBeOptimized = true;
  let charCodeToPatternIdxToConfig = [];
  if (!options.safeMode) {
    tracer("First Char Optimization", () => {
      charCodeToPatternIdxToConfig = reduce_default(onlyRelevantTypes, (result, currTokType, idx) => {
        if (typeof currTokType.PATTERN === "string") {
          const charCode = currTokType.PATTERN.charCodeAt(0);
          const optimizedIdx = charCodeToOptimizedIndex(charCode);
          addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
        } else if (isArray_default(currTokType.START_CHARS_HINT)) {
          let lastOptimizedIdx;
          forEach_default(currTokType.START_CHARS_HINT, (charOrInt) => {
            const charCode = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
            const currOptimizedIdx = charCodeToOptimizedIndex(charCode);
            if (lastOptimizedIdx !== currOptimizedIdx) {
              lastOptimizedIdx = currOptimizedIdx;
              addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
            }
          });
        } else if (isRegExp_default(currTokType.PATTERN)) {
          if (currTokType.PATTERN.unicode) {
            canBeOptimized = false;
            if (options.ensureOptimizations) {
              PRINT_ERROR(`${failedOptimizationPrefixMsg}	Unable to analyze < ${currTokType.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
            }
          } else {
            const optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
            if (isEmpty_default(optimizedCodes)) {
              canBeOptimized = false;
            }
            forEach_default(optimizedCodes, (code) => {
              addToMapOfArrays(result, code, patternIdxToConfig[idx]);
            });
          }
        } else {
          if (options.ensureOptimizations) {
            PRINT_ERROR(`${failedOptimizationPrefixMsg}	TokenType: <${currTokType.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`);
          }
          canBeOptimized = false;
        }
        return result;
      }, []);
    });
  }
  return {
    emptyGroups,
    patternIdxToConfig,
    charCodeToPatternIdxToConfig,
    hasCustom,
    canBeOptimized
  };
}
function validatePatterns(tokenTypes, validModesNames) {
  let errors = [];
  const missingResult = findMissingPatterns(tokenTypes);
  errors = errors.concat(missingResult.errors);
  const invalidResult = findInvalidPatterns(missingResult.valid);
  const validTokenTypes = invalidResult.valid;
  errors = errors.concat(invalidResult.errors);
  errors = errors.concat(validateRegExpPattern(validTokenTypes));
  errors = errors.concat(findInvalidGroupType(validTokenTypes));
  errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
  errors = errors.concat(findUnreachablePatterns(validTokenTypes));
  return errors;
}
function validateRegExpPattern(tokenTypes) {
  let errors = [];
  const withRegExpPatterns = filter_default(tokenTypes, (currTokType) => isRegExp_default(currTokType[PATTERN]));
  errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
  errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
  errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
  errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
  errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
  return errors;
}
function findMissingPatterns(tokenTypes) {
  const tokenTypesWithMissingPattern = filter_default(tokenTypes, (currType) => {
    return !has_default(currType, PATTERN);
  });
  const errors = map_default(tokenTypesWithMissingPattern, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
      type: LexerDefinitionErrorType.MISSING_PATTERN,
      tokenTypes: [currType]
    };
  });
  const valid = difference_default(tokenTypes, tokenTypesWithMissingPattern);
  return { errors, valid };
}
function findInvalidPatterns(tokenTypes) {
  const tokenTypesWithInvalidPattern = filter_default(tokenTypes, (currType) => {
    const pattern = currType[PATTERN];
    return !isRegExp_default(pattern) && !isFunction_default(pattern) && !has_default(pattern, "exec") && !isString_default(pattern);
  });
  const errors = map_default(tokenTypesWithInvalidPattern, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
      type: LexerDefinitionErrorType.INVALID_PATTERN,
      tokenTypes: [currType]
    };
  });
  const valid = difference_default(tokenTypes, tokenTypesWithInvalidPattern);
  return { errors, valid };
}
var end_of_input = /[^\\][$]/;
function findEndOfInputAnchor(tokenTypes) {
  class EndAnchorFinder extends BaseRegExpVisitor {
    constructor() {
      super(...arguments);
      this.found = false;
    }
    visitEndAnchor(node) {
      this.found = true;
    }
  }
  const invalidRegex = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    try {
      const regexpAst = getRegExpAst(pattern);
      const endAnchorVisitor = new EndAnchorFinder();
      endAnchorVisitor.visit(regexpAst);
      return endAnchorVisitor.found;
    } catch (e) {
      return end_of_input.test(pattern.source);
    }
  });
  const errors = map_default(invalidRegex, (currType) => {
    return {
      message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
      type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findEmptyMatchRegExps(tokenTypes) {
  const matchesEmptyString = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    return pattern.test("");
  });
  const errors = map_default(matchesEmptyString, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
      type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
      tokenTypes: [currType]
    };
  });
  return errors;
}
var start_of_input = /[^\\[][\^]|^\^/;
function findStartOfInputAnchor(tokenTypes) {
  class StartAnchorFinder extends BaseRegExpVisitor {
    constructor() {
      super(...arguments);
      this.found = false;
    }
    visitStartAnchor(node) {
      this.found = true;
    }
  }
  const invalidRegex = filter_default(tokenTypes, (currType) => {
    const pattern = currType.PATTERN;
    try {
      const regexpAst = getRegExpAst(pattern);
      const startAnchorVisitor = new StartAnchorFinder();
      startAnchorVisitor.visit(regexpAst);
      return startAnchorVisitor.found;
    } catch (e) {
      return start_of_input.test(pattern.source);
    }
  });
  const errors = map_default(invalidRegex, (currType) => {
    return {
      message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
      type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findUnsupportedFlags(tokenTypes) {
  const invalidFlags = filter_default(tokenTypes, (currType) => {
    const pattern = currType[PATTERN];
    return pattern instanceof RegExp && (pattern.multiline || pattern.global);
  });
  const errors = map_default(invalidFlags, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
      type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findDuplicatePatterns(tokenTypes) {
  const found = [];
  let identicalPatterns = map_default(tokenTypes, (outerType) => {
    return reduce_default(tokenTypes, (result, innerType) => {
      if (outerType.PATTERN.source === innerType.PATTERN.source && !includes_default(found, innerType) && innerType.PATTERN !== Lexer.NA) {
        found.push(innerType);
        result.push(innerType);
        return result;
      }
      return result;
    }, []);
  });
  identicalPatterns = compact_default(identicalPatterns);
  const duplicatePatterns = filter_default(identicalPatterns, (currIdenticalSet) => {
    return currIdenticalSet.length > 1;
  });
  const errors = map_default(duplicatePatterns, (setOfIdentical) => {
    const tokenTypeNames = map_default(setOfIdentical, (currType) => {
      return currType.name;
    });
    const dupPatternSrc = head_default(setOfIdentical).PATTERN;
    return {
      message: `The same RegExp pattern ->${dupPatternSrc}<-has been used in all of the following Token Types: ${tokenTypeNames.join(", ")} <-`,
      type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
      tokenTypes: setOfIdentical
    };
  });
  return errors;
}
function findInvalidGroupType(tokenTypes) {
  const invalidTypes = filter_default(tokenTypes, (clazz) => {
    if (!has_default(clazz, "GROUP")) {
      return false;
    }
    const group = clazz.GROUP;
    return group !== Lexer.SKIPPED && group !== Lexer.NA && !isString_default(group);
  });
  const errors = map_default(invalidTypes, (currType) => {
    return {
      message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
      type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
      tokenTypes: [currType]
    };
  });
  return errors;
}
function findModesThatDoNotExist(tokenTypes, validModes) {
  const invalidModes = filter_default(tokenTypes, (clazz) => {
    return clazz.PUSH_MODE !== void 0 && !includes_default(validModes, clazz.PUSH_MODE);
  });
  const errors = map_default(invalidModes, (tokType) => {
    const msg = `Token Type: ->${tokType.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${tokType.PUSH_MODE}<-which does not exist`;
    return {
      message: msg,
      type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
      tokenTypes: [tokType]
    };
  });
  return errors;
}
function findUnreachablePatterns(tokenTypes) {
  const errors = [];
  const canBeTested = reduce_default(tokenTypes, (result, tokType, idx) => {
    const pattern = tokType.PATTERN;
    if (pattern === Lexer.NA) {
      return result;
    }
    if (isString_default(pattern)) {
      result.push({ str: pattern, idx, tokenType: tokType });
    } else if (isRegExp_default(pattern) && noMetaChar(pattern)) {
      result.push({ str: pattern.source, idx, tokenType: tokType });
    }
    return result;
  }, []);
  forEach_default(tokenTypes, (aTokType, aIdx) => {
    forEach_default(canBeTested, ({ str: bStr, idx: bIdx, tokenType: bTokType }) => {
      if (aIdx < bIdx && tryToMatchStrToPattern(bStr, aTokType.PATTERN)) {
        const msg = `Token: ->${bTokType.name}<- can never be matched.
Because it appears AFTER the Token Type ->${aTokType.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
        errors.push({
          message: msg,
          type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
          tokenTypes: [aTokType, bTokType]
        });
      }
    });
  });
  return errors;
}
function tryToMatchStrToPattern(str, pattern) {
  if (isRegExp_default(pattern)) {
    if (usesLookAheadOrBehind(pattern)) {
      return false;
    }
    const regExpArray = pattern.exec(str);
    return regExpArray !== null && regExpArray.index === 0;
  } else if (isFunction_default(pattern)) {
    return pattern(str, 0, [], {});
  } else if (has_default(pattern, "exec")) {
    return pattern.exec(str, 0, [], {});
  } else if (typeof pattern === "string") {
    return pattern === str;
  } else {
    throw Error("non exhaustive match");
  }
}
function noMetaChar(regExp) {
  const metaChars = [
    ".",
    "\\",
    "[",
    "]",
    "|",
    "^",
    "$",
    "(",
    ")",
    "?",
    "*",
    "+",
    "{"
  ];
  return find_default(metaChars, (char) => regExp.source.indexOf(char) !== -1) === void 0;
}
function usesLookAheadOrBehind(regExp) {
  return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(regExp.source);
}
function addStickyFlag(pattern) {
  const flags = pattern.ignoreCase ? "iy" : "y";
  return new RegExp(`${pattern.source}`, flags);
}
function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
  const errors = [];
  if (!has_default(lexerDefinition, DEFAULT_MODE)) {
    errors.push({
      message: "A MultiMode Lexer cannot be initialized without a <" + DEFAULT_MODE + "> property in its definition\n",
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
    });
  }
  if (!has_default(lexerDefinition, MODES)) {
    errors.push({
      message: "A MultiMode Lexer cannot be initialized without a <" + MODES + "> property in its definition\n",
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
    });
  }
  if (has_default(lexerDefinition, MODES) && has_default(lexerDefinition, DEFAULT_MODE) && !has_default(lexerDefinition.modes, lexerDefinition.defaultMode)) {
    errors.push({
      message: `A MultiMode Lexer cannot be initialized with a ${DEFAULT_MODE}: <${lexerDefinition.defaultMode}>which does not exist
`,
      type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
    });
  }
  if (has_default(lexerDefinition, MODES)) {
    forEach_default(lexerDefinition.modes, (currModeValue, currModeName) => {
      forEach_default(currModeValue, (currTokType, currIdx) => {
        if (isUndefined_default(currTokType)) {
          errors.push({
            message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${currModeName}> at index: <${currIdx}>
`,
            type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
          });
        } else if (has_default(currTokType, "LONGER_ALT")) {
          const longerAlt = isArray_default(currTokType.LONGER_ALT) ? currTokType.LONGER_ALT : [currTokType.LONGER_ALT];
          forEach_default(longerAlt, (currLongerAlt) => {
            if (!isUndefined_default(currLongerAlt) && !includes_default(currModeValue, currLongerAlt)) {
              errors.push({
                message: `A MultiMode Lexer cannot be initialized with a longer_alt <${currLongerAlt.name}> on token <${currTokType.name}> outside of mode <${currModeName}>
`,
                type: LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
              });
            }
          });
        }
      });
    });
  }
  return errors;
}
function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
  const warnings = [];
  let hasAnyLineBreak = false;
  const allTokenTypes = compact_default(flatten_default(values_default(lexerDefinition.modes)));
  const concreteTokenTypes = reject_default(allTokenTypes, (currType) => currType[PATTERN] === Lexer.NA);
  const terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
  if (trackLines) {
    forEach_default(concreteTokenTypes, (tokType) => {
      const currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
      if (currIssue !== false) {
        const message = buildLineBreakIssueMessage(tokType, currIssue);
        const warningDescriptor = {
          message,
          type: currIssue.issue,
          tokenType: tokType
        };
        warnings.push(warningDescriptor);
      } else {
        if (has_default(tokType, "LINE_BREAKS")) {
          if (tokType.LINE_BREAKS === true) {
            hasAnyLineBreak = true;
          }
        } else {
          if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
            hasAnyLineBreak = true;
          }
        }
      }
    });
  }
  if (trackLines && !hasAnyLineBreak) {
    warnings.push({
      message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
      type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
    });
  }
  return warnings;
}
function cloneEmptyGroups(emptyGroups) {
  const clonedResult = {};
  const groupKeys = keys_default(emptyGroups);
  forEach_default(groupKeys, (currKey) => {
    const currGroupValue = emptyGroups[currKey];
    if (isArray_default(currGroupValue)) {
      clonedResult[currKey] = [];
    } else {
      throw Error("non exhaustive match");
    }
  });
  return clonedResult;
}
function isCustomPattern(tokenType) {
  const pattern = tokenType.PATTERN;
  if (isRegExp_default(pattern)) {
    return false;
  } else if (isFunction_default(pattern)) {
    return true;
  } else if (has_default(pattern, "exec")) {
    return true;
  } else if (isString_default(pattern)) {
    return false;
  } else {
    throw Error("non exhaustive match");
  }
}
function isShortPattern(pattern) {
  if (isString_default(pattern) && pattern.length === 1) {
    return pattern.charCodeAt(0);
  } else {
    return false;
  }
}
var LineTerminatorOptimizedTester = {
  // implements /\n|\r\n?/g.test
  test: function (text) {
    const len = text.length;
    for (let i = this.lastIndex; i < len; i++) {
      const c = text.charCodeAt(i);
      if (c === 10) {
        this.lastIndex = i + 1;
        return true;
      } else if (c === 13) {
        if (text.charCodeAt(i + 1) === 10) {
          this.lastIndex = i + 2;
        } else {
          this.lastIndex = i + 1;
        }
        return true;
      }
    }
    return false;
  },
  lastIndex: 0
};
function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
  if (has_default(tokType, "LINE_BREAKS")) {
    return false;
  } else {
    if (isRegExp_default(tokType.PATTERN)) {
      try {
        canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
      } catch (e) {
        return {
          issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
          errMsg: e.message
        };
      }
      return false;
    } else if (isString_default(tokType.PATTERN)) {
      return false;
    } else if (isCustomPattern(tokType)) {
      return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
    } else {
      throw Error("non exhaustive match");
    }
  }
}
function buildLineBreakIssueMessage(tokType, details) {
  if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
    return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${tokType.name}> Token Type
	 Root cause: ${details.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
  } else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
    return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${tokType.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
  } else {
    throw Error("non exhaustive match");
  }
}
function getCharCodes(charsOrCodes) {
  const charCodes = map_default(charsOrCodes, (numOrString) => {
    if (isString_default(numOrString)) {
      return numOrString.charCodeAt(0);
    } else {
      return numOrString;
    }
  });
  return charCodes;
}
function addToMapOfArrays(map2, key, value) {
  if (map2[key] === void 0) {
    map2[key] = [value];
  } else {
    map2[key].push(value);
  }
}
var minOptimizationVal = 256;
var charCodeToOptimizedIdxMap = [];
function charCodeToOptimizedIndex(charCode) {
  return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
}
function initCharCodeToOptimizedIndexMap() {
  if (isEmpty_default(charCodeToOptimizedIdxMap)) {
    charCodeToOptimizedIdxMap = new Array(65536);
    for (let i = 0; i < 65536; i++) {
      charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
    }
  }
}

// node_modules/chevrotain/lib/src/scan/tokens.js
function tokenStructuredMatcher(tokInstance, tokConstructor) {
  const instanceType = tokInstance.tokenTypeIdx;
  if (instanceType === tokConstructor.tokenTypeIdx) {
    return true;
  } else {
    return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
  }
}
function tokenStructuredMatcherNoCategories(token, tokType) {
  return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
var tokenShortNameIdx = 1;
var tokenIdxToClass = {};
function augmentTokenTypes(tokenTypes) {
  const tokenTypesAndParents = expandCategories(tokenTypes);
  assignTokenDefaultProps(tokenTypesAndParents);
  assignCategoriesMapProp(tokenTypesAndParents);
  assignCategoriesTokensProp(tokenTypesAndParents);
  forEach_default(tokenTypesAndParents, (tokType) => {
    tokType.isParent = tokType.categoryMatches.length > 0;
  });
}
function expandCategories(tokenTypes) {
  let result = clone_default(tokenTypes);
  let categories = tokenTypes;
  let searching = true;
  while (searching) {
    categories = compact_default(flatten_default(map_default(categories, (currTokType) => currTokType.CATEGORIES)));
    const newCategories = difference_default(categories, result);
    result = result.concat(newCategories);
    if (isEmpty_default(newCategories)) {
      searching = false;
    } else {
      categories = newCategories;
    }
  }
  return result;
}
function assignTokenDefaultProps(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    if (!hasShortKeyProperty(currTokType)) {
      tokenIdxToClass[tokenShortNameIdx] = currTokType;
      currTokType.tokenTypeIdx = tokenShortNameIdx++;
    }
    if (hasCategoriesProperty(currTokType) && !isArray_default(currTokType.CATEGORIES)) {
      currTokType.CATEGORIES = [currTokType.CATEGORIES];
    }
    if (!hasCategoriesProperty(currTokType)) {
      currTokType.CATEGORIES = [];
    }
    if (!hasExtendingTokensTypesProperty(currTokType)) {
      currTokType.categoryMatches = [];
    }
    if (!hasExtendingTokensTypesMapProperty(currTokType)) {
      currTokType.categoryMatchesMap = {};
    }
  });
}
function assignCategoriesTokensProp(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    currTokType.categoryMatches = [];
    forEach_default(currTokType.categoryMatchesMap, (val, key) => {
      currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
    });
  });
}
function assignCategoriesMapProp(tokenTypes) {
  forEach_default(tokenTypes, (currTokType) => {
    singleAssignCategoriesToksMap([], currTokType);
  });
}
function singleAssignCategoriesToksMap(path2, nextNode) {
  forEach_default(path2, (pathNode) => {
    nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
  });
  forEach_default(nextNode.CATEGORIES, (nextCategory) => {
    const newPath = path2.concat(nextNode);
    if (!includes_default(newPath, nextCategory)) {
      singleAssignCategoriesToksMap(newPath, nextCategory);
    }
  });
}
function hasShortKeyProperty(tokType) {
  return has_default(tokType, "tokenTypeIdx");
}
function hasCategoriesProperty(tokType) {
  return has_default(tokType, "CATEGORIES");
}
function hasExtendingTokensTypesProperty(tokType) {
  return has_default(tokType, "categoryMatches");
}
function hasExtendingTokensTypesMapProperty(tokType) {
  return has_default(tokType, "categoryMatchesMap");
}
function isTokenType(tokType) {
  return has_default(tokType, "tokenTypeIdx");
}

// node_modules/chevrotain/lib/src/scan/lexer_errors_public.js
var defaultLexerErrorProvider = {
  buildUnableToPopLexerModeMessage(token) {
    return `Unable to pop Lexer Mode after encountering Token ->${token.image}<- The Mode Stack is empty`;
  },
  buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column, mode) {
    return `unexpected character: ->${fullText.charAt(startOffset)}<- at offset: ${startOffset}, skipped ${length} characters.`;
  }
};

// node_modules/chevrotain/lib/src/scan/lexer_public.js
var LexerDefinitionErrorType;
(function (LexerDefinitionErrorType2) {
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
  LexerDefinitionErrorType2[LexerDefinitionErrorType2["MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"] = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
var DEFAULT_LEXER_CONFIG = {
  deferDefinitionErrorsHandling: false,
  positionTracking: "full",
  lineTerminatorsPattern: /\n|\r\n?/g,
  lineTerminatorCharacters: ["\n", "\r"],
  ensureOptimizations: false,
  safeMode: false,
  errorMessageProvider: defaultLexerErrorProvider,
  traceInitPerf: false,
  skipValidations: false,
  recoveryEnabled: true
};
Object.freeze(DEFAULT_LEXER_CONFIG);
var Lexer = class {
  constructor(lexerDefinition, config = DEFAULT_LEXER_CONFIG) {
    this.lexerDefinition = lexerDefinition;
    this.lexerDefinitionErrors = [];
    this.lexerDefinitionWarning = [];
    this.patternIdxToConfig = {};
    this.charCodeToPatternIdxToConfig = {};
    this.modes = [];
    this.emptyGroups = {};
    this.trackStartLines = true;
    this.trackEndLines = true;
    this.hasCustom = false;
    this.canModeBeOptimized = {};
    this.TRACE_INIT = (phaseDesc, phaseImpl) => {
      if (this.traceInitPerf === true) {
        this.traceInitIndent++;
        const indent = new Array(this.traceInitIndent + 1).join("	");
        if (this.traceInitIndent < this.traceInitMaxIdent) {
          console.log(`${indent}--> <${phaseDesc}>`);
        }
        const { time, value } = timer(phaseImpl);
        const traceMethod = time > 10 ? console.warn : console.log;
        if (this.traceInitIndent < this.traceInitMaxIdent) {
          traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
        }
        this.traceInitIndent--;
        return value;
      } else {
        return phaseImpl();
      }
    };
    if (typeof config === "boolean") {
      throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
    }
    this.config = assign_default({}, DEFAULT_LEXER_CONFIG, config);
    const traceInitVal = this.config.traceInitPerf;
    if (traceInitVal === true) {
      this.traceInitMaxIdent = Infinity;
      this.traceInitPerf = true;
    } else if (typeof traceInitVal === "number") {
      this.traceInitMaxIdent = traceInitVal;
      this.traceInitPerf = true;
    }
    this.traceInitIndent = -1;
    this.TRACE_INIT("Lexer Constructor", () => {
      let actualDefinition;
      let hasOnlySingleMode = true;
      this.TRACE_INIT("Lexer Config handling", () => {
        if (this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
          this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
        } else {
          if (this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
            throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
          }
        }
        if (config.safeMode && config.ensureOptimizations) {
          throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
        }
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking);
        this.trackEndLines = /full/i.test(this.config.positionTracking);
        if (isArray_default(lexerDefinition)) {
          actualDefinition = {
            modes: { defaultMode: clone_default(lexerDefinition) },
            defaultMode: DEFAULT_MODE
          };
        } else {
          hasOnlySingleMode = false;
          actualDefinition = clone_default(lexerDefinition);
        }
      });
      if (this.config.skipValidations === false) {
        this.TRACE_INIT("performRuntimeChecks", () => {
          this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
        });
        this.TRACE_INIT("performWarningRuntimeChecks", () => {
          this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
        });
      }
      actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
      forEach_default(actualDefinition.modes, (currModeValue, currModeName) => {
        actualDefinition.modes[currModeName] = reject_default(currModeValue, (currTokType) => isUndefined_default(currTokType));
      });
      const allModeNames = keys_default(actualDefinition.modes);
      forEach_default(actualDefinition.modes, (currModDef, currModName) => {
        this.TRACE_INIT(`Mode: <${currModName}> processing`, () => {
          this.modes.push(currModName);
          if (this.config.skipValidations === false) {
            this.TRACE_INIT(`validatePatterns`, () => {
              this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
            });
          }
          if (isEmpty_default(this.lexerDefinitionErrors)) {
            augmentTokenTypes(currModDef);
            let currAnalyzeResult;
            this.TRACE_INIT(`analyzeTokenTypes`, () => {
              currAnalyzeResult = analyzeTokenTypes(currModDef, {
                lineTerminatorCharacters: this.config.lineTerminatorCharacters,
                positionTracking: config.positionTracking,
                ensureOptimizations: config.ensureOptimizations,
                safeMode: config.safeMode,
                tracer: this.TRACE_INIT
              });
            });
            this.patternIdxToConfig[currModName] = currAnalyzeResult.patternIdxToConfig;
            this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult.charCodeToPatternIdxToConfig;
            this.emptyGroups = assign_default({}, this.emptyGroups, currAnalyzeResult.emptyGroups);
            this.hasCustom = currAnalyzeResult.hasCustom || this.hasCustom;
            this.canModeBeOptimized[currModName] = currAnalyzeResult.canBeOptimized;
          }
        });
      });
      this.defaultMode = actualDefinition.defaultMode;
      if (!isEmpty_default(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
        const allErrMessages = map_default(this.lexerDefinitionErrors, (error) => {
          return error.message;
        });
        const allErrMessagesString = allErrMessages.join("-----------------------\n");
        throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
      }
      forEach_default(this.lexerDefinitionWarning, (warningDescriptor) => {
        PRINT_WARNING(warningDescriptor.message);
      });
      this.TRACE_INIT("Choosing sub-methods implementations", () => {
        if (hasOnlySingleMode) {
          this.handleModes = noop_default;
        }
        if (this.trackStartLines === false) {
          this.computeNewColumn = identity_default;
        }
        if (this.trackEndLines === false) {
          this.updateTokenEndLineColumnLocation = noop_default;
        }
        if (/full/i.test(this.config.positionTracking)) {
          this.createTokenInstance = this.createFullToken;
        } else if (/onlyStart/i.test(this.config.positionTracking)) {
          this.createTokenInstance = this.createStartOnlyToken;
        } else if (/onlyOffset/i.test(this.config.positionTracking)) {
          this.createTokenInstance = this.createOffsetOnlyToken;
        } else {
          throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
        }
        if (this.hasCustom) {
          this.addToken = this.addTokenUsingPush;
          this.handlePayload = this.handlePayloadWithCustom;
        } else {
          this.addToken = this.addTokenUsingMemberAccess;
          this.handlePayload = this.handlePayloadNoCustom;
        }
      });
      this.TRACE_INIT("Failed Optimization Warnings", () => {
        const unOptimizedModes = reduce_default(this.canModeBeOptimized, (cannotBeOptimized, canBeOptimized, modeName) => {
          if (canBeOptimized === false) {
            cannotBeOptimized.push(modeName);
          }
          return cannotBeOptimized;
        }, []);
        if (config.ensureOptimizations && !isEmpty_default(unOptimizedModes)) {
          throw Error(`Lexer Modes: < ${unOptimizedModes.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
        }
      });
      this.TRACE_INIT("clearRegExpParserCache", () => {
        clearRegExpParserCache();
      });
      this.TRACE_INIT("toFastProperties", () => {
        toFastProperties(this);
      });
    });
  }
  tokenize(text, initialMode = this.defaultMode) {
    if (!isEmpty_default(this.lexerDefinitionErrors)) {
      const allErrMessages = map_default(this.lexerDefinitionErrors, (error) => {
        return error.message;
      });
      const allErrMessagesString = allErrMessages.join("-----------------------\n");
      throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
    }
    return this.tokenizeInternal(text, initialMode);
  }
  // There is quite a bit of duplication between this and "tokenizeInternalLazy"
  // This is intentional due to performance considerations.
  // this method also used quite a bit of `!` none null assertions because it is too optimized
  // for `tsc` to always understand it is "safe"
  tokenizeInternal(text, initialMode) {
    let i, j, k, matchAltImage, longerAlt, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, msg, match;
    const orgText = text;
    const orgLength = orgText.length;
    let offset = 0;
    let matchedTokensIndex = 0;
    const guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
    const matchedTokens = new Array(guessedNumberOfTokens);
    const errors = [];
    let line = this.trackStartLines ? 1 : void 0;
    let column = this.trackStartLines ? 1 : void 0;
    const groups = cloneEmptyGroups(this.emptyGroups);
    const trackLines = this.trackStartLines;
    const lineTerminatorPattern = this.config.lineTerminatorsPattern;
    let currModePatternsLength = 0;
    let patternIdxToConfig = [];
    let currCharCodeToPatternIdxToConfig = [];
    const modeStack = [];
    const emptyArray = [];
    Object.freeze(emptyArray);
    let isOptimizedMode = false;
    const pop_mode = (popToken) => {
      if (modeStack.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
        // So no error should occur.
        popToken.tokenType.PUSH_MODE === void 0) {
        const msg2 = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
        errors.push({
          offset: popToken.startOffset,
          line: popToken.startLine,
          column: popToken.startColumn,
          length: popToken.image.length,
          message: msg2
        });
      } else {
        modeStack.pop();
        const newMode = last_default(modeStack);
        patternIdxToConfig = this.patternIdxToConfig[newMode];
        currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
        currModePatternsLength = patternIdxToConfig.length;
        const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
        if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
          isOptimizedMode = true;
        } else {
          isOptimizedMode = false;
        }
      }
    };
    function push_mode(newMode) {
      modeStack.push(newMode);
      currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
      patternIdxToConfig = this.patternIdxToConfig[newMode];
      currModePatternsLength = patternIdxToConfig.length;
      currModePatternsLength = patternIdxToConfig.length;
      const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
      if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
        isOptimizedMode = true;
      } else {
        isOptimizedMode = false;
      }
    }
    push_mode.call(this, initialMode);
    let currConfig;
    const recoveryEnabled = this.config.recoveryEnabled;
    while (offset < orgLength) {
      matchedImage = null;
      imageLength = -1;
      const nextCharCode = orgText.charCodeAt(offset);
      let chosenPatternIdxToConfig;
      if (isOptimizedMode) {
        const optimizedCharIdx = charCodeToOptimizedIndex(nextCharCode);
        const possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
        chosenPatternIdxToConfig = possiblePatterns !== void 0 ? possiblePatterns : emptyArray;
      } else {
        chosenPatternIdxToConfig = patternIdxToConfig;
      }
      const chosenPatternsLength = chosenPatternIdxToConfig.length;
      for (i = 0; i < chosenPatternsLength; i++) {
        currConfig = chosenPatternIdxToConfig[i];
        const currPattern = currConfig.pattern;
        payload = null;
        const singleCharCode = currConfig.short;
        if (singleCharCode !== false) {
          if (nextCharCode === singleCharCode) {
            imageLength = 1;
            matchedImage = currPattern;
          }
        } else if (currConfig.isCustom === true) {
          match = currPattern.exec(orgText, offset, matchedTokens, groups);
          if (match !== null) {
            matchedImage = match[0];
            imageLength = matchedImage.length;
            if (match.payload !== void 0) {
              payload = match.payload;
            }
          } else {
            matchedImage = null;
          }
        } else {
          currPattern.lastIndex = offset;
          imageLength = this.matchLength(currPattern, text, offset);
        }
        if (imageLength !== -1) {
          longerAlt = currConfig.longerAlt;
          if (longerAlt !== void 0) {
            matchedImage = text.substring(offset, offset + imageLength);
            const longerAltLength = longerAlt.length;
            for (k = 0; k < longerAltLength; k++) {
              const longerAltConfig = patternIdxToConfig[longerAlt[k]];
              const longerAltPattern = longerAltConfig.pattern;
              altPayload = null;
              if (longerAltConfig.isCustom === true) {
                match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                if (match !== null) {
                  matchAltImage = match[0];
                  if (match.payload !== void 0) {
                    altPayload = match.payload;
                  }
                } else {
                  matchAltImage = null;
                }
              } else {
                longerAltPattern.lastIndex = offset;
                matchAltImage = this.match(longerAltPattern, text, offset);
              }
              if (matchAltImage && matchAltImage.length > matchedImage.length) {
                matchedImage = matchAltImage;
                imageLength = matchAltImage.length;
                payload = altPayload;
                currConfig = longerAltConfig;
                break;
              }
            }
          }
          break;
        }
      }
      if (imageLength !== -1) {
        group = currConfig.group;
        if (group !== void 0) {
          matchedImage = matchedImage !== null ? matchedImage : text.substring(offset, offset + imageLength);
          tokType = currConfig.tokenTypeIdx;
          newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
          this.handlePayload(newToken, payload);
          if (group === false) {
            matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
          } else {
            groups[group].push(newToken);
          }
        }
        if (trackLines === true && currConfig.canLineTerminator === true) {
          let numOfLTsInMatch = 0;
          let foundTerminator;
          let lastLTEndOffset;
          lineTerminatorPattern.lastIndex = 0;
          do {
            matchedImage = matchedImage !== null ? matchedImage : text.substring(offset, offset + imageLength);
            foundTerminator = lineTerminatorPattern.test(matchedImage);
            if (foundTerminator === true) {
              lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
              numOfLTsInMatch++;
            }
          } while (foundTerminator === true);
          if (numOfLTsInMatch !== 0) {
            line = line + numOfLTsInMatch;
            column = imageLength - lastLTEndOffset;
            this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
          } else {
            column = this.computeNewColumn(column, imageLength);
          }
        } else {
          column = this.computeNewColumn(column, imageLength);
        }
        offset = offset + imageLength;
        this.handleModes(currConfig, pop_mode, push_mode, newToken);
      } else {
        const errorStartOffset = offset;
        const errorLine = line;
        const errorColumn = column;
        let foundResyncPoint = recoveryEnabled === false;
        while (foundResyncPoint === false && offset < orgLength) {
          offset++;
          for (j = 0; j < currModePatternsLength; j++) {
            const currConfig2 = patternIdxToConfig[j];
            const currPattern = currConfig2.pattern;
            const singleCharCode = currConfig2.short;
            if (singleCharCode !== false) {
              if (orgText.charCodeAt(offset) === singleCharCode) {
                foundResyncPoint = true;
              }
            } else if (currConfig2.isCustom === true) {
              foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
            } else {
              currPattern.lastIndex = offset;
              foundResyncPoint = currPattern.exec(text) !== null;
            }
            if (foundResyncPoint === true) {
              break;
            }
          }
        }
        errLength = offset - errorStartOffset;
        column = this.computeNewColumn(column, errLength);
        msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn, last_default(modeStack));
        errors.push({
          offset: errorStartOffset,
          line: errorLine,
          column: errorColumn,
          length: errLength,
          message: msg
        });
        if (recoveryEnabled === false) {
          break;
        }
      }
    }
    if (!this.hasCustom) {
      matchedTokens.length = matchedTokensIndex;
    }
    return {
      tokens: matchedTokens,
      groups,
      errors
    };
  }
  handleModes(config, pop_mode, push_mode, newToken) {
    if (config.pop === true) {
      const pushMode = config.push;
      pop_mode(newToken);
      if (pushMode !== void 0) {
        push_mode.call(this, pushMode);
      }
    } else if (config.push !== void 0) {
      push_mode.call(this, config.push);
    }
  }
  // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
  updateTokenEndLineColumnLocation(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
    let lastCharIsLT, fixForEndingInLT;
    if (group !== void 0) {
      lastCharIsLT = lastLTIdx === imageLength - 1;
      fixForEndingInLT = lastCharIsLT ? -1 : 0;
      if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
        newToken.endLine = line + fixForEndingInLT;
        newToken.endColumn = column - 1 + -fixForEndingInLT;
      }
    }
  }
  computeNewColumn(oldColumn, imageLength) {
    return oldColumn + imageLength;
  }
  createOffsetOnlyToken(image, startOffset, tokenTypeIdx, tokenType) {
    return {
      image,
      startOffset,
      tokenTypeIdx,
      tokenType
    };
  }
  createStartOnlyToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
    return {
      image,
      startOffset,
      startLine,
      startColumn,
      tokenTypeIdx,
      tokenType
    };
  }
  createFullToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
    return {
      image,
      startOffset,
      endOffset: startOffset + imageLength - 1,
      startLine,
      endLine: startLine,
      startColumn,
      endColumn: startColumn + imageLength - 1,
      tokenTypeIdx,
      tokenType
    };
  }
  addTokenUsingPush(tokenVector, index, tokenToAdd) {
    tokenVector.push(tokenToAdd);
    return index;
  }
  addTokenUsingMemberAccess(tokenVector, index, tokenToAdd) {
    tokenVector[index] = tokenToAdd;
    index++;
    return index;
  }
  handlePayloadNoCustom(token, payload) {
  }
  handlePayloadWithCustom(token, payload) {
    if (payload !== null) {
      token.payload = payload;
    }
  }
  match(pattern, text, offset) {
    const found = pattern.test(text);
    if (found === true) {
      return text.substring(offset, pattern.lastIndex);
    }
    return null;
  }
  matchLength(pattern, text, offset) {
    const found = pattern.test(text);
    if (found === true) {
      return pattern.lastIndex - offset;
    }
    return -1;
  }
};
Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
Lexer.NA = /NOT_APPLICABLE/;

// node_modules/chevrotain/lib/src/scan/tokens_public.js
function tokenLabel2(tokType) {
  if (hasTokenLabel2(tokType)) {
    return tokType.LABEL;
  } else {
    return tokType.name;
  }
}
function hasTokenLabel2(obj) {
  return isString_default(obj.LABEL) && obj.LABEL !== "";
}
var PARENT = "parent";
var CATEGORIES = "categories";
var LABEL = "label";
var GROUP = "group";
var PUSH_MODE = "push_mode";
var POP_MODE = "pop_mode";
var LONGER_ALT = "longer_alt";
var LINE_BREAKS = "line_breaks";
var START_CHARS_HINT = "start_chars_hint";
function createToken(config) {
  return createTokenInternal(config);
}
function createTokenInternal(config) {
  const pattern = config.pattern;
  const tokenType = {};
  tokenType.name = config.name;
  if (!isUndefined_default(pattern)) {
    tokenType.PATTERN = pattern;
  }
  if (has_default(config, PARENT)) {
    throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
  }
  if (has_default(config, CATEGORIES)) {
    tokenType.CATEGORIES = config[CATEGORIES];
  }
  augmentTokenTypes([tokenType]);
  if (has_default(config, LABEL)) {
    tokenType.LABEL = config[LABEL];
  }
  if (has_default(config, GROUP)) {
    tokenType.GROUP = config[GROUP];
  }
  if (has_default(config, POP_MODE)) {
    tokenType.POP_MODE = config[POP_MODE];
  }
  if (has_default(config, PUSH_MODE)) {
    tokenType.PUSH_MODE = config[PUSH_MODE];
  }
  if (has_default(config, LONGER_ALT)) {
    tokenType.LONGER_ALT = config[LONGER_ALT];
  }
  if (has_default(config, LINE_BREAKS)) {
    tokenType.LINE_BREAKS = config[LINE_BREAKS];
  }
  if (has_default(config, START_CHARS_HINT)) {
    tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
  }
  return tokenType;
}
var EOF = createToken({ name: "EOF", pattern: Lexer.NA });
augmentTokenTypes([EOF]);
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
  return {
    image,
    startOffset,
    endOffset,
    startLine,
    endLine,
    startColumn,
    endColumn,
    tokenTypeIdx: tokType.tokenTypeIdx,
    tokenType: tokType
  };
}
function tokenMatcher(token, tokType) {
  return tokenStructuredMatcher(token, tokType);
}

// node_modules/chevrotain/lib/src/parse/errors_public.js
var defaultParserErrorProvider = {
  buildMismatchTokenMessage({ expected, actual, previous, ruleName }) {
    const hasLabel = hasTokenLabel2(expected);
    const expectedMsg = hasLabel ? `--> ${tokenLabel2(expected)} <--` : `token of type --> ${expected.name} <--`;
    const msg = `Expecting ${expectedMsg} but found --> '${actual.image}' <--`;
    return msg;
  },
  buildNotAllInputParsedMessage({ firstRedundant, ruleName }) {
    return "Redundant input, expecting EOF but found: " + firstRedundant.image;
  },
  buildNoViableAltMessage({ expectedPathsPerAlt, actual, previous, customUserDescription, ruleName }) {
    const errPrefix = "Expecting: ";
    const actualText = head_default(actual).image;
    const errSuffix = "\nbut found: '" + actualText + "'";
    if (customUserDescription) {
      return errPrefix + customUserDescription + errSuffix;
    } else {
      const allLookAheadPaths = reduce_default(expectedPathsPerAlt, (result, currAltPaths) => result.concat(currAltPaths), []);
      const nextValidTokenSequences = map_default(allLookAheadPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel2(currTokenType)).join(", ")}]`);
      const nextValidSequenceItems = map_default(nextValidTokenSequences, (itemMsg, idx) => `  ${idx + 1}. ${itemMsg}`);
      const calculatedDescription = `one of these possible Token sequences:
${nextValidSequenceItems.join("\n")}`;
      return errPrefix + calculatedDescription + errSuffix;
    }
  },
  buildEarlyExitMessage({ expectedIterationPaths, actual, customUserDescription, ruleName }) {
    const errPrefix = "Expecting: ";
    const actualText = head_default(actual).image;
    const errSuffix = "\nbut found: '" + actualText + "'";
    if (customUserDescription) {
      return errPrefix + customUserDescription + errSuffix;
    } else {
      const nextValidTokenSequences = map_default(expectedIterationPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel2(currTokenType)).join(",")}]`);
      const calculatedDescription = `expecting at least one iteration which starts with one of these possible Token sequences::
  <${nextValidTokenSequences.join(" ,")}>`;
      return errPrefix + calculatedDescription + errSuffix;
    }
  }
};
Object.freeze(defaultParserErrorProvider);
var defaultGrammarResolverErrorProvider = {
  buildRuleNotFoundError(topLevelRule, undefinedRule) {
    const msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
    return msg;
  }
};
var defaultGrammarValidatorErrorProvider = {
  buildDuplicateFoundError(topLevelRule, duplicateProds) {
    function getExtraProductionArgument2(prod) {
      if (prod instanceof Terminal) {
        return prod.terminalType.name;
      } else if (prod instanceof NonTerminal) {
        return prod.nonTerminalName;
      } else {
        return "";
      }
    }
    const topLevelName = topLevelRule.name;
    const duplicateProd = head_default(duplicateProds);
    const index = duplicateProd.idx;
    const dslName = getProductionDslName(duplicateProd);
    const extraArgument = getExtraProductionArgument2(duplicateProd);
    const hasExplicitIndex = index > 0;
    let msg = `->${dslName}${hasExplicitIndex ? index : ""}<- ${extraArgument ? `with argument: ->${extraArgument}<-` : ""}
                  appears more than once (${duplicateProds.length} times) in the top level rule: ->${topLevelName}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
    msg = msg.replace(/[ \t]+/g, " ");
    msg = msg.replace(/\s\s+/g, "\n");
    return msg;
  },
  buildNamespaceConflictError(rule) {
    const errMsg = `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${rule.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
    return errMsg;
  },
  buildAlternationPrefixAmbiguityError(options) {
    const pathMsg = map_default(options.prefixPath, (currTok) => tokenLabel2(currTok)).join(", ");
    const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
    const errMsg = `Ambiguous alternatives: <${options.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,
<${pathMsg}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
    return errMsg;
  },
  buildAlternationAmbiguityError(options) {
    const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
    const isEmptyPath = options.prefixPath.length === 0;
    let currMessage = `Ambiguous Alternatives Detected: <${options.ambiguityIndices.join(" ,")}> in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,
`;
    if (isEmptyPath) {
      currMessage += `These alternatives are all empty (match no tokens), making them indistinguishable.
Only the last alternative may be empty.
`;
    } else {
      const pathMsg = map_default(options.prefixPath, (currtok) => tokenLabel2(currtok)).join(", ");
      currMessage += `<${pathMsg}> may appears as a prefix path in all these alternatives.
`;
    }
    currMessage += `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`;
    return currMessage;
  },
  buildEmptyRepetitionError(options) {
    let dslName = getProductionDslName(options.repetition);
    if (options.repetition.idx !== 0) {
      dslName += options.repetition.idx;
    }
    const errMsg = `The repetition <${dslName}> within Rule <${options.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
    return errMsg;
  },
  // TODO: remove - `errors_public` from nyc.config.js exclude
  //       once this method is fully removed from this file
  buildTokenNameError(options) {
    return "deprecated";
  },
  buildEmptyAlternationError(options) {
    const errMsg = `Ambiguous empty alternative: <${options.emptyChoiceIdx + 1}> in <OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
    return errMsg;
  },
  buildTooManyAlternativesError(options) {
    const errMsg = `An Alternation cannot have more than 256 alternatives:
<OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.
 has ${options.alternation.definition.length + 1} alternatives.`;
    return errMsg;
  },
  buildLeftRecursionError(options) {
    const ruleName = options.topLevelRule.name;
    const pathNames = map_default(options.leftRecursionPath, (currRule) => currRule.name);
    const leftRecursivePath = `${ruleName} --> ${pathNames.concat([ruleName]).join(" --> ")}`;
    const errMsg = `Left Recursion found in grammar.
rule: <${ruleName}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${leftRecursivePath}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`}, buildInvalidRuleNameError(t) { return "deprecated" }, buildDuplicateRuleNameError(t) { let e; return t.topLevelRule instanceof Ee ? e = t.topLevelRule.name : e = t.topLevelRule, `Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-` }
}; function _c(t, e) { let r = new To(t, e); return r.resolveRefs(), r.errors } var To = class extends Te { constructor(e, r) { super(), this.nameToTopRule = e, this.errMsgProvider = r, this.errors = [] } resolveRefs() { E(_(this.nameToTopRule), e => { this.currTopLevel = e, e.accept(this) }) } visitNonTerminal(e) { let r = this.nameToTopRule[e.nonTerminalName]; if (r) e.referencedRule = r; else { let n = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e); this.errors.push({ message: n, type: ie.UNRESOLVED_SUBRULE_REF, ruleName: this.currTopLevel.name, unresolvedRefName: e.nonTerminalName }) } } }; var xo = class extends it { constructor(e, r) { super(), this.topProd = e, this.path = r, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = !1, this.isAtEndOfPath = !1 } startWalking() { if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!"); return this.ruleStack = W(this.path.ruleStack).reverse(), this.occurrenceStack = W(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes } walk(e, r = []) { this.found || super.walk(e, r) } walkProdRef(e, r, n) { if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) { let i = r.concat(n); this.updateExpectedNext(), this.walk(e.referencedRule, i) } } updateExpectedNext() { L(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop()) } }, Qn = class extends xo { constructor(e, r) { super(e, r), this.path = r, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence } walkTerminal(e, r, n) { if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) { let i = r.concat(n), o = new U({ definition: i }); this.possibleTokTypes = Dt(o), this.found = !0 } } }, Ar = class extends it { constructor(e, r) { super(), this.topRule = e, this.occurrence = r, this.result = { token: void 0, occurrence: void 0, isEndOfRule: void 0 } } startWalking() { return this.walk(this.topRule), this.result } }, Zn = class extends Ar { walkMany(e, r, n) { if (e.idx === this.occurrence) { let i = ae(r.concat(n)); this.result.isEndOfRule = i === void 0, i instanceof C && (this.result.token = i.terminalType, this.result.occurrence = i.idx) } else super.walkMany(e, r, n) } }, zr = class extends Ar { walkManySep(e, r, n) { if (e.idx === this.occurrence) { let i = ae(r.concat(n)); this.result.isEndOfRule = i === void 0, i instanceof C && (this.result.token = i.terminalType, this.result.occurrence = i.idx) } else super.walkManySep(e, r, n) } }, Jn = class extends Ar { walkAtLeastOne(e, r, n) { if (e.idx === this.occurrence) { let i = ae(r.concat(n)); this.result.isEndOfRule = i === void 0, i instanceof C && (this.result.token = i.terminalType, this.result.occurrence = i.idx) } else super.walkAtLeastOne(e, r, n) } }, qr = class extends Ar { walkAtLeastOneSep(e, r, n) { if (e.idx === this.occurrence) { let i = ae(r.concat(n)); this.result.isEndOfRule = i === void 0, i instanceof C && (this.result.token = i.terminalType, this.result.occurrence = i.idx) } else super.walkAtLeastOneSep(e, r, n) } }; function ei(t, e, r = []) { r = W(r); let n = [], i = 0; function o(a) { return a.concat(q(t, i + 1)) } function s(a) { let l = ei(o(a), e, r); return n.concat(l) } for (; r.length < e && i < t.length;) { let a = t[i]; if (a instanceof U) return s(a.definition); if (a instanceof M) return s(a.definition); if (a instanceof D) n = s(a.definition); else if (a instanceof X) { let l = a.definition.concat([new v({ definition: a.definition })]); return s(l) } else if (a instanceof Y) { let l = [new U({ definition: a.definition }), new v({ definition: [new C({ terminalType: a.separator })].concat(a.definition) })]; return s(l) } else if (a instanceof V) { let l = a.definition.concat([new v({ definition: [new C({ terminalType: a.separator })].concat(a.definition) })]); n = s(l) } else if (a instanceof v) { let l = a.definition.concat([new v({ definition: a.definition })]); n = s(l) } else { if (a instanceof H) return E(a.definition, l => { L(l.definition) === !1 && (n = s(l.definition)) }), n; if (a instanceof C) r.push(a.terminalType); else throw Error("non exhaustive match") } i++ } return n.push({ partialPath: r, suffixDef: q(t, i) }), n } function ti(t, e, r, n) { let i = "EXIT_NONE_TERMINAL", o = [i], s = "EXIT_ALTERNATIVE", a = !1, l = e.length, c = l - n - 1, u = [], f = []; for (f.push({ idx: -1, def: t, ruleStack: [], occurrenceStack: [] }); !L(f);) { let h = f.pop(); if (h === s) { a && De(f).idx <= c && f.pop(); continue } let T = h.def, R = h.idx, y = h.ruleStack, I = h.occurrenceStack; if (L(T)) continue; let m = T[0]; if (m === i) { let g = { idx: R, def: q(T), ruleStack: nt(y), occurrenceStack: nt(I) }; f.push(g) } else if (m instanceof C) if (R < l - 1) { let g = R + 1, p = e[g]; if (r(p, m.terminalType)) { let x = { idx: g, def: q(T), ruleStack: y, occurrenceStack: I }; f.push(x) } } else if (R === l - 1) u.push({ nextTokenType: m.terminalType, nextTokenOccurrence: m.idx, ruleStack: y, occurrenceStack: I }), a = !0; else throw Error("non exhaustive match"); else if (m instanceof M) { let g = W(y); g.push(m.nonTerminalName); let p = W(I); p.push(m.idx); let x = { idx: R, def: m.definition.concat(o, q(T)), ruleStack: g, occurrenceStack: p }; f.push(x) } else if (m instanceof D) { let g = { idx: R, def: q(T), ruleStack: y, occurrenceStack: I }; f.push(g), f.push(s); let p = { idx: R, def: m.definition.concat(q(T)), ruleStack: y, occurrenceStack: I }; f.push(p) } else if (m instanceof X) { let g = new v({ definition: m.definition, idx: m.idx }), p = m.definition.concat([g], q(T)), x = { idx: R, def: p, ruleStack: y, occurrenceStack: I }; f.push(x) } else if (m instanceof Y) { let g = new C({ terminalType: m.separator }), p = new v({ definition: [g].concat(m.definition), idx: m.idx }), x = m.definition.concat([p], q(T)), b = { idx: R, def: x, ruleStack: y, occurrenceStack: I }; f.push(b) } else if (m instanceof V) { let g = { idx: R, def: q(T), ruleStack: y, occurrenceStack: I }; f.push(g), f.push(s); let p = new C({ terminalType: m.separator }), x = new v({ definition: [p].concat(m.definition), idx: m.idx }), b = m.definition.concat([x], q(T)), Pe = { idx: R, def: b, ruleStack: y, occurrenceStack: I }; f.push(Pe) } else if (m instanceof v) { let g = { idx: R, def: q(T), ruleStack: y, occurrenceStack: I }; f.push(g), f.push(s); let p = new v({ definition: m.definition, idx: m.idx }), x = m.definition.concat([p], q(T)), b = { idx: R, def: x, ruleStack: y, occurrenceStack: I }; f.push(b) } else if (m instanceof H) for (let g = m.definition.length - 1; g >= 0; g--) { let p = m.definition[g], x = { idx: R, def: p.definition.concat(q(T)), ruleStack: y, occurrenceStack: I }; f.push(x), f.push(s) } else if (m instanceof U) f.push({ idx: R, def: m.definition.concat(q(T)), ruleStack: y, occurrenceStack: I }); else if (m instanceof Ee) f.push(BT(m, R, y, I)); else throw Error("non exhaustive match") } return u } function BT(t, e, r, n) { let i = W(r); i.push(t.name); let o = W(n); return o.push(1), { idx: e, def: t.definition, ruleStack: i, occurrenceStack: o } } var $; (function (t) { t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION" })($ || ($ = {})); function ni(t) { if (t instanceof D || t === "Option") return $.OPTION; if (t instanceof v || t === "Repetition") return $.REPETITION; if (t instanceof X || t === "RepetitionMandatory") return $.REPETITION_MANDATORY; if (t instanceof Y || t === "RepetitionMandatoryWithSeparator") return $.REPETITION_MANDATORY_WITH_SEPARATOR; if (t instanceof V || t === "RepetitionWithSeparator") return $.REPETITION_WITH_SEPARATOR; if (t instanceof H || t === "Alternation") return $.ALTERNATION; throw Error("non exhaustive match") } function kc(t, e, r, n, i, o) { let s = Xr(t, e, r), a = Fc(s) ? xr : ot; return o(s, n, a, i) } function Pc(t, e, r, n, i, o) { let s = Yr(t, e, i, r), a = Fc(s) ? xr : ot; return o(s[0], a, n) } function Mc(t, e, r, n) { let i = t.length, o = ce(t, s => ce(s, a => a.length === 1)); if (e) return function (s) { let a = d(s, l => l.GATE); for (let l = 0; l < i; l++) { let c = t[l], u = c.length, f = a[l]; if (!(f !== void 0 && f.call(this) === !1)) e: for (let h = 0; h < u; h++) { let T = c[h], R = T.length; for (let y = 0; y < R; y++) { let I = this.LA_FAST(y + 1); if (r(I, T[y]) === !1) continue e } return l } } }; if (o && !n) { let s = d(t, l => re(l)), a = ee(s, (l, c, u) => (E(c, f => { A(l, f.tokenTypeIdx) || (l[f.tokenTypeIdx] = u), E(f.categoryMatches, h => { A(l, h) || (l[h] = u) }) }), l), {}); return function () { let l = this.LA_FAST(1); return a[l.tokenTypeIdx] } } else return function () { for (let s = 0; s < i; s++) { let a = t[s], l = a.length; e: for (let c = 0; c < l; c++) { let u = a[c], f = u.length; for (let h = 0; h < f; h++) { let T = this.LA_FAST(h + 1); if (r(T, u[h]) === !1) continue e } return s } } } } function Uc(t, e, r) { let n = ce(t, o => o.length === 1), i = t.length; if (n && !r) { let o = re(t); if (o.length === 1 && L(o[0].categoryMatches)) { let a = o[0].tokenTypeIdx; return function () { return this.LA_FAST(1).tokenTypeIdx === a } } else { let s = ee(o, (a, l, c) => (a[l.tokenTypeIdx] = !0, E(l.categoryMatches, u => { a[u] = !0 }), a), []); return function () { let a = this.LA_FAST(1); return s[a.tokenTypeIdx] === !0 } } } else return function () { e: for (let o = 0; o < i; o++) { let s = t[o], a = s.length; for (let l = 0; l < a; l++) { let c = this.LA_FAST(l + 1); if (e(c, s[l]) === !1) continue e } return !0 } return !1 } } var So = class extends it { constructor(e, r, n) { super(), this.topProd = e, this.targetOccurrence = r, this.targetProdType = n } startWalking() { return this.walk(this.topProd), this.restDef } checkIsTarget(e, r, n, i) { return e.idx === this.targetOccurrence && this.targetProdType === r ? (this.restDef = n.concat(i), !0) : !1 } walkOption(e, r, n) { this.checkIsTarget(e, $.OPTION, r, n) || super.walkOption(e, r, n) } walkAtLeastOne(e, r, n) { this.checkIsTarget(e, $.REPETITION_MANDATORY, r, n) || super.walkOption(e, r, n) } walkAtLeastOneSep(e, r, n) { this.checkIsTarget(e, $.REPETITION_MANDATORY_WITH_SEPARATOR, r, n) || super.walkOption(e, r, n) } walkMany(e, r, n) { this.checkIsTarget(e, $.REPETITION, r, n) || super.walkOption(e, r, n) } walkManySep(e, r, n) { this.checkIsTarget(e, $.REPETITION_WITH_SEPARATOR, r, n) || super.walkOption(e, r, n) } }, ri = class extends Te { constructor(e, r, n) { super(), this.targetOccurrence = e, this.targetProdType = r, this.targetRef = n, this.result = [] } checkIsTarget(e, r) { e.idx === this.targetOccurrence && this.targetProdType === r && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition) } visitOption(e) { this.checkIsTarget(e, $.OPTION) } visitRepetition(e) { this.checkIsTarget(e, $.REPETITION) } visitRepetitionMandatory(e) { this.checkIsTarget(e, $.REPETITION_MANDATORY) } visitRepetitionMandatoryWithSeparator(e) { this.checkIsTarget(e, $.REPETITION_MANDATORY_WITH_SEPARATOR) } visitRepetitionWithSeparator(e) { this.checkIsTarget(e, $.REPETITION_WITH_SEPARATOR) } visitAlternation(e) { this.checkIsTarget(e, $.ALTERNATION) } }; function bc(t) { let e = new Array(t); for (let r = 0; r < t; r++)e[r] = []; return e } function Ao(t) { let e = [""]; for (let r = 0; r < t.length; r++) { let n = t[r], i = []; for (let o = 0; o < e.length; o++) { let s = e[o]; i.push(s + "_" + n.tokenTypeIdx); for (let a = 0; a < n.categoryMatches.length; a++) { let l = "_" + n.categoryMatches[a]; i.push(s + l) } } e = i } return e } function GT(t, e, r) { for (let n = 0; n < t.length; n++) { if (n === r) continue; let i = t[n]; for (let o = 0; o < e.length; o++) { let s = e[o]; if (i[s] === !0) return !1 } } return !0 } function wc(t, e) { let r = d(t, s => ei([s], 1)), n = bc(r.length), i = d(r, s => { let a = {}; return E(s, l => { let c = Ao(l.partialPath); E(c, u => { a[u] = !0 }) }), a }), o = r; for (let s = 1; s <= e; s++) { let a = o; o = bc(a.length); for (let l = 0; l < a.length; l++) { let c = a[l]; for (let u = 0; u < c.length; u++) { let f = c[u].partialPath, h = c[u].suffixDef, T = Ao(f); if (GT(i, T, l) || L(h) || f.length === e) { let y = n[l]; if (ii(y, f) === !1) { y.push(f); for (let I = 0; I < T.length; I++) { let m = T[I]; i[l][m] = !0 } } } else { let y = ei(h, s + 1, f); o[l] = o[l].concat(y), E(y, I => { let m = Ao(I.partialPath); E(m, g => { i[l][g] = !0 }) }) } } } } return n } function Xr(t, e, r, n) { let i = new ri(t, $.ALTERNATION, n); return e.accept(i), wc(i.result, r) } function Yr(t, e, r, n) { let i = new ri(t, r); e.accept(i); let o = i.result, a = new So(e, t, r).startWalking(), l = new U({ definition: o }), c = new U({ definition: a }); return wc([l, c], n) } function ii(t, e) { e: for (let r = 0; r < t.length; r++) { let n = t[r]; if (n.length === e.length) { for (let i = 0; i < n.length; i++) { let o = e[i], s = n[i]; if ((o === s || s.categoryMatchesMap[o.tokenTypeIdx] !== void 0) === !1) continue e } return !0 } } return !1 } function Dc(t, e) { return t.length < e.length && ce(t, (r, n) => { let i = e[n]; return r === i || i.categoryMatchesMap[r.tokenTypeIdx] }) } function Fc(t) { return ce(t, e => ce(e, r => ce(r, n => L(n.categoryMatches)))) } function Bc(t) { let e = t.lookaheadStrategy.validate({ rules: t.rules, tokenTypes: t.tokenTypes, grammarName: t.grammarName }); return d(e, r => Object.assign({ type: ie.CUSTOM_LOOKAHEAD_VALIDATION }, r)) } function Gc(t, e, r, n) { let i = ge(t, l => jT(l, r)), o = zT(t, e, r), s = ge(t, l => WT(l, r)), a = ge(t, l => KT(l, t, n, r)); return i.concat(o, s, a) } function jT(t, e) { let r = new No; t.accept(r); let n = r.allProductions, i = no(n, $T), o = ye(i, a => a.length > 1); return d(_(o), a => { let l = ae(a), c = e.buildDuplicateFoundError(t, a), u = Oe(l), f = { message: c, type: ie.DUPLICATE_PRODUCTIONS, ruleName: t.name, dslName: u, occurrence: l.idx }, h = jc(l); return h && (f.parameter = h), f }) } function $T(t) { return `${Oe(t)}_#_${t.idx}_#_${jc(t)}` } function jc(t) { return t instanceof C ? t.terminalType.name : t instanceof M ? t.nonTerminalName : "" } var No = class extends Te { constructor() { super(...arguments), this.allProductions = [] } visitNonTerminal(e) { this.allProductions.push(e) } visitOption(e) { this.allProductions.push(e) } visitRepetitionWithSeparator(e) { this.allProductions.push(e) } visitRepetitionMandatory(e) { this.allProductions.push(e) } visitRepetitionMandatoryWithSeparator(e) { this.allProductions.push(e) } visitRepetition(e) { this.allProductions.push(e) } visitAlternation(e) { this.allProductions.push(e) } visitTerminal(e) { this.allProductions.push(e) } }; function KT(t, e, r, n) { let i = []; if (ee(e, (s, a) => a.name === t.name ? s + 1 : s, 0) > 1) { let s = n.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: r }); i.push({ message: s, type: ie.DUPLICATE_RULE_NAME, ruleName: t.name }) } return i } function $c(t, e, r) { let n = [], i; return F(e, t) || (i = `Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `, n.push({ message: i, type: ie.INVALID_RULE_OVERRIDE, ruleName: t })), n } function yo(t, e, r, n = []) { let i = [], o = oi(e.definition); if (L(o)) return []; { let s = t.name; F(o, t) && i.push({ message: r.buildLeftRecursionError({ topLevelRule: t, leftRecursionPath: n }), type: ie.LEFT_RECURSION, ruleName: s }); let l = Ot(o, n.concat([t])), c = ge(l, u => { let f = W(n); return f.push(u), yo(t, u, r, f) }); return i.concat(c) } } function oi(t) { let e = []; if (L(t)) return e; let r = ae(t); if (r instanceof M) e.push(r.referencedRule); else if (r instanceof U || r instanceof D || r instanceof X || r instanceof Y || r instanceof V || r instanceof v) e = e.concat(oi(r.definition)); else if (r instanceof H) e = re(d(r.definition, o => oi(o.definition))); else if (!(r instanceof C)) throw Error("non exhaustive match"); let n = wt(r), i = t.length > 1; if (n && i) { let o = q(t); return e.concat(oi(o)) } else return e } var Qr = class extends Te { constructor() { super(...arguments), this.alternations = [] } visitAlternation(e) { this.alternations.push(e) } }; function Kc(t, e) { let r = new Qr; t.accept(r); let n = r.alternations; return ge(n, o => { let s = nt(o.definition); return ge(s, (a, l) => { let c = ti([a], [], ot, 1); return L(c) ? [{ message: e.buildEmptyAlternationError({ topLevelRule: t, alternation: o, emptyChoiceIdx: l }), type: ie.NONE_LAST_EMPTY_ALT, ruleName: t.name, occurrence: o.idx, alternative: l + 1 }] : [] }) }) } function Wc(t, e, r) { let n = new Qr; t.accept(n); let i = n.alternations; return i = It(i, s => s.ignoreAmbiguities === !0), ge(i, s => { let a = s.idx, l = s.maxLookahead || e, c = Xr(a, t, l, s), u = VT(c, s, t, r), f = HT(c, s, t, r); return u.concat(f) }) } var Ro = class extends Te { constructor() { super(...arguments), this.allProductions = [] } visitRepetitionWithSeparator(e) { this.allProductions.push(e) } visitRepetitionMandatory(e) { this.allProductions.push(e) } visitRepetitionMandatoryWithSeparator(e) { this.allProductions.push(e) } visitRepetition(e) { this.allProductions.push(e) } }; function WT(t, e) { let r = new Qr; t.accept(r); let n = r.alternations; return ge(n, o => o.definition.length > 255 ? [{ message: e.buildTooManyAlternativesError({ topLevelRule: t, alternation: o }), type: ie.TOO_MANY_ALTS, ruleName: t.name, occurrence: o.idx }] : []) } function Vc(t, e, r) { let n = []; return E(t, i => { let o = new Ro; i.accept(o); let s = o.allProductions; E(s, a => { let l = ni(a), c = a.maxLookahead || e, u = a.idx, h = Yr(u, i, l, c)[0]; if (L(re(h))) { let T = r.buildEmptyRepetitionError({ topLevelRule: i, repetition: a }); n.push({ message: T, type: ie.NO_NON_EMPTY_LOOKAHEAD, ruleName: i.name }) } }) }), n } function VT(t, e, r, n) { let i = [], o = ee(t, (a, l, c) => (e.definition[c].ignoreAmbiguities === !0 || E(l, u => { let f = [c]; E(t, (h, T) => { c !== T && ii(h, u) && e.definition[T].ignoreAmbiguities !== !0 && f.push(T) }), f.length > 1 && !ii(i, u) && (i.push(u), a.push({ alts: f, path: u })) }), a), []); return d(o, a => { let l = d(a.alts, u => u + 1); return { message: n.buildAlternationAmbiguityError({ topLevelRule: r, alternation: e, ambiguityIndices: l, prefixPath: a.path }), type: ie.AMBIGUOUS_ALTS, ruleName: r.name, occurrence: e.idx, alternatives: a.alts } }) } function HT(t, e, r, n) { let i = ee(t, (s, a, l) => { let c = d(a, u => ({ idx: l, path: u })); return s.concat(c) }, []); return qe(ge(i, s => { if (e.definition[s.idx].ignoreAmbiguities === !0) return []; let l = s.idx, c = s.path, u = ue(i, h => e.definition[h.idx].ignoreAmbiguities !== !0 && h.idx < l && Dc(h.path, c)); return d(u, h => { let T = [h.idx + 1, l + 1], R = e.idx === 0 ? "" : e.idx; return { message: n.buildAlternationPrefixAmbiguityError({ topLevelRule: r, alternation: e, ambiguityIndices: T, prefixPath: h.path }), type: ie.AMBIGUOUS_PREFIX_ALTS, ruleName: r.name, occurrence: R, alternatives: T } }) })) } function zT(t, e, r) { let n = [], i = d(e, o => o.name); return E(t, o => { let s = o.name; if (F(i, s)) { let a = r.buildNamespaceConflictError(o); n.push({ message: a, type: ie.CONFLICT_TOKENS_RULES_NAMESPACE, ruleName: s }) } }), n } function Hc(t) { let e = fr(t, { errMsgProvider: vc }), r = {}; return E(t.rules, n => { r[n.name] = n }), _c(r, e.errMsgProvider) } function zc(t) { return t = fr(t, { errMsgProvider: Be }), Gc(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName) } var qc = "MismatchedTokenException", Xc = "NoViableAltException", Yc = "EarlyExitException", Qc = "NotAllInputParsedException", Zc = [qc, Xc, Yc, Qc]; Object.freeze(Zc); function Ct(t) { return F(Zc, t.name) } var Sr = class extends Error { constructor(e, r) { super(e), this.token = r, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor) } }, $t = class extends Sr { constructor(e, r, n) { super(e, r), this.previousToken = n, this.name = qc } }, Zr = class extends Sr { constructor(e, r, n) { super(e, r), this.previousToken = n, this.name = Xc } }, Jr = class extends Sr { constructor(e, r) { super(e, r), this.name = Qc } }, en = class extends Sr { constructor(e, r, n) { super(e, r), this.previousToken = n, this.name = Yc } }; var Oo = {}, Lo = "InRuleRecoveryException", Io = class extends Error { constructor(e) { super(e), this.name = Lo } }, si = class { initRecoverable(e) { this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = A(e, "recoveryEnabled") ? e.recoveryEnabled : xe.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = qT) } getTokenToInsert(e) { let r = jt(e, "", NaN, NaN, NaN, NaN, NaN, NaN); return r.isInsertedInRecovery = !0, r } canTokenTypeBeInsertedInRecovery(e) { return !0 } canTokenTypeBeDeletedInRecovery(e) { return !0 } tryInRepetitionRecovery(e, r, n, i) { let o = this.findReSyncTokenType(), s = this.exportLexerState(), a = [], l = !1, c = this.LA_FAST(1), u = this.LA_FAST(1), f = () => { let h = this.LA(0), T = this.errorMessageProvider.buildMismatchTokenMessage({ expected: i, actual: c, previous: h, ruleName: this.getCurrRuleFullName() }), R = new $t(T, c, this.LA(0)); R.resyncedTokens = nt(a), this.SAVE_ERROR(R) }; for (; !l;)if (this.tokenMatcher(u, i)) { f(); return } else if (n.call(this)) { f(), e.apply(this, r); return } else this.tokenMatcher(u, o) ? l = !0 : (u = this.SKIP_TOKEN(), this.addToResyncTokens(u, a)); this.importLexerState(s) } shouldInRepetitionRecoveryBeTried(e, r, n) { return !(n === !1 || this.tokenMatcher(this.LA_FAST(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, r))) } getFollowsForInRuleRecovery(e, r) { let n = this.getCurrentGrammarPath(e, r); return this.getNextPossibleTokenTypes(n) } tryInRuleRecovery(e, r) { if (this.canRecoverWithSingleTokenInsertion(e, r)) return this.getTokenToInsert(e); if (this.canRecoverWithSingleTokenDeletion(e)) { let n = this.SKIP_TOKEN(); return this.consumeToken(), n } throw new Io("sad sad panda") } canPerformInRuleRecovery(e, r) { return this.canRecoverWithSingleTokenInsertion(e, r) || this.canRecoverWithSingleTokenDeletion(e) } canRecoverWithSingleTokenInsertion(e, r) { if (!this.canTokenTypeBeInsertedInRecovery(e) || L(r)) return !1; let n = this.LA_FAST(1); return Xe(r, o => this.tokenMatcher(n, o)) !== void 0 } canRecoverWithSingleTokenDeletion(e) { return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : !1 } isInCurrentRuleReSyncSet(e) { let r = this.getCurrFollowKey(), n = this.getFollowSetFromFollowKey(r); return F(n, e) } findReSyncTokenType() { let e = this.flattenFollowSet(), r = this.LA_FAST(1), n = 2; for (; ;) { let i = Xe(e, o => Eo(r, o)); if (i !== void 0) return i; r = this.LA(n), n++ } } getCurrFollowKey() { if (this.RULE_STACK_IDX === 0) return Oo; let e = this.currRuleShortName, r = this.getLastExplicitRuleOccurrenceIndex(), n = this.getPreviousExplicitRuleShortName(); return { ruleName: this.shortRuleNameToFullName(e), idxInCallingRule: r, inRule: this.shortRuleNameToFullName(n) } } buildFullFollowKeyStack() { let e = this.RULE_STACK, r = this.RULE_OCCURRENCE_STACK, n = this.RULE_STACK_IDX + 1, i = new Array(n); for (let o = 0; o < n; o++)o === 0 ? i[o] = Oo : i[o] = { ruleName: this.shortRuleNameToFullName(e[o]), idxInCallingRule: r[o], inRule: this.shortRuleNameToFullName(e[o - 1]) }; return i } flattenFollowSet() { let e = d(this.buildFullFollowKeyStack(), r => this.getFollowSetFromFollowKey(r)); return re(e) } getFollowSetFromFollowKey(e) { if (e === Oo) return [Fe]; let r = e.ruleName + e.idxInCallingRule + $n + e.inRule; return this.resyncFollows[r] } addToResyncTokens(e, r) { return this.tokenMatcher(e, Fe) || r.push(e), r } reSyncTo(e) { let r = [], n = this.LA_FAST(1); for (; this.tokenMatcher(n, e) === !1;)n = this.SKIP_TOKEN(), this.addToResyncTokens(n, r); return nt(r) } attemptInRepetitionRecovery(e, r, n, i, o, s, a) { } getCurrentGrammarPath(e, r) { let n = this.getHumanReadableRuleStack(), i = this.RULE_OCCURRENCE_STACK.slice(0, this.RULE_OCCURRENCE_STACK_IDX + 1); return { ruleStack: n, occurrenceStack: i, lastTok: e, lastTokOccurrence: r } } getHumanReadableRuleStack() { let e = this.RULE_STACK_IDX + 1, r = new Array(e); for (let n = 0; n < e; n++)r[n] = this.shortRuleNameToFullName(this.RULE_STACK[n]); return r } }; function qT(t, e, r, n, i, o, s) { let a = this.getKeyForAutomaticLookahead(n, i), l = this.firstAfterRepMap[a]; if (l === void 0) { let h = this.getCurrRuleFullName(), T = this.getGAstProductions()[h]; l = new o(T, i).startWalking(), this.firstAfterRepMap[a] = l } let c = l.token, u = l.occurrence, f = l.isEndOfRule; this.RULE_STACK_IDX === 0 && f && c === void 0 && (c = Fe, u = 1), !(c === void 0 || u === void 0) && this.shouldInRepetitionRecoveryBeTried(c, u, s) && this.tryInRepetitionRecovery(t, e, r, c) } function ai(t, e, r) { return r | e | t } var tn = class { constructor(e) { var r; this.maxLookahead = (r = e?.maxLookahead) !== null && r !== void 0 ? r : xe.maxLookahead } validate(e) { let r = this.validateNoLeftRecursion(e.rules); if (L(r)) { let n = this.validateEmptyOrAlternatives(e.rules), i = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), o = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead); return [...r, ...n, ...i, ...o] } return r } validateNoLeftRecursion(e) { return ge(e, r => yo(r, r, Be)) } validateEmptyOrAlternatives(e) { return ge(e, r => Kc(r, Be)) } validateAmbiguousAlternationAlternatives(e, r) { return ge(e, n => Wc(n, r, Be)) } validateSomeNonEmptyLookaheadPath(e, r) { return Vc(e, r, Be) } buildLookaheadForAlternation(e) { return kc(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, Mc) } buildLookaheadForOptional(e) { return Pc(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, ni(e.prodType), Uc) } }; var ci = class { initLooksAhead(e) { this.dynamicTokensEnabled = A(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : xe.dynamicTokensEnabled, this.maxLookahead = A(e, "maxLookahead") ? e.maxLookahead : xe.maxLookahead, this.lookaheadStrategy = A(e, "lookaheadStrategy") ? e.lookaheadStrategy : new tn({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = new Map } preComputeLookaheadFunctions(e) { E(e, r => { this.TRACE_INIT(`${r.name} Rule Lookahead`, () => { let { alternation: n, repetition: i, option: o, repetitionMandatory: s, repetitionMandatoryWithSeparator: a, repetitionWithSeparator: l } = XT(r); E(n, c => { let u = c.idx === 0 ? "" : c.idx; this.TRACE_INIT(`${Oe(c)}${u}`, () => { let f = this.lookaheadStrategy.buildLookaheadForAlternation({ prodOccurrence: c.idx, rule: r, maxLookahead: c.maxLookahead || this.maxLookahead, hasPredicates: c.hasPredicates, dynamicTokensEnabled: this.dynamicTokensEnabled }), h = ai(this.fullRuleNameToShort[r.name], 256, c.idx); this.setLaFuncCache(h, f) }) }), E(i, c => { this.computeLookaheadFunc(r, c.idx, 768, "Repetition", c.maxLookahead, Oe(c)) }), E(o, c => { this.computeLookaheadFunc(r, c.idx, 512, "Option", c.maxLookahead, Oe(c)) }), E(s, c => { this.computeLookaheadFunc(r, c.idx, 1024, "RepetitionMandatory", c.maxLookahead, Oe(c)) }), E(a, c => { this.computeLookaheadFunc(r, c.idx, 1536, "RepetitionMandatoryWithSeparator", c.maxLookahead, Oe(c)) }), E(l, c => { this.computeLookaheadFunc(r, c.idx, 1280, "RepetitionWithSeparator", c.maxLookahead, Oe(c)) }) }) }) } computeLookaheadFunc(e, r, n, i, o, s) { this.TRACE_INIT(`${s}${r === 0 ? "" : r}`, () => { let a = this.lookaheadStrategy.buildLookaheadForOptional({ prodOccurrence: r, rule: e, maxLookahead: o || this.maxLookahead, dynamicTokensEnabled: this.dynamicTokensEnabled, prodType: i }), l = ai(this.fullRuleNameToShort[e.name], n, r); this.setLaFuncCache(l, a) }) } getKeyForAutomaticLookahead(e, r) { return ai(this.currRuleShortName, e, r) } getLaFuncFromCache(e) { return this.lookAheadFuncsCache.get(e) } setLaFuncCache(e, r) { this.lookAheadFuncsCache.set(e, r) } }, Co = class extends Te { constructor() { super(...arguments), this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] } } reset() { this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] } } visitOption(e) { this.dslMethods.option.push(e) } visitRepetitionWithSeparator(e) { this.dslMethods.repetitionWithSeparator.push(e) } visitRepetitionMandatory(e) { this.dslMethods.repetitionMandatory.push(e) } visitRepetitionMandatoryWithSeparator(e) { this.dslMethods.repetitionMandatoryWithSeparator.push(e) } visitRepetition(e) { this.dslMethods.repetition.push(e) } visitAlternation(e) { this.dslMethods.alternation.push(e) } }, li = new Co; function XT(t) { li.reset(), t.accept(li); let e = li.dslMethods; return li.reset(), e } function bo(t, e) { isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset) } function ko(t, e) { isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) } function Jc(t, e, r) { t.children[r] === void 0 ? t.children[r] = [e] : t.children[r].push(e) } function eu(t, e, r) { t.children[e] === void 0 ? t.children[e] = [r] : t.children[e].push(r) } var YT = "name"; function Po(t, e) { Object.defineProperty(t, YT, { enumerable: !1, configurable: !0, writable: !1, value: e }) } function QT(t, e) { let r = k(t), n = r.length; for (let i = 0; i < n; i++) { let o = r[i], s = t[o], a = s.length; for (let l = 0; l < a; l++) { let c = s[l]; c.tokenTypeIdx === void 0 && this[c.name](c.children, e) } } } function tu(t, e) {
  let r = function () { }; Po(r, t + "BaseSemantics"); let n = {
    visit: function (i, o) { if (N(i) && (i = i[0]), !fe(i)) return this[i.name](i.children, o) }, validateVisitor: function () {
      let i = ZT(this, e); if (!L(i)) {
        let o = d(i, s => s.msg); throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g, `
	`)}`)
      }
    }
  }; return r.prototype = n, r.prototype.constructor = r, r._RULE_NAMES = e, r
} function ru(t, e, r) { let n = function () { }; Po(n, t + "BaseSemanticsWithDefaults"); let i = Object.create(r.prototype); return E(e, o => { i[o] = QT }), n.prototype = i, n.prototype.constructor = n, n } var Mo; (function (t) { t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD" })(Mo || (Mo = {})); function ZT(t, e) { return JT(t, e) } function JT(t, e) { let r = ue(e, i => de(t[i]) === !1), n = d(r, i => ({ msg: `Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`, type: Mo.MISSING_METHOD, methodName: i })); return qe(n) } var pi = class { initTreeBuilder(e) { if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = A(e, "nodeLocationTracking") ? e.nodeLocationTracking : xe.nodeLocationTracking, !this.outputCst) this.cstInvocationStateUpdate = K, this.cstFinallyStateUpdate = K, this.cstPostTerminal = K, this.cstPostNonTerminal = K, this.cstPostRule = K; else if (/full/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = ko, this.setNodeLocationFromNode = ko, this.cstPostRule = K, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = K, this.setNodeLocationFromNode = K, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular); else if (/onlyOffset/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = bo, this.setNodeLocationFromNode = bo, this.cstPostRule = K, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = K, this.setNodeLocationFromNode = K, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular); else if (/none/i.test(this.nodeLocationTracking)) this.setNodeLocationFromToken = K, this.setNodeLocationFromNode = K, this.cstPostRule = K, this.setInitialNodeLocation = K; else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`) } setInitialNodeLocationOnlyOffsetRecovery(e) { e.location = { startOffset: NaN, endOffset: NaN } } setInitialNodeLocationOnlyOffsetRegular(e) { e.location = { startOffset: this.LA_FAST(1).startOffset, endOffset: NaN } } setInitialNodeLocationFullRecovery(e) { e.location = { startOffset: NaN, startLine: NaN, startColumn: NaN, endOffset: NaN, endLine: NaN, endColumn: NaN } } setInitialNodeLocationFullRegular(e) { let r = this.LA_FAST(1); e.location = { startOffset: r.startOffset, startLine: r.startLine, startColumn: r.startColumn, endOffset: NaN, endLine: NaN, endColumn: NaN } } cstInvocationStateUpdate(e) { let r = { name: e, children: Object.create(null) }; this.setInitialNodeLocation(r), this.CST_STACK.push(r) } cstFinallyStateUpdate() { this.CST_STACK.pop() } cstPostRuleFull(e) { let r = this.LA(0), n = e.location; n.startOffset <= r.startOffset ? (n.endOffset = r.endOffset, n.endLine = r.endLine, n.endColumn = r.endColumn) : (n.startOffset = NaN, n.startLine = NaN, n.startColumn = NaN) } cstPostRuleOnlyOffset(e) { let r = this.LA(0), n = e.location; n.startOffset <= r.startOffset ? n.endOffset = r.endOffset : n.startOffset = NaN } cstPostTerminal(e, r) { let n = this.CST_STACK[this.CST_STACK.length - 1]; Jc(n, r, e), this.setNodeLocationFromToken(n.location, r) } cstPostNonTerminal(e, r) { let n = this.CST_STACK[this.CST_STACK.length - 1]; eu(n, r, e), this.setNodeLocationFromNode(n.location, e.location) } getBaseCstVisitorConstructor() { if (fe(this.baseCstVisitorConstructor)) { let e = tu(this.className, k(this.gastProductionsCache)); return this.baseCstVisitorConstructor = e, e } return this.baseCstVisitorConstructor } getBaseCstVisitorConstructorWithDefaults() { if (fe(this.baseCstVisitorWithDefaultsConstructor)) { let e = ru(this.className, k(this.gastProductionsCache), this.getBaseCstVisitorConstructor()); return this.baseCstVisitorWithDefaultsConstructor = e, e } return this.baseCstVisitorWithDefaultsConstructor } getPreviousExplicitRuleShortName() { return this.RULE_STACK[this.RULE_STACK_IDX - 1] } getLastExplicitRuleOccurrenceIndex() { return this.RULE_OCCURRENCE_STACK[this.RULE_OCCURRENCE_STACK_IDX] } }; var mi = class { initLexerAdapter() { this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1 } set input(e) { if (this.selfAnalysisDone !== !0) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor."); this.reset(), this.tokVector = e, this.tokVectorLength = e.length } get input() { return this.tokVector } SKIP_TOKEN() { return this.currIdx <= this.tokVectorLength - 2 ? (this.consumeToken(), this.LA_FAST(1)) : at } LA_FAST(e) { let r = this.currIdx + e; return this.tokVector[r] } LA(e) { let r = this.currIdx + e; return r < 0 || this.tokVectorLength <= r ? at : this.tokVector[r] } consumeToken() { this.currIdx++ } exportLexerState() { return this.currIdx } importLexerState(e) { this.currIdx = e } resetLexerState() { this.currIdx = -1 } moveToTerminatedState() { this.currIdx = this.tokVectorLength - 1 } getLexerPosition() { return this.exportLexerState() } }; var di = class { ACTION(e) { return e.call(this) } consume(e, r, n) { return this.consumeInternal(r, e, n) } subrule(e, r, n) { return this.subruleInternal(r, e, n) } option(e, r) { return this.optionInternal(r, e) } or(e, r) { return this.orInternal(r, e) } many(e, r) { return this.manyInternal(e, r) } atLeastOne(e, r) { return this.atLeastOneInternal(e, r) } CONSUME(e, r) { return this.consumeInternal(e, 0, r) } CONSUME1(e, r) { return this.consumeInternal(e, 1, r) } CONSUME2(e, r) { return this.consumeInternal(e, 2, r) } CONSUME3(e, r) { return this.consumeInternal(e, 3, r) } CONSUME4(e, r) { return this.consumeInternal(e, 4, r) } CONSUME5(e, r) { return this.consumeInternal(e, 5, r) } CONSUME6(e, r) { return this.consumeInternal(e, 6, r) } CONSUME7(e, r) { return this.consumeInternal(e, 7, r) } CONSUME8(e, r) { return this.consumeInternal(e, 8, r) } CONSUME9(e, r) { return this.consumeInternal(e, 9, r) } SUBRULE(e, r) { return this.subruleInternal(e, 0, r) } SUBRULE1(e, r) { return this.subruleInternal(e, 1, r) } SUBRULE2(e, r) { return this.subruleInternal(e, 2, r) } SUBRULE3(e, r) { return this.subruleInternal(e, 3, r) } SUBRULE4(e, r) { return this.subruleInternal(e, 4, r) } SUBRULE5(e, r) { return this.subruleInternal(e, 5, r) } SUBRULE6(e, r) { return this.subruleInternal(e, 6, r) } SUBRULE7(e, r) { return this.subruleInternal(e, 7, r) } SUBRULE8(e, r) { return this.subruleInternal(e, 8, r) } SUBRULE9(e, r) { return this.subruleInternal(e, 9, r) } OPTION(e) { return this.optionInternal(e, 0) } OPTION1(e) { return this.optionInternal(e, 1) } OPTION2(e) { return this.optionInternal(e, 2) } OPTION3(e) { return this.optionInternal(e, 3) } OPTION4(e) { return this.optionInternal(e, 4) } OPTION5(e) { return this.optionInternal(e, 5) } OPTION6(e) { return this.optionInternal(e, 6) } OPTION7(e) { return this.optionInternal(e, 7) } OPTION8(e) { return this.optionInternal(e, 8) } OPTION9(e) { return this.optionInternal(e, 9) } OR(e) { return this.orInternal(e, 0) } OR1(e) { return this.orInternal(e, 1) } OR2(e) { return this.orInternal(e, 2) } OR3(e) { return this.orInternal(e, 3) } OR4(e) { return this.orInternal(e, 4) } OR5(e) { return this.orInternal(e, 5) } OR6(e) { return this.orInternal(e, 6) } OR7(e) { return this.orInternal(e, 7) } OR8(e) { return this.orInternal(e, 8) } OR9(e) { return this.orInternal(e, 9) } MANY(e) { this.manyInternal(0, e) } MANY1(e) { this.manyInternal(1, e) } MANY2(e) { this.manyInternal(2, e) } MANY3(e) { this.manyInternal(3, e) } MANY4(e) { this.manyInternal(4, e) } MANY5(e) { this.manyInternal(5, e) } MANY6(e) { this.manyInternal(6, e) } MANY7(e) { this.manyInternal(7, e) } MANY8(e) { this.manyInternal(8, e) } MANY9(e) { this.manyInternal(9, e) } MANY_SEP(e) { this.manySepFirstInternal(0, e) } MANY_SEP1(e) { this.manySepFirstInternal(1, e) } MANY_SEP2(e) { this.manySepFirstInternal(2, e) } MANY_SEP3(e) { this.manySepFirstInternal(3, e) } MANY_SEP4(e) { this.manySepFirstInternal(4, e) } MANY_SEP5(e) { this.manySepFirstInternal(5, e) } MANY_SEP6(e) { this.manySepFirstInternal(6, e) } MANY_SEP7(e) { this.manySepFirstInternal(7, e) } MANY_SEP8(e) { this.manySepFirstInternal(8, e) } MANY_SEP9(e) { this.manySepFirstInternal(9, e) } AT_LEAST_ONE(e) { this.atLeastOneInternal(0, e) } AT_LEAST_ONE1(e) { return this.atLeastOneInternal(1, e) } AT_LEAST_ONE2(e) { this.atLeastOneInternal(2, e) } AT_LEAST_ONE3(e) { this.atLeastOneInternal(3, e) } AT_LEAST_ONE4(e) { this.atLeastOneInternal(4, e) } AT_LEAST_ONE5(e) { this.atLeastOneInternal(5, e) } AT_LEAST_ONE6(e) { this.atLeastOneInternal(6, e) } AT_LEAST_ONE7(e) { this.atLeastOneInternal(7, e) } AT_LEAST_ONE8(e) { this.atLeastOneInternal(8, e) } AT_LEAST_ONE9(e) { this.atLeastOneInternal(9, e) } AT_LEAST_ONE_SEP(e) { this.atLeastOneSepFirstInternal(0, e) } AT_LEAST_ONE_SEP1(e) { this.atLeastOneSepFirstInternal(1, e) } AT_LEAST_ONE_SEP2(e) { this.atLeastOneSepFirstInternal(2, e) } AT_LEAST_ONE_SEP3(e) { this.atLeastOneSepFirstInternal(3, e) } AT_LEAST_ONE_SEP4(e) { this.atLeastOneSepFirstInternal(4, e) } AT_LEAST_ONE_SEP5(e) { this.atLeastOneSepFirstInternal(5, e) } AT_LEAST_ONE_SEP6(e) { this.atLeastOneSepFirstInternal(6, e) } AT_LEAST_ONE_SEP7(e) { this.atLeastOneSepFirstInternal(7, e) } AT_LEAST_ONE_SEP8(e) { this.atLeastOneSepFirstInternal(8, e) } AT_LEAST_ONE_SEP9(e) { this.atLeastOneSepFirstInternal(9, e) } RULE(e, r, n = Nr) { if (F(this.definedRulesNames, e)) { let s = { message: Be.buildDuplicateRuleNameError({ topLevelRule: e, grammarName: this.className }), type: ie.DUPLICATE_RULE_NAME, ruleName: e }; this.definitionErrors.push(s) } this.definedRulesNames.push(e); let i = this.defineRule(e, r, n); return this[e] = i, i } OVERRIDE_RULE(e, r, n = Nr) { let i = $c(e, this.definedRulesNames, this.className); this.definitionErrors = this.definitionErrors.concat(i); let o = this.defineRule(e, r, n); return this[e] = o, o } BACKTRACK(e, r) { var n; let i = (n = e.coreRule) !== null && n !== void 0 ? n : e; return function () { this.isBackTrackingStack.push(1); let o = this.saveRecogState(); try { return i.apply(this, r), !0 } catch (s) { if (Ct(s)) return !1; throw s } finally { this.reloadRecogState(o), this.isBackTrackingStack.pop() } } } getGAstProductions() { return this.gastProductionsCache } getSerializedGastProductions() { return jn(_(this.gastProductionsCache)) } }; var gi = class {
  initRecognizerEngine(e, r) {
    if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = xr, this.subruleIdx = 0, this.currRuleShortName = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_STACK_IDX = -1, this.RULE_OCCURRENCE_STACK = [], this.RULE_OCCURRENCE_STACK_IDX = -1, this.gastProductionsCache = {}, A(r, "serializedGrammar")) throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`); if (N(e)) {
      if (L(e)) throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`); if (typeof e[0].startOffset == "number") throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)
    } if (N(e)) this.tokensMap = ee(e, (o, s) => (o[s.name] = s, o), {}); else if (A(e, "modes") && ce(re(_(e.modes)), Ac)) { let o = re(_(e.modes)), s = hr(o); this.tokensMap = ee(s, (a, l) => (a[l.name] = l, a), {}) } else if (G(e)) this.tokensMap = W(e); else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition"); this.tokensMap.EOF = Fe; let n = A(e, "modes") ? re(_(e.modes)) : _(e), i = ce(n, o => L(o.categoryMatches)); this.tokenMatcher = i ? xr : ot, st(_(this.tokensMap))
  } defineRule(e, r, n) {
    if (this.selfAnalysisDone) throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`); let i = A(n, "resyncEnabled") ? n.resyncEnabled : Nr.resyncEnabled, o = A(n, "recoveryValueFunc") ? n.recoveryValueFunc : Nr.recoveryValueFunc, s = this.ruleShortNameIdx << 12; this.ruleShortNameIdx++, this.shortRuleNameToFull[s] = e, this.fullRuleNameToShort[e] = s; let a; return this.outputCst === !0 ? a = function (...f) { try { this.ruleInvocationStateUpdate(s, e, this.subruleIdx), r.apply(this, f); let h = this.CST_STACK[this.CST_STACK.length - 1]; return this.cstPostRule(h), h } catch (h) { return this.invokeRuleCatch(h, i, o) } finally { this.ruleFinallyStateUpdate() } } : a = function (...f) { try { return this.ruleInvocationStateUpdate(s, e, this.subruleIdx), r.apply(this, f) } catch (h) { return this.invokeRuleCatch(h, i, o) } finally { this.ruleFinallyStateUpdate() } }, Object.assign(function (...f) { this.onBeforeParse(e); try { return a.apply(this, f) } finally { this.onAfterParse(e) } }, { ruleName: e, originalGrammarAction: r, coreRule: a })
  } invokeRuleCatch(e, r, n) { let i = this.RULE_STACK_IDX === 0, o = r && !this.isBackTracking() && this.recoveryEnabled; if (Ct(e)) { let s = e; if (o) { let a = this.findReSyncTokenType(); if (this.isInCurrentRuleReSyncSet(a)) if (s.resyncedTokens = this.reSyncTo(a), this.outputCst) { let l = this.CST_STACK[this.CST_STACK.length - 1]; return l.recoveredNode = !0, l } else return n(e); else { if (this.outputCst) { let l = this.CST_STACK[this.CST_STACK.length - 1]; l.recoveredNode = !0, s.partialCstResult = l } throw s } } else { if (i) return this.moveToTerminatedState(), n(e); throw s } } else throw e } optionInternal(e, r) { let n = this.getKeyForAutomaticLookahead(512, r); return this.optionInternalLogic(e, r, n) } optionInternalLogic(e, r, n) { let i = this.getLaFuncFromCache(n), o; if (typeof e != "function") { o = e.DEF; let s = e.GATE; if (s !== void 0) { let a = i; i = () => s.call(this) && a.call(this) } } else o = e; if (i.call(this) === !0) return o.call(this) } atLeastOneInternal(e, r) { let n = this.getKeyForAutomaticLookahead(1024, e); return this.atLeastOneInternalLogic(e, r, n) } atLeastOneInternalLogic(e, r, n) { let i = this.getLaFuncFromCache(n), o; if (typeof r != "function") { o = r.DEF; let s = r.GATE; if (s !== void 0) { let a = i; i = () => s.call(this) && a.call(this) } } else o = r; if (i.call(this) === !0) { let s = this.doSingleRepetition(o); for (; i.call(this) === !0 && s === !0;)s = this.doSingleRepetition(o) } else throw this.raiseEarlyExitException(e, $.REPETITION_MANDATORY, r.ERR_MSG); this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, r], i, 1024, e, Jn) } atLeastOneSepFirstInternal(e, r) { let n = this.getKeyForAutomaticLookahead(1536, e); this.atLeastOneSepFirstInternalLogic(e, r, n) } atLeastOneSepFirstInternalLogic(e, r, n) { let i = r.DEF, o = r.SEP; if (this.getLaFuncFromCache(n).call(this) === !0) { i.call(this); let a = () => this.tokenMatcher(this.LA_FAST(1), o); for (; this.tokenMatcher(this.LA_FAST(1), o) === !0;)this.CONSUME(o), i.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, o, a, i, qr], a, 1536, e, qr) } else throw this.raiseEarlyExitException(e, $.REPETITION_MANDATORY_WITH_SEPARATOR, r.ERR_MSG) } manyInternal(e, r) { let n = this.getKeyForAutomaticLookahead(768, e); return this.manyInternalLogic(e, r, n) } manyInternalLogic(e, r, n) { let i = this.getLaFuncFromCache(n), o; if (typeof r != "function") { o = r.DEF; let a = r.GATE; if (a !== void 0) { let l = i; i = () => a.call(this) && l.call(this) } } else o = r; let s = !0; for (; i.call(this) === !0 && s === !0;)s = this.doSingleRepetition(o); this.attemptInRepetitionRecovery(this.manyInternal, [e, r], i, 768, e, Zn, s) } manySepFirstInternal(e, r) { let n = this.getKeyForAutomaticLookahead(1280, e); this.manySepFirstInternalLogic(e, r, n) } manySepFirstInternalLogic(e, r, n) { let i = r.DEF, o = r.SEP; if (this.getLaFuncFromCache(n).call(this) === !0) { i.call(this); let a = () => this.tokenMatcher(this.LA_FAST(1), o); for (; this.tokenMatcher(this.LA_FAST(1), o) === !0;)this.CONSUME(o), i.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, o, a, i, zr], a, 1280, e, zr) } } repetitionSepSecondInternal(e, r, n, i, o) { for (; n();)this.CONSUME(r), i.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, r, n, i, o], n, 1536, e, o) } doSingleRepetition(e) { let r = this.getLexerPosition(); return e.call(this), this.getLexerPosition() > r } orInternal(e, r) { let n = this.getKeyForAutomaticLookahead(256, r), i = N(e) ? e : e.DEF, s = this.getLaFuncFromCache(n).call(this, i); if (s !== void 0) return i[s].ALT.call(this); this.raiseNoAltException(r, e.ERR_MSG) } ruleFinallyStateUpdate() { this.RULE_STACK_IDX--, this.RULE_OCCURRENCE_STACK_IDX--, this.RULE_STACK_IDX >= 0 && (this.currRuleShortName = this.RULE_STACK[this.RULE_STACK_IDX]), this.cstFinallyStateUpdate() } subruleInternal(e, r, n) { let i; try { let o = n !== void 0 ? n.ARGS : void 0; return this.subruleIdx = r, i = e.coreRule.apply(this, o), this.cstPostNonTerminal(i, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.ruleName), i } catch (o) { throw this.subruleInternalError(o, n, e.ruleName) } } subruleInternalError(e, r, n) { throw Ct(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : n), delete e.partialCstResult), e } consumeInternal(e, r, n) { let i; try { let o = this.LA_FAST(1); this.tokenMatcher(o, e) === !0 ? (this.consumeToken(), i = o) : this.consumeInternalError(e, o, n) } catch (o) { i = this.consumeInternalRecovery(e, r, o) } return this.cstPostTerminal(n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.name, i), i } consumeInternalError(e, r, n) { let i, o = this.LA(0); throw n !== void 0 && n.ERR_MSG ? i = n.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({ expected: e, actual: r, previous: o, ruleName: this.getCurrRuleFullName() }), this.SAVE_ERROR(new $t(i, r, o)) } consumeInternalRecovery(e, r, n) { if (this.recoveryEnabled && n.name === "MismatchedTokenException" && !this.isBackTracking()) { let i = this.getFollowsForInRuleRecovery(e, r); try { return this.tryInRuleRecovery(e, i) } catch (o) { throw o.name === Lo ? n : o } } else throw n } saveRecogState() { let e = this.errors, r = this.RULE_STACK.slice(0, this.RULE_STACK_IDX + 1); return { errors: e, lexerState: this.exportLexerState(), RULE_STACK: r, CST_STACK: this.CST_STACK } } reloadRecogState(e) { this.errors = e.errors, this.importLexerState(e.lexerState); let r = e.RULE_STACK; for (let n = 0; n < r.length; n++)this.RULE_STACK[n] = r[n]; this.RULE_STACK_IDX = r.length - 1, this.RULE_STACK_IDX >= 0 && (this.currRuleShortName = this.RULE_STACK[this.RULE_STACK_IDX]) } ruleInvocationStateUpdate(e, r, n) { this.RULE_OCCURRENCE_STACK[++this.RULE_OCCURRENCE_STACK_IDX] = n, this.RULE_STACK[++this.RULE_STACK_IDX] = e, this.currRuleShortName = e, this.cstInvocationStateUpdate(r) } isBackTracking() { return this.isBackTrackingStack.length !== 0 } getCurrRuleFullName() { let e = this.currRuleShortName; return this.shortRuleNameToFull[e] } shortRuleNameToFullName(e) { return this.shortRuleNameToFull[e] } isAtEndOfInput() { return this.tokenMatcher(this.LA(1), Fe) } reset() { this.resetLexerState(), this.subruleIdx = 0, this.currRuleShortName = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK_IDX = -1, this.RULE_OCCURRENCE_STACK_IDX = -1, this.CST_STACK = [] } onBeforeParse(e) { for (let r = 0; r < this.maxLookahead + 1; r++)this.tokVector.push(at) } onAfterParse(e) { if (this.isAtEndOfInput() === !1) { let r = this.LA(1), n = this.errorMessageProvider.buildNotAllInputParsedMessage({ firstRedundant: r, ruleName: this.getCurrRuleFullName() }); this.SAVE_ERROR(new Jr(n, r)) } for (; this.tokVector.at(-1) === at;)this.tokVector.pop() }
}; var Ei = class { initErrorHandler(e) { this._errors = [], this.errorMessageProvider = A(e, "errorMessageProvider") ? e.errorMessageProvider : xe.errorMessageProvider } SAVE_ERROR(e) { if (Ct(e)) return e.context = { ruleStack: this.getHumanReadableRuleStack(), ruleOccurrenceStack: this.RULE_OCCURRENCE_STACK.slice(0, this.RULE_OCCURRENCE_STACK_IDX + 1) }, this._errors.push(e), e; throw Error("Trying to save an Error which is not a RecognitionException") } get errors() { return W(this._errors) } set errors(e) { this._errors = e } raiseEarlyExitException(e, r, n) { let i = this.getCurrRuleFullName(), o = this.getGAstProductions()[i], a = Yr(e, o, r, this.maxLookahead)[0], l = []; for (let u = 1; u <= this.maxLookahead; u++)l.push(this.LA(u)); let c = this.errorMessageProvider.buildEarlyExitMessage({ expectedIterationPaths: a, actual: l, previous: this.LA(0), customUserDescription: n, ruleName: i }); throw this.SAVE_ERROR(new en(c, this.LA(1), this.LA(0))) } raiseNoAltException(e, r) { let n = this.getCurrRuleFullName(), i = this.getGAstProductions()[n], o = Xr(e, i, this.maxLookahead), s = []; for (let c = 1; c <= this.maxLookahead; c++)s.push(this.LA(c)); let a = this.LA(0), l = this.errorMessageProvider.buildNoViableAltMessage({ expectedPathsPerAlt: o, actual: s, previous: a, customUserDescription: r, ruleName: this.getCurrRuleFullName() }); throw this.SAVE_ERROR(new Zr(l, this.LA(1), a)) } }; var Ti = class { initContentAssist() { } computeContentAssist(e, r) { let n = this.gastProductionsCache[e]; if (fe(n)) throw Error(`Rule ->${e}<- does not exist in this grammar.`); return ti([n], r, this.tokenMatcher, this.maxLookahead) } getNextPossibleTokenTypes(e) { let r = ae(e.ruleStack), i = this.getGAstProductions()[r]; return new Qn(i, e).startWalking() } }; var Si = { description: "This Object indicates the Parser is during Recording Phase" }; Object.freeze(Si); var nu = !0, iu = Math.pow(2, 8) - 1, su = S({ name: "RECORDING_PHASE_TOKEN", pattern: j.NA }); st([su]); var au = jt(su, `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, -1, -1, -1, -1, -1, -1); Object.freeze(au); var tx = {
  name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, children: {}
}, xi = class {
  initGastRecorder(e) { this.recordingProdStack = [], this.RECORDING_PHASE = !1 } enableRecording() { this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", () => { for (let e = 0; e < 10; e++) { let r = e > 0 ? e : ""; this[`CONSUME${r}`] = function (n, i) { return this.consumeInternalRecord(n, e, i) }, this[`SUBRULE${r}`] = function (n, i) { return this.subruleInternalRecord(n, e, i) }, this[`OPTION${r}`] = function (n) { return this.optionInternalRecord(n, e) }, this[`OR${r}`] = function (n) { return this.orInternalRecord(n, e) }, this[`MANY${r}`] = function (n) { this.manyInternalRecord(e, n) }, this[`MANY_SEP${r}`] = function (n) { this.manySepFirstInternalRecord(e, n) }, this[`AT_LEAST_ONE${r}`] = function (n) { this.atLeastOneInternalRecord(e, n) }, this[`AT_LEAST_ONE_SEP${r}`] = function (n) { this.atLeastOneSepFirstInternalRecord(e, n) } } this.consume = function (e, r, n) { return this.consumeInternalRecord(r, e, n) }, this.subrule = function (e, r, n) { return this.subruleInternalRecord(r, e, n) }, this.option = function (e, r) { return this.optionInternalRecord(r, e) }, this.or = function (e, r) { return this.orInternalRecord(r, e) }, this.many = function (e, r) { this.manyInternalRecord(e, r) }, this.atLeastOne = function (e, r) { this.atLeastOneInternalRecord(e, r) }, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD }) } disableRecording() { this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", () => { let e = this; for (let r = 0; r < 10; r++) { let n = r > 0 ? r : ""; delete e[`CONSUME${n}`], delete e[`SUBRULE${n}`], delete e[`OPTION${n}`], delete e[`OR${n}`], delete e[`MANY${n}`], delete e[`MANY_SEP${n}`], delete e[`AT_LEAST_ONE${n}`], delete e[`AT_LEAST_ONE_SEP${n}`] } delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA }) } ACTION_RECORD(e) { } BACKTRACK_RECORD(e, r) { return () => !0 } LA_RECORD(e) { return at } topLevelRuleRecord(e, r) {
    try { let n = new Ee({ definition: [], name: e }); return n.name = e, this.recordingProdStack.push(n), r.call(this), this.recordingProdStack.pop(), n } catch (n) {
      if (n.KNOWN_RECORDER_ERROR !== !0) try {
        n.message = n.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`} catch { throw n } throw n
    }
  } optionInternalRecord(e, r) { return nn.call(this, D, e, r) } atLeastOneInternalRecord(e, r) { nn.call(this, X, r, e) } atLeastOneSepFirstInternalRecord(e, r) { nn.call(this, Y, r, e, nu) } manyInternalRecord(e, r) { nn.call(this, v, r, e) } manySepFirstInternalRecord(e, r) { nn.call(this, V, r, e, nu) } orInternalRecord(e, r) { return rx.call(this, e, r) } subruleInternalRecord(e, r, n) {
    if (Ai(r), !e || A(e, "ruleName") === !1) {
      let a = new Error(`<SUBRULE${ou(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`); throw a.KNOWN_RECORDER_ERROR = !0, a
    } let i = De(this.recordingProdStack), o = e.ruleName, s = new M({ idx: r, nonTerminalName: o, label: n?.LABEL, referencedRule: void 0 }); return i.definition.push(s), this.outputCst ? tx : Si
  } consumeInternalRecord(e, r, n) {
    if (Ai(r), !po(e)) {
      let s = new Error(`<CONSUME${ou(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`); throw s.KNOWN_RECORDER_ERROR = !0, s
    } let i = De(this.recordingProdStack), o = new C({ idx: r, terminalType: e, label: n?.LABEL }); return i.definition.push(o), au
  }
}; function nn(t, e, r, n = !1) { Ai(r); let i = De(this.recordingProdStack), o = de(e) ? e : e.DEF, s = new t({ definition: [], idx: r }); return n && (s.separator = e.SEP), A(e, "MAX_LOOKAHEAD") && (s.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(s), o.call(this), i.definition.push(s), this.recordingProdStack.pop(), Si } function rx(t, e) { Ai(e); let r = De(this.recordingProdStack), n = N(t) === !1, i = n === !1 ? t : t.DEF, o = new H({ definition: [], idx: e, ignoreAmbiguities: n && t.IGNORE_AMBIGUITIES === !0 }); A(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD); let s = Dr(i, a => de(a.GATE)); return o.hasPredicates = s, r.definition.push(o), E(i, a => { let l = new U({ definition: [] }); o.definition.push(l), A(a, "IGNORE_AMBIGUITIES") ? l.ignoreAmbiguities = a.IGNORE_AMBIGUITIES : A(a, "GATE") && (l.ignoreAmbiguities = !0), this.recordingProdStack.push(l), a.ALT.call(this), this.recordingProdStack.pop() }), Si } function ou(t) { return t === 0 ? "" : `${t}` } function Ai(t) {
  if (t < 0 || t > iu) {
    let e = new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${iu + 1}`); throw e.KNOWN_RECORDER_ERROR = !0, e
  }
} var Ni = class { initPerformanceTracer(e) { if (A(e, "traceInitPerf")) { let r = e.traceInitPerf, n = typeof r == "number"; this.traceInitMaxIdent = n ? r : 1 / 0, this.traceInitPerf = n ? r > 0 : r } else this.traceInitMaxIdent = 0, this.traceInitPerf = xe.traceInitPerf; this.traceInitIndent = -1 } TRACE_INIT(e, r) { if (this.traceInitPerf === !0) { this.traceInitIndent++; let n = new Array(this.traceInitIndent + 1).join("	"); this.traceInitIndent < this.traceInitMaxIdent && console.log(`${n}--> <${e}>`); let { time: i, value: o } = Br(r), s = i > 10 ? console.warn : console.log; return this.traceInitIndent < this.traceInitMaxIdent && s(`${n}<-- <${e}> time: ${i}ms`), this.traceInitIndent--, o } else return r() } }; function lu(t, e) { e.forEach(r => { let n = r.prototype; Object.getOwnPropertyNames(n).forEach(i => { if (i === "constructor") return; let o = Object.getOwnPropertyDescriptor(n, i); o && (o.get || o.set) ? Object.defineProperty(t.prototype, i, o) : t.prototype[i] = r.prototype[i] }) }) } var at = jt(Fe, "", NaN, NaN, NaN, NaN, NaN, NaN); Object.freeze(at); var xe = Object.freeze({ recoveryEnabled: !1, maxLookahead: 3, dynamicTokensEnabled: !1, outputCst: !0, errorMessageProvider: Yn, nodeLocationTracking: "none", traceInitPerf: !1, skipValidations: !1 }), Nr = Object.freeze({ recoveryValueFunc: () => { }, resyncEnabled: !0 }), ie; (function (t) { t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", t[t.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION" })(ie || (ie = {})); var on = class t {
  static performSelfAnalysis(e) { throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.") } performSelfAnalysis() {
    this.TRACE_INIT("performSelfAnalysis", () => {
      let e; this.selfAnalysisDone = !0; let r = this.className; this.TRACE_INIT("toFastProps", () => { Gr(this) }), this.TRACE_INIT("Grammar Recording", () => { try { this.enableRecording(), E(this.definedRulesNames, i => { let s = this[i].originalGrammarAction, a; this.TRACE_INIT(`${i} Rule`, () => { a = this.topLevelRuleRecord(i, s) }), this.gastProductionsCache[i] = a }) } finally { this.disableRecording() } }); let n = []; if (this.TRACE_INIT("Grammar Resolving", () => { n = Hc({ rules: _(this.gastProductionsCache) }), this.definitionErrors = this.definitionErrors.concat(n) }), this.TRACE_INIT("Grammar Validations", () => { if (L(n) && this.skipValidations === !1) { let i = zc({ rules: _(this.gastProductionsCache), tokenTypes: _(this.tokensMap), errMsgProvider: Be, grammarName: r }), o = Bc({ lookaheadStrategy: this.lookaheadStrategy, rules: _(this.gastProductionsCache), tokenTypes: _(this.tokensMap), grammarName: r }); this.definitionErrors = this.definitionErrors.concat(i, o) } }), L(this.definitionErrors) && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => { let i = tc(_(this.gastProductionsCache)); this.resyncFollows = i }), this.TRACE_INIT("ComputeLookaheadFunctions", () => { var i, o; (o = (i = this.lookaheadStrategy).initialize) === null || o === void 0 || o.call(i, { rules: _(this.gastProductionsCache) }), this.preComputeLookaheadFunctions(_(this.gastProductionsCache)) })), !t.DEFER_DEFINITION_ERRORS_HANDLING && !L(this.definitionErrors)) throw e = d(this.definitionErrors, i => i.message), new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)
    })
  } constructor(e, r) {
    this.definitionErrors = [], this.selfAnalysisDone = !1; let n = this; if (n.initErrorHandler(r), n.initLexerAdapter(), n.initLooksAhead(r), n.initRecognizerEngine(e, r), n.initRecoverable(r), n.initTreeBuilder(r), n.initContentAssist(), n.initGastRecorder(r), n.initPerformanceTracer(r), A(r, "ignoredIssues")) throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`); this.skipValidations = A(r, "skipValidations") ? r.skipValidations : xe.skipValidations
  }
}; on.DEFER_DEFINITION_ERRORS_HANDLING = !1; lu(on, [si, ci, pi, mi, gi, di, Ei, Ti, xi, Ni]); var sn = class extends on { constructor(e, r = xe) { let n = W(r); n.outputCst = !0, super(e, n) } }; var ix = S({ name: "WhiteSpace", pattern: /\s+/, group: j.SKIPPED }), ox = S({ name: "LineComment", pattern: /\/\/[^\n\r]*/, group: j.SKIPPED }), sx = S({ name: "BlockComment", pattern: /\/\*[\s\S]*?\*\//, group: j.SKIPPED }), Ri = S({ name: "Table", pattern: /Table\b/i, longer_alt: void 0 }), yi = S({ name: "Project", pattern: /Project\b/i }), Oi = S({ name: "Enum", pattern: /enum\b/i }), an = S({ name: "Ref", pattern: /Ref\b/i }), Ii = S({ name: "TableGroup", pattern: /TableGroup\b/i }), wo = S({ name: "TablePartial", pattern: /TablePartial\b/i }), Rr = S({ name: "Note", pattern: /Note\b/i }), Do = S({ name: "As", pattern: /as\b/i }), Fo = S({ name: "Indexes", pattern: /indexes\b/i }), Bo = S({ name: "Checks", pattern: /checks\b/i }), Li = S({ name: "Records", pattern: /records\b/i }), Ci = S({ name: "PrimaryKey", pattern: /primary\s+key\b/i }), vi = S({ name: "Pk", pattern: /pk\b/i }), _i = S({ name: "NotNull", pattern: /not\s+null\b/i }), yr = S({ name: "Null", pattern: /null\b/i }), bi = S({ name: "Unique", pattern: /unique\b/i }), ki = S({ name: "Increment", pattern: /increment\b/i }), Pi = S({ name: "Default", pattern: /default\b/i }), Mi = S({ name: "Check", pattern: /check\b/i }), Ui = S({ name: "Delete", pattern: /delete\b/i }), wi = S({ name: "Update", pattern: /update\b/i }), Di = S({ name: "Cascade", pattern: /cascade\b/i }), Fi = S({ name: "Restrict", pattern: /restrict\b/i }), Go = S({ name: "SetNull", pattern: /set\s+null\b/i }), jo = S({ name: "SetDefault", pattern: /set\s+default\b/i }), $o = S({ name: "NoAction", pattern: /no\s+action\b/i }), Bi = S({ name: "Type", pattern: /type\b/i }), Gi = S({ name: "Name", pattern: /name\b/i }), Ko = S({ name: "Btree", pattern: /btree\b/i }), ji = S({ name: "Hash", pattern: /hash\b/i }), Wo = S({ name: "DatabaseType", pattern: /database_type\b/i }), Vo = S({ name: "HeaderColor", pattern: /headercolor\b/i }), $i = S({ name: "Color", pattern: /color\b/i }), ln = S({ name: "True", pattern: /true\b/i }), cn = S({ name: "False", pattern: /false\b/i }), Ho = S({ name: "ManyToMany", pattern: /<>/ }), zo = S({ name: "LessThan", pattern: /</ }), qo = S({ name: "GreaterThan", pattern: />/ }), Xo = S({ name: "Dash", pattern: /-/ }), Ie = S({ name: "LCurly", pattern: /\{/ }), Le = S({ name: "RCurly", pattern: /\}/ }), Yo = S({ name: "LSquare", pattern: /\[/ }), Qo = S({ name: "RSquare", pattern: /\]/ }), vt = S({ name: "LParen", pattern: /\(/ }), _t = S({ name: "RParen", pattern: /\)/ }), Ae = S({ name: "Colon", pattern: /:/ }), Qe = S({ name: "Comma", pattern: /,/ }), Or = S({ name: "Dot", pattern: /\./ }), Zo = S({ name: "Tilde", pattern: /~/ }), Jo = S({ name: "TripleQuoteString", pattern: /'''[\s\S]*?'''/ }), Ki = S({ name: "SingleQuoteString", pattern: /'(?:[^'\\]|\\.)*'/ }), lt = S({ name: "DoubleQuoteString", pattern: /"(?:[^"\\]|\\.)*"/ }), Kt = S({ name: "BacktickExpression", pattern: /`[^`]*`/ }), Wi = S({ name: "HexColor", pattern: /#[0-9a-fA-F]{3,6}\b/ }), Ir = S({ name: "NumberLiteral", pattern: /-?\d+(\.\d+)?([eE][+-]?\d+)?/ }), te = S({ name: "Identifier", pattern: /[a-zA-Z_]\w*/ }), es = [ix, sx, ox, Ho, Jo, Ki, lt, Kt, Wi, Ir, Ci, _i, Go, jo, $o, Wo, Vo, Ri, wo, Ii, yi, Oi, an, Rr, Do, Fo, Bo, Li, vi, yr, bi, ki, Pi, Mi, Ui, wi, Di, Fi, Bi, Gi, Ko, ji, $i, ln, cn, Ie, Le, Yo, Qo, vt, _t, Ae, Qe, Or, Zo, zo, qo, Xo, te], ts = new j(es, { ensureOptimizations: !1 }); var rs = class extends sn { constructor() { super(es, { recoveryEnabled: !0, maxLookahead: 4 }); this.schema = this.RULE("schema", () => { this.MANY(() => { this.OR([{ ALT: () => this.SUBRULE(this.projectDef) }, { ALT: () => this.SUBRULE(this.tableDef) }, { ALT: () => this.SUBRULE(this.tablePartialDef) }, { ALT: () => this.SUBRULE(this.enumDef) }, { ALT: () => this.SUBRULE(this.refDef) }, { ALT: () => this.SUBRULE(this.tableGroupDef) }, { ALT: () => this.SUBRULE(this.stickyNoteDef) }, { ALT: () => this.SUBRULE(this.recordsDef) }]) }) }); this.projectDef = this.RULE("projectDef", () => { this.CONSUME(yi), this.CONSUME(te, { LABEL: "projectName" }), this.CONSUME(Ie), this.MANY(() => { this.OR([{ ALT: () => this.SUBRULE(this.projectProperty) }, { ALT: () => this.SUBRULE(this.noteDef) }]) }), this.CONSUME(Le) }); this.projectProperty = this.RULE("projectProperty", () => { this.CONSUME(Wo), this.CONSUME(Ae), this.SUBRULE(this.stringValue) }); this.tableDef = this.RULE("tableDef", () => { this.CONSUME(Ri), this.SUBRULE(this.qualifiedName, { LABEL: "tableName" }), this.OPTION(() => { this.CONSUME(Do), this.CONSUME(te, { LABEL: "alias" }) }), this.OPTION2(() => { this.SUBRULE(this.settingsBlock, { LABEL: "tableSettings" }) }), this.CONSUME(Ie), this.MANY(() => { this.OR([{ ALT: () => this.SUBRULE(this.columnDef) }, { ALT: () => this.SUBRULE(this.indexesDef) }, { ALT: () => this.SUBRULE(this.checksDef) }, { ALT: () => this.SUBRULE(this.recordsInnerDef) }, { ALT: () => this.SUBRULE(this.noteDef) }, { ALT: () => this.SUBRULE(this.partialUsage) }]) }), this.CONSUME(Le) }); this.columnDef = this.RULE("columnDef", () => { this.SUBRULE(this.columnName, { LABEL: "colName" }), this.SUBRULE(this.columnType, { LABEL: "colType" }), this.MANY(() => { this.SUBRULE(this.settingsBlock, { LABEL: "colSettings" }) }) }); this.columnName = this.RULE("columnName", () => { this.OR([{ ALT: () => this.CONSUME(te) }, { ALT: () => this.CONSUME(lt) }, { ALT: () => this.CONSUME(Gi) }, { ALT: () => this.CONSUME(Bi) }, { ALT: () => this.CONSUME(Rr) }, { ALT: () => this.CONSUME(Mi) }, { ALT: () => this.CONSUME(Ui) }, { ALT: () => this.CONSUME(wi) }, { ALT: () => this.CONSUME(Pi) }, { ALT: () => this.CONSUME($i) }, { ALT: () => this.CONSUME(yr) }, { ALT: () => this.CONSUME(bi) }, { ALT: () => this.CONSUME(Di) }, { ALT: () => this.CONSUME(Fi) }, { ALT: () => this.CONSUME(ji) }, { ALT: () => this.CONSUME(ln) }, { ALT: () => this.CONSUME(cn) }, { ALT: () => this.CONSUME(an) }, { ALT: () => this.CONSUME(Oi) }, { ALT: () => this.CONSUME(Ri) }, { ALT: () => this.CONSUME(yi) }, { ALT: () => this.CONSUME(ki) }, { ALT: () => this.CONSUME(_i) }, { ALT: () => this.CONSUME(Ci) }, { ALT: () => this.CONSUME(vi) }, { ALT: () => this.CONSUME(Ii) }]) }); this.columnType = this.RULE("columnType", () => { this.SUBRULE(this.qualifiedName, { LABEL: "typeName" }), this.OPTION(() => { this.CONSUME(vt), this.CONSUME(Ir, { LABEL: "typeParam1" }), this.OPTION2(() => { this.CONSUME(Qe), this.CONSUME2(Ir, { LABEL: "typeParam2" }) }), this.CONSUME(_t) }) }); this.settingsBlock = this.RULE("settingsBlock", () => { this.CONSUME(Yo), this.MANY_SEP({ SEP: Qe, DEF: () => { this.SUBRULE(this.settingItem) } }), this.CONSUME(Qo) }); this.settingItem = this.RULE("settingItem", () => { this.OR([{ ALT: () => this.CONSUME(Ci, { LABEL: "pk" }) }, { ALT: () => this.CONSUME(vi, { LABEL: "pk2" }) }, { ALT: () => this.CONSUME(_i, { LABEL: "notNull" }) }, { ALT: () => this.CONSUME(yr, { LABEL: "null" }) }, { ALT: () => this.CONSUME(bi, { LABEL: "unique" }) }, { ALT: () => this.CONSUME(ki, { LABEL: "increment" }) }, { ALT: () => this.SUBRULE(this.defaultSetting) }, { ALT: () => this.SUBRULE(this.noteSetting) }, { ALT: () => this.SUBRULE(this.refSetting) }, { ALT: () => this.SUBRULE(this.deleteSetting) }, { ALT: () => this.SUBRULE(this.updateSetting) }, { ALT: () => this.SUBRULE(this.nameSetting) }, { ALT: () => this.SUBRULE(this.typeSetting) }, { ALT: () => this.SUBRULE(this.headerColorSetting) }, { ALT: () => this.SUBRULE(this.colorSetting) }, { ALT: () => this.SUBRULE(this.checkSetting) }]) }); this.defaultSetting = this.RULE("defaultSetting", () => { this.CONSUME(Pi), this.CONSUME(Ae), this.SUBRULE(this.settingValue) }); this.noteSetting = this.RULE("noteSetting", () => { this.CONSUME(Rr), this.CONSUME(Ae), this.SUBRULE(this.stringValue) }); this.refSetting = this.RULE("refSetting", () => { this.CONSUME(an), this.CONSUME(Ae), this.SUBRULE(this.relationOp, { LABEL: "relOp" }), this.SUBRULE(this.qualifiedName, { LABEL: "refTarget" }) }); this.deleteSetting = this.RULE("deleteSetting", () => { this.CONSUME(Ui), this.CONSUME(Ae), this.SUBRULE(this.referentialAction) }); this.updateSetting = this.RULE("updateSetting", () => { this.CONSUME(wi), this.CONSUME(Ae), this.SUBRULE(this.referentialAction) }); this.nameSetting = this.RULE("nameSetting", () => { this.CONSUME(Gi), this.CONSUME(Ae), this.SUBRULE(this.stringValue) }); this.typeSetting = this.RULE("typeSetting", () => { this.CONSUME(Bi), this.CONSUME(Ae), this.OR([{ ALT: () => this.CONSUME(Ko) }, { ALT: () => this.CONSUME(ji) }]) }); this.headerColorSetting = this.RULE("headerColorSetting", () => { this.CONSUME(Vo), this.CONSUME(Ae), this.CONSUME(Wi) }); this.colorSetting = this.RULE("colorSetting", () => { this.CONSUME($i), this.CONSUME(Ae), this.CONSUME(Wi) }); this.checkSetting = this.RULE("checkSetting", () => { this.CONSUME(Mi), this.CONSUME(Ae), this.CONSUME(Kt) }); this.referentialAction = this.RULE("referentialAction", () => { this.OR([{ ALT: () => this.CONSUME(Di) }, { ALT: () => this.CONSUME(Fi) }, { ALT: () => this.CONSUME(Go) }, { ALT: () => this.CONSUME(jo) }, { ALT: () => this.CONSUME($o) }]) }); this.settingValue = this.RULE("settingValue", () => { this.OR([{ ALT: () => this.CONSUME(Ir) }, { ALT: () => this.CONSUME(te) }, { ALT: () => this.CONSUME(ln) }, { ALT: () => this.CONSUME(cn) }, { ALT: () => this.CONSUME(yr) }, { ALT: () => this.CONSUME(Kt) }, { ALT: () => this.SUBRULE(this.stringValue) }]) }); this.indexesDef = this.RULE("indexesDef", () => { this.CONSUME(Fo), this.CONSUME(Ie), this.MANY(() => { this.SUBRULE(this.indexEntry) }), this.CONSUME(Le) }); this.indexEntry = this.RULE("indexEntry", () => { this.OR([{ ALT: () => { this.CONSUME(vt), this.AT_LEAST_ONE_SEP({ SEP: Qe, DEF: () => this.SUBRULE(this.indexColumnItem) }), this.CONSUME(_t) } }, { ALT: () => this.SUBRULE2(this.indexColumnItem, { LABEL: "singleCol" }) }]), this.OPTION(() => { this.SUBRULE(this.settingsBlock, { LABEL: "indexSettings" }) }) }); this.indexColumnItem = this.RULE("indexColumnItem", () => { this.OR([{ ALT: () => this.CONSUME(Kt, { LABEL: "expr" }) }, { ALT: () => this.SUBRULE(this.columnName, { LABEL: "colName" }) }]) }); this.checksDef = this.RULE("checksDef", () => { this.CONSUME(Bo), this.CONSUME(Ie), this.MANY(() => { this.CONSUME(Kt, { LABEL: "checkExpr" }), this.OPTION(() => { this.SUBRULE(this.settingsBlock, { LABEL: "checkSettings" }) }) }), this.CONSUME(Le) }); this.noteDef = this.RULE("noteDef", () => { this.CONSUME(Rr), this.OR([{ ALT: () => { this.CONSUME(Ae), this.SUBRULE(this.stringValue) } }, { ALT: () => { this.CONSUME(Ie), this.MANY(() => { this.SUBRULE2(this.stringValue) }), this.CONSUME(Le) } }]) }); this.partialUsage = this.RULE("partialUsage", () => { this.CONSUME(Zo), this.CONSUME(te, { LABEL: "partialName" }) }); this.tablePartialDef = this.RULE("tablePartialDef", () => { this.CONSUME(wo), this.CONSUME(te, { LABEL: "partialName" }), this.OPTION(() => { this.SUBRULE(this.settingsBlock, { LABEL: "partialSettings" }) }), this.CONSUME(Ie), this.MANY(() => { this.OR([{ ALT: () => this.SUBRULE(this.columnDef) }, { ALT: () => this.SUBRULE(this.indexesDef) }]) }), this.CONSUME(Le) }); this.enumDef = this.RULE("enumDef", () => { this.CONSUME(Oi), this.SUBRULE(this.qualifiedName, { LABEL: "enumName" }), this.CONSUME(Ie), this.MANY(() => { this.SUBRULE(this.enumValue) }), this.CONSUME(Le) }); this.enumValue = this.RULE("enumValue", () => { this.OR([{ ALT: () => this.CONSUME(te, { LABEL: "valueName" }) }, { ALT: () => this.CONSUME(lt, { LABEL: "quotedValue" }) }]), this.OPTION(() => { this.SUBRULE(this.settingsBlock, { LABEL: "enumValueSettings" }) }) }); this.refDef = this.RULE("refDef", () => { this.CONSUME(an), this.OPTION(() => { this.CONSUME(te, { LABEL: "refName" }) }), this.OR([{ ALT: () => { this.CONSUME(Ae), this.SUBRULE(this.refBody) } }, { ALT: () => { this.CONSUME(Ie), this.SUBRULE2(this.refBody), this.CONSUME(Le) } }]) }); this.refBody = this.RULE("refBody", () => { this.SUBRULE(this.refEndpoint, { LABEL: "fromEndpoint" }), this.SUBRULE(this.relationOp, { LABEL: "relOp" }), this.SUBRULE2(this.refEndpoint, { LABEL: "toEndpoint" }), this.OPTION(() => { this.SUBRULE(this.settingsBlock, { LABEL: "refSettings" }) }) }); this.refEndpoint = this.RULE("refEndpoint", () => { this.SUBRULE(this.refPart, { LABEL: "part1" }), this.CONSUME(Or), this.OR([{ ALT: () => { this.CONSUME(vt), this.AT_LEAST_ONE_SEP({ SEP: Qe, DEF: () => this.SUBRULE2(this.refPart, { LABEL: "compositeCol" }) }), this.CONSUME(_t) } }, { ALT: () => { this.SUBRULE3(this.refPart, { LABEL: "part2" }), this.OPTION(() => { this.CONSUME2(Or), this.OR2([{ ALT: () => { this.CONSUME2(vt), this.AT_LEAST_ONE_SEP2({ SEP: Qe, DEF: () => this.SUBRULE4(this.refPart, { LABEL: "compositeCol2" }) }), this.CONSUME2(_t) } }, { ALT: () => this.SUBRULE5(this.refPart, { LABEL: "part3" }) }]) }) } }]) }); this.refPart = this.RULE("refPart", () => { this.OR([{ ALT: () => this.CONSUME(te) }, { ALT: () => this.CONSUME(lt) }]) }); this.relationOp = this.RULE("relationOp", () => { this.OR([{ ALT: () => this.CONSUME(Ho) }, { ALT: () => this.CONSUME(zo) }, { ALT: () => this.CONSUME(qo) }, { ALT: () => this.CONSUME(Xo) }]) }); this.tableGroupDef = this.RULE("tableGroupDef", () => { this.CONSUME(Ii), this.OR([{ ALT: () => this.CONSUME(lt, { LABEL: "quotedGroupName" }) }, { ALT: () => this.CONSUME(te, { LABEL: "groupName" }) }]), this.OPTION(() => { this.SUBRULE(this.settingsBlock, { LABEL: "groupSettings" }) }), this.CONSUME(Ie), this.MANY(() => { this.OR2([{ ALT: () => this.SUBRULE(this.noteDef) }, { ALT: () => this.SUBRULE(this.qualifiedName, { LABEL: "groupTable" }) }]) }), this.CONSUME(Le) }); this.stickyNoteDef = this.RULE("stickyNoteDef", () => { this.CONSUME(Rr), this.CONSUME(te, { LABEL: "noteName" }), this.CONSUME(Ie), this.SUBRULE(this.stringValue), this.CONSUME(Le) }); this.recordsDef = this.RULE("recordsDef", () => { this.CONSUME(Li), this.CONSUME(te, { LABEL: "tableName" }), this.OPTION(() => { this.CONSUME(vt), this.AT_LEAST_ONE_SEP({ SEP: Qe, DEF: () => this.CONSUME2(te, { LABEL: "columnList" }) }), this.CONSUME(_t) }), this.CONSUME(Ie), this.MANY(() => { this.SUBRULE(this.recordValue) }), this.CONSUME(Le) }); this.recordsInnerDef = this.RULE("recordsInnerDef", () => { this.CONSUME(Li), this.OPTION(() => { this.CONSUME(vt), this.AT_LEAST_ONE_SEP({ SEP: Qe, DEF: () => this.CONSUME(te, { LABEL: "columnList" }) }), this.CONSUME(_t) }), this.CONSUME(Ie), this.MANY(() => { this.SUBRULE(this.recordValue) }), this.CONSUME(Le) }); this.recordValue = this.RULE("recordValue", () => { this.OR([{ ALT: () => this.CONSUME(Ir) }, { ALT: () => this.CONSUME(Ki) }, { ALT: () => this.CONSUME(ln) }, { ALT: () => this.CONSUME(cn) }, { ALT: () => this.CONSUME(yr) }, { ALT: () => this.CONSUME(Kt) }, { ALT: () => { this.CONSUME(te), this.OPTION(() => { this.CONSUME(Or), this.CONSUME2(te) }) } }, { ALT: () => this.CONSUME(Qe) }]) }); this.qualifiedName = this.RULE("qualifiedName", () => { this.OR([{ ALT: () => this.CONSUME(te, { LABEL: "firstName" }) }, { ALT: () => this.CONSUME(lt, { LABEL: "quotedFirstName" }) }]), this.OPTION(() => { this.CONSUME(Or), this.OR2([{ ALT: () => this.CONSUME2(te, { LABEL: "secondName" }) }, { ALT: () => this.CONSUME2(lt, { LABEL: "quotedSecondName" }) }]) }) }); this.stringValue = this.RULE("stringValue", () => { this.OR([{ ALT: () => this.CONSUME(Jo) }, { ALT: () => this.CONSUME(Ki) }, { ALT: () => this.CONSUME(lt) }]) }); this.performSelfAnalysis() } }, Ze = new rs; var ax = Ze.getBaseCstVisitorConstructor(), ns = class extends ax { constructor() { super(), this.validateVisitor() } schema(e) { let r = { tables: [], enums: [], refs: [], tableGroups: [], tablePartials: [], stickyNotes: [] }; return e.projectDef && (r.project = this.visit(e.projectDef[0])), e.tableDef && (r.tables = e.tableDef.map(n => this.visit(n))), e.enumDef && (r.enums = e.enumDef.map(n => this.visit(n))), e.refDef && (r.refs = e.refDef.map(n => this.visit(n))), e.tableGroupDef && (r.tableGroups = e.tableGroupDef.map(n => this.visit(n))), e.tablePartialDef && (r.tablePartials = e.tablePartialDef.map(n => this.visit(n))), e.stickyNoteDef && (r.stickyNotes = e.stickyNoteDef.map(n => this.visit(n))), r } projectDef(e) { let r = { name: e.projectName[0].image }; if (e.projectProperty) { let n = this.visit(e.projectProperty[0]); r.databaseType = n } return e.noteDef && (r.note = this.visit(e.noteDef[0])), r } projectProperty(e) { return this.extractString(e.stringValue ? this.visit(e.stringValue[0]) : "") } tableDef(e) { let r = this.visit(e.tableName[0]), n = { name: r.name, schema: r.schema, columns: [], indexes: [], settings: {} }; if (e.alias && (n.alias = e.alias[0].image), e.tableSettings && e.tableSettings.forEach(i => { let o = this.extractTableSettings(i); Object.assign(n.settings, o) }), e.columnDef && (n.columns = e.columnDef.map(i => this.visit(i))), e.indexesDef) { let i = this.visit(e.indexesDef[0]); Array.isArray(i) && (n.indexes = i) } return e.noteDef && (n.note = this.visit(e.noteDef[0])), n } columnDef(e) { let r = this.visit(e.colName[0]), n = this.visit(e.colType[0]), i = { primaryKey: !1, notNull: !1, unique: !1, increment: !1 }; return e.colSettings && e.colSettings.forEach(o => { let s = this.extractColumnSettings(o); Object.assign(i, s) }), { name: r, type: n, settings: i } } columnName(e) { if (e.Identifier) return e.Identifier[0].image; if (e.DoubleQuoteString) return e.DoubleQuoteString[0].image.slice(1, -1); let r = ["Name", "Type", "Note", "Check", "Delete", "Update", "Default", "Color", "Null", "Unique", "Cascade", "Restrict", "Hash", "True", "False"]; for (let n of r) if (e[n]) return e[n][0].image; return "" } columnType(e) { let r = this.visit(e.typeName[0]), n = r.schema ? `"${r.schema}"."${r.name}"` : r.name; return r.schema || (n = r.name), e.typeParam1 && (n += `(${e.typeParam1[0].image}`, e.typeParam2 && (n += `,${e.typeParam2[0].image}`), n += ")"), n } settingsBlock(e) { if (!e.settingItem) return {}; let r = {}; for (let n of e.settingItem) { let i = this.visit(n); Object.assign(r, i) } return r } settingItem(e) { return e.pk || e.pk2 ? { primaryKey: !0, pk: !0 } : e.notNull ? { notNull: !0 } : e.null ? { null: !0 } : e.unique ? { unique: !0 } : e.increment ? { increment: !0 } : e.defaultSetting ? this.visit(e.defaultSetting[0]) : e.noteSetting ? this.visit(e.noteSetting[0]) : e.refSetting ? this.visit(e.refSetting[0]) : e.deleteSetting ? this.visit(e.deleteSetting[0]) : e.updateSetting ? this.visit(e.updateSetting[0]) : e.nameSetting ? this.visit(e.nameSetting[0]) : e.typeSetting ? this.visit(e.typeSetting[0]) : e.headerColorSetting ? this.visit(e.headerColorSetting[0]) : e.colorSetting ? this.visit(e.colorSetting[0]) : e.checkSetting ? this.visit(e.checkSetting[0]) : {} } defaultSetting(e) { return { default: this.visit(e.settingValue[0]) } } noteSetting(e) { return { note: this.extractString(this.visit(e.stringValue[0])) } } refSetting(e) { let r = this.visit(e.relOp[0]), n = this.visit(e.refTarget[0]); return { ref: { type: r, table: n.schema || n.name, column: n.schema ? n.name : "", schema: void 0 } } } deleteSetting(e) { return { delete: this.visit(e.referentialAction[0]) } } updateSetting(e) { return { update: this.visit(e.referentialAction[0]) } } nameSetting(e) { return { name: this.extractString(this.visit(e.stringValue[0])) } } typeSetting(e) { return e.Btree ? { type: "btree" } : e.Hash ? { type: "hash" } : {} } headerColorSetting(e) { return { headerColor: e.HexColor[0].image } } colorSetting(e) { return { color: e.HexColor[0].image } } checkSetting(e) { return { check: e.BacktickExpression[0].image.slice(1, -1) } } referentialAction(e) { return e.Cascade ? "cascade" : e.Restrict ? "restrict" : e.SetNull ? "set null" : e.SetDefault ? "set default" : (e.NoAction, "no action") } settingValue(e) { return e.NumberLiteral ? e.NumberLiteral[0].image : e.Identifier ? e.Identifier[0].image : e.True ? "true" : e.False ? "false" : e.Null ? "null" : e.BacktickExpression ? e.BacktickExpression[0].image : e.stringValue ? this.visit(e.stringValue[0]) : "" } indexesDef(e) { return e.indexEntry ? e.indexEntry.map(r => this.visit(r)) : [] } indexEntry(e) { let r = [], n = { unique: !1, pk: !1 }; if (e.indexColumnItem) for (let i of e.indexColumnItem) r.push(this.visit(i)); if (e.singleCol && r.push(this.visit(e.singleCol[0])), e.indexSettings) { let i = this.visit(e.indexSettings[0]); Object.assign(n, i) } return { columns: r, settings: n } } indexColumnItem(e) { return e.expr ? { value: e.expr[0].image.slice(1, -1), isExpression: !0 } : e.colName ? { value: this.visit(e.colName[0]), isExpression: !1 } : { value: "", isExpression: !1 } } checksDef(e) { return null } noteDef(e) { return e.stringValue ? e.stringValue.map(r => this.extractString(this.visit(r))).join(" ") : "" } partialUsage(e) { return { partialName: e.partialName[0].image } } tablePartialDef(e) { let r = { name: e.partialName[0].image, columns: [], indexes: [], settings: {} }; if (e.partialSettings && (r.settings = this.extractTableSettings(e.partialSettings[0])), e.columnDef && (r.columns = e.columnDef.map(n => this.visit(n))), e.indexesDef) { let n = this.visit(e.indexesDef[0]); Array.isArray(n) && (r.indexes = n) } return r } enumDef(e) { let r = this.visit(e.enumName[0]), n = { name: r.name, schema: r.schema, values: [] }; return e.enumValue && (n.values = e.enumValue.map(i => this.visit(i))), n } enumValue(e) { let r = { name: "" }; if (e.valueName ? r.name = e.valueName[0].image : e.quotedValue && (r.name = e.quotedValue[0].image.slice(1, -1)), e.enumValueSettings) { let n = this.visit(e.enumValueSettings[0]); n.note && (r.note = n.note) } return r } refDef(e) { let r = e.refBody[0], n = this.visit(r), i = { from: n.from, to: n.to, type: n.type, settings: n.settings || {} }; return e.refName && (i.name = e.refName[0].image), i } refBody(e) { let r = this.visit(e.fromEndpoint[0]), n = this.visit(e.toEndpoint[0]), i = this.visit(e.relOp[0]), o = {}; return e.refSettings && (o = this.visit(e.refSettings[0])), { from: r, to: n, type: i, settings: o } } refEndpoint(e) { let r = []; e.part1 && r.push(this.visit(e.part1[0])), e.part2 && r.push(this.visit(e.part2[0])), e.part3 && r.push(this.visit(e.part3[0])); let n = []; if (e.compositeCol) for (let i of e.compositeCol) n.push(this.visit(i)); if (e.compositeCol2) for (let i of e.compositeCol2) n.push(this.visit(i)); return n.length > 0 ? r.length === 1 ? { table: r[0], columns: n } : { schema: r[0], table: r[1] || r[0], columns: n } : r.length === 3 ? { schema: r[0], table: r[1], columns: [r[2]] } : r.length === 2 ? { table: r[0], columns: [r[1]] } : { table: r[0] || "", columns: [] } } refPart(e) { return e.Identifier ? e.Identifier[0].image : e.DoubleQuoteString ? e.DoubleQuoteString[0].image.slice(1, -1) : "" } relationOp(e) { return e.ManyToMany ? "<>" : e.LessThan ? "<" : e.GreaterThan ? ">" : (e.Dash, "-") } tableGroupDef(e) { let r = ""; e.quotedGroupName ? r = e.quotedGroupName[0].image.slice(1, -1) : e.groupName && (r = e.groupName[0].image); let n = { name: r, tables: [] }; if (e.groupSettings) { let i = this.visit(e.groupSettings[0]); i.color && (n.color = i.color), i.note && (n.note = i.note) } return e.groupTable && (n.tables = e.groupTable.map(i => { let o = this.visit(i); return o.schema ? `${o.schema}.${o.name}` : o.name })), e.noteDef && (n.note = this.visit(e.noteDef[0])), n } stickyNoteDef(e) { return { name: e.noteName[0].image, content: this.extractString(this.visit(e.stringValue[0])) } } recordsDef(e) { return null } recordsInnerDef(e) { return null } recordValue(e) { return null } qualifiedName(e) { let r = ""; if (e.firstName ? r = e.firstName[0].image : e.quotedFirstName && (r = e.quotedFirstName[0].image.slice(1, -1)), e.secondName || e.quotedSecondName) { let n = ""; return e.secondName ? n = e.secondName[0].image : e.quotedSecondName && (n = e.quotedSecondName[0].image.slice(1, -1)), { schema: r, name: n } } return { name: r } } stringValue(e) { return e.TripleQuoteString ? e.TripleQuoteString[0].image : e.SingleQuoteString ? e.SingleQuoteString[0].image : e.DoubleQuoteString ? e.DoubleQuoteString[0].image : "" } extractString(e) { return e ? e.startsWith("'''") && e.endsWith("'''") ? e.slice(3, -3).trim() : e.startsWith("'") && e.endsWith("'") || e.startsWith('"') && e.endsWith('"') ? e.slice(1, -1) : e : "" } extractTableSettings(e) { let r = this.visit(e), n = {}; return r.headerColor && (n.headerColor = r.headerColor), n } extractColumnSettings(e) { let r = this.visit(e), n = {}; return r.primaryKey && (n.primaryKey = !0), r.notNull && (n.notNull = !0), r.unique && (n.unique = !0), r.increment && (n.increment = !0), r.default !== void 0 && (n.default = r.default), r.note && (n.note = r.note), r.ref && (n.ref = r.ref), n } }, cu = new ns; function uu(t) { let e = [], r = ts.tokenize(t); r.errors.length > 0 && r.errors.forEach(i => { e.push({ line: i.line || 1, column: i.column || 1, message: i.message, severity: "error", length: 1 }) }), Ze.input = r.tokens; let n = Ze.schema(); Ze.errors.length > 0 && Ze.errors.forEach(i => { let o = i.token; e.push({ line: o.startLine || 1, column: o.startColumn || 1, message: i.message, severity: "error", length: o.image?.length || 1 }) }); try { let i = cu.visit(n); if (i) { let o = new Set; i.tables.forEach(s => { let a = s.schema ? `${s.schema}.${s.name}` : s.name; o.add(a) }), i.refs.forEach(s => { let a = s.from.schema ? `${s.from.schema}.${s.from.table}` : s.from.table, l = s.to.schema ? `${s.to.schema}.${s.to.table}` : s.to.table; o.has(a) }) } } catch { } return { errors: e } } function fu(t) { let e = ts.tokenize(t); e.errors.length > 0 && console.warn("DBML Lexer errors:", e.errors), Ze.input = e.tokens; let r = Ze.schema(); Ze.errors.length > 0 && console.warn("DBML Parser errors:", Ze.errors); try { return cu.visit(r) } catch (n) { return console.error("DBML AST Visitor error:", n), { tables: [], enums: [], refs: [], tableGroups: [], tablePartials: [], stickyNotes: [] } } } var Vi = class t {
  constructor(e) { this._context = e } static { this._panels = new Map } openForFile(e) { let r = e.fsPath, n = Lr.basename(r), i = t._panels.get(r); if (i) { i.reveal(oe.ViewColumn.Beside), this._sendContent(i, r); return } let o = oe.window.createWebviewPanel("noiseDbml.diagramTab", `${n} \u2014 ER Diagram`, oe.ViewColumn.Beside, { enableScripts: !0, retainContextWhenHidden: !0, localResourceRoots: [oe.Uri.joinPath(this._context.extensionUri, "dist", "webview")] }); t._panels.set(r, o), o.webview.html = this._getHtml(o.webview), o.webview.onDidReceiveMessage(async a => { if (a.type === "ready" && this._sendContent(o, r), a.type === "saveImage" && a.dataUrl && await this._saveImage(a.dataUrl), a.type === "updatePositions") { let l = `positions-${r.replace(/\\/g, "/")}`; await this._context.workspaceState.update(l, a.positions) } if (a.type === "updateStickyNotes") { let l = `stickyNotes-${r.replace(/\\/g, "/")}`; await this._context.workspaceState.update(l, a.stickyNotes) } a.type === "error" && oe.window.showErrorMessage(`DBML Diagram Error: ${a.text}`) }), o.onDidDispose(() => { t._panels.delete(r) }); let s = oe.workspace.createFileSystemWatcher(new oe.RelativePattern(oe.Uri.file(Lr.dirname(r)), Lr.basename(r))); s.onDidChange(() => this._sendContent(o, r)), o.onDidDispose(() => s.dispose()) } _sendContent(e, r) { try { let n = Hi.readFileSync(r, "utf8"), i = fu(n); if (i) { let o = `positions-${r.replace(/\\/g, "/")}`, s = `stickyNotes-${r.replace(/\\/g, "/")}`, a = this._context.workspaceState.get(o), l = this._context.workspaceState.get(s); e.webview.postMessage({ type: "update", schema: i, positions: a, stickyNotes: l }) } } catch (n) { console.error(`[NoiseDBML] Failed to read ${r}:`, n) } } _getHtml(e) {
    let r = e.asWebviewUri(oe.Uri.joinPath(this._context.extensionUri, "dist", "webview", "index.js")), n = e.asWebviewUri(oe.Uri.joinPath(this._context.extensionUri, "dist", "webview", "index.css")), i = lx(); return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' 'unsafe-eval'; font-src ${webview.cspSource}; img-src data: blob: ${webview.cspSource}; connect-src ${webview.cspSource} data: blob:;"
  />
  <link rel="stylesheet" href="${styleUri}" />
  <title>DBML Diagram</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}">
    window.addEventListener('error', (event) => {
      const vscode = acquireVsCodeApi();
      vscode.postMessage({
        type: 'error',
        text: 'Runtime error: ' + event.message + ' at ' + event.filename + ':' + event.lineno
      });
    });
    window.addEventListener('unhandledrejection', (event) => {
      const vscode = acquireVsCodeApi();
      vscode.postMessage({
        type: 'error',
        text: 'Unhandled promise rejection: ' + event.reason
      });
    });
  </script>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`
    );
  }
  async _saveImage(dataUrl) {
  const saveUri = await vscode.window.showSaveDialog({
    filters: {
      Images: ["png"]
    },
    defaultUri: vscode.Uri.file(`diagram-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.png`)
  });
  if (saveUri) {
    try {
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      fs.writeFileSync(saveUri.fsPath, buffer);
      vscode.window.showInformationMessage(`Diagram saved to ${path.basename(saveUri.fsPath)}`);
    } catch (err) {
      vscode.window.showErrorMessage(`Failed to save diagram: ${err}`);
    }
  }
}
};
function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// src/providers/LinterProvider.ts
var vscode2 = __toESM(require("vscode"));
var LinterProvider = class {
  constructor(context) {
    this.diagnosticCollection = vscode2.languages.createDiagnosticCollection("noise-dbml");
    context.subscriptions.push(this.diagnosticCollection);
    vscode2.workspace.textDocuments.forEach((doc) => this.lint(doc));
    context.subscriptions.push(
      vscode2.workspace.onDidChangeTextDocument((e) => this.lint(e.document)),
      vscode2.workspace.onDidOpenTextDocument((doc) => this.lint(doc)),
      vscode2.workspace.onDidSaveTextDocument((doc) => this.lint(doc)),
      vscode2.workspace.onDidCloseTextDocument((doc) => {
        this.diagnosticCollection.delete(doc.uri);
      })
    );
  }
  lint(document) {
    if (document.languageId !== "dbml" && !document.fileName.endsWith(".dbml")) {
      return;
    }
    const text = document.getText();
    const { errors } = lintDbml(text);
    const diagnostics = [];
    errors.forEach((err) => {
      const severity = err.severity === "error" ? vscode2.DiagnosticSeverity.Error : vscode2.DiagnosticSeverity.Warning;
      const startLine = err.line - 1;
      const startCol = err.column - 1;
      const length = err.length || 1;
      let range;
      if (err.line === 1 && err.column === 1) {
        range = new vscode2.Range(startLine, startCol, startLine, startCol + length);
      } else {
        range = new vscode2.Range(startLine, startCol, startLine, startCol + length);
      }
      diagnostics.push(new vscode2.Diagnostic(range, err.message, severity));
    });
    this.diagnosticCollection.set(document.uri, diagnostics);
  }
};

// src/extension.ts
function activate(context) {
  console.log("Noise DBML extension activated");
  new LinterProvider(context);
  const diagramTabProvider = new DiagramTabProvider(context);
  context.subscriptions.push(
    vscode3.commands.registerCommand(
      "noiseDbml.seeDiagram",
      (arg) => {
        let uri;
        if (arg instanceof vscode3.Uri) {
          uri = arg;
        } else {
          uri = vscode3.window.activeTextEditor?.document.uri;
        }
        if (uri && uri.fsPath.endsWith(".dbml")) {
          diagramTabProvider.openForFile(uri);
        }
      }
    )
  );
  context.subscriptions.push(
    vscode3.commands.registerCommand(
      "noiseDbml.chooseAlgorithm",
      () => {
        vscode3.window.showInformationMessage("Choose Auto Arrange Algorithm feature is coming soon!");
      }
    )
  );
}
function deactivate() {
  console.log("Noise DBML extension deactivated");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=extension.js.map
