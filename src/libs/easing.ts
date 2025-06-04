const ToOutIn = (inFn: (x: number) => number, outFn: (x: number) => number) => {
  return (x: number) => {
    return x < 0.5 ? outFn(x * 2) * 0.5 : 0.5 + inFn((x - 0.5) * 2) * 0.5;
  };
};

// Back
var BackIn = function (x: number) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
};
var BackInOut = function (x: number) {
  var c1 = 1.70158;
  var c2 = c1 * 1.525;
  return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};
var BackOut = function (x: number) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const BackOutIn = ToOutIn(BackIn, BackOut);

// Bounce
var BounceOut = function (x: number) {
  var n1 = 7.5625;
  var d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
var BounceIn = function (x: number) {
  return 1 - BounceOut(1 - x);
};
var BounceInOut = function (x: number) {
  return x < 0.5 ? (1 - BounceOut(1 - 2 * x)) / 2 : (1 + BounceOut(2 * x - 1)) / 2;
};
var BounceOutIn = ToOutIn(BounceIn, BounceOut);

// Circ
var CircIn = function (x: number) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
};
var CircInOut = function (x: number) {
  return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};
var CircOut = function (x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
};
var CircOutIn = ToOutIn(CircIn, CircOut);

var ElasticIn = function (x: number) {
  var c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};
var ElasticInOut = function (x: number) {
  var c5 = (2 * Math.PI) / 4.5;
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};
var ElasticOut = function (x: number) {
  var c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};
var ElasticOutIn = ToOutIn(ElasticIn, ElasticOut);

var ExpoIn = function (x: number) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};
var ExpoOut = function (x: number) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};
var ExpoInOut = function (x: number) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
};
var ExpoOutIn = ToOutIn(ExpoIn, ExpoOut);

var CubicIn = function (x: number) {
  return x * x * x;
};
var CubicInOut = function (x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
var CubicOut = function (x: number) {
  return 1 - Math.pow(1 - x, 3);
};
var CubicOutIn = ToOutIn(CubicIn, CubicOut);

var QuadIn = function (x: number) {
  return x * x;
};
var QuadOut = function (x: number) {
  return 1 - (1 - x) * (1 - x);
};
var QuadInOut = function (x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};
var QuadOutIn = ToOutIn(QuadIn, QuadOut);

var QuartIn = function (x: number) {
  return x * x * x * x;
};
var QuartOut = function (x: number) {
  return 1 - Math.pow(1 - x, 4);
};
var QuartInOut = function (x: number) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};
var QuartOutIn = ToOutIn(QuartIn, QuartOut);

var QuintIn = function (x: number) {
  return x * x * x * x * x;
};
var QuintInOut = function (x: number) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};
var QuintOut = function (x: number) {
  return 1 - Math.pow(1 - x, 5);
};
var QuintOutIn = ToOutIn(QuintIn, QuintOut);

var SineInOut = function (x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};
var SineIn = function (x: number) {
  return 1 - Math.cos((x * Math.PI) / 2);
};
var SineOut = function (x: number) {
  return Math.sin((x * Math.PI) / 2);
};
var SineOutIn = ToOutIn(SineIn, SineOut);

var Linear = function (x: number) {
  return x;
};
var SnapPrevious = function (x: number) {
  return 0;
};
var SnapNext = function (x: number) {
  return 1;
};
var Toggle = function (x: number) {
  return x < 0.5 ? 0 : 1;
};

export const AllEasing = {
  BackIn,
  BackOut,
  BackInOut,
  BackOutIn,
  BounceIn,
  BounceOut,
  BounceInOut,
  BounceOutIn,
  CircIn,
  CircOut,
  CircInOut,
  CircOutIn,
  CubicIn,
  CubicOut,
  CubicInOut,
  CubicOutIn,
  ElasticIn,
  ElasticOut,
  ElasticInOut,
  ElasticOutIn,
  ExpoIn,
  ExpoOut,
  ExpoInOut,
  ExpoOutIn,
  QuadIn,
  QuadOut,
  QuadInOut,
  QuadOutIn,
  QuartIn,
  QuartOut,
  QuartInOut,
  QuartOutIn,
  QuintIn,
  QuintOut,
  QuintInOut,
  QuintOutIn,
  SineIn,
  SineOut,
  SineInOut,
  SineOutIn,
  SnapNext,
  SnapPrevious,
  Toggle,
  Linear,
};
export type EasingFunctionType = keyof typeof AllEasing;
export const Easing: { [key: string]: EasingFunctionType } = Object.fromEntries(Object.keys(AllEasing).map((name) => [name as string, name as EasingFunctionType]));
export const evaluate = (fn: EasingFunctionType, value: number) => {
  if (AllEasing[fn] === undefined) {
    console.warn(`Function ${fn} is not a valid easing function`);
    return value;
  }
  return AllEasing[fn](value);
};
