var InBack = function (x: number) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
};

var OutBounce = function (x: number) {
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

var InBounce = function (x: number) {
  return 1 - OutBounce(1 - x);
};

var InCirc = function (x: number) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
};

var InCubic = function (x: number) {
  return x * x * x;
};

var InElastic = function (x: number) {
  var c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};

var InExpo = function (x: number) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};

var InOutBack = function (x: number) {
  var c1 = 1.70158;
  var c2 = c1 * 1.525;
  return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};

var InOutBounce = function (x: number) {
  return x < 0.5 ? (1 - OutBounce(1 - 2 * x)) / 2 : (1 + OutBounce(2 * x - 1)) / 2;
};

var InOutCirc = function (x: number) {
  return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};

var InOutCubic = function (x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

var InOutElastic = function (x: number) {
  var c5 = (2 * Math.PI) / 4.5;
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};

var InOutExpo = function (x: number) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
};

var InOutQuad = function (x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

var InOutQuart = function (x: number) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

var InOutQuint = function (x: number) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};

var InOutSine = function (x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

var InQuad = function (x: number) {
  return x * x;
};

var InQuart = function (x: number) {
  return x * x * x * x;
};

var InQuint = function (x: number) {
  return x * x * x * x * x;
};

var InSine = function (x: number) {
  return 1 - Math.cos((x * Math.PI) / 2);
};

var OutBack = function (x: number) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

var OutCirc = function (x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
};

var OutCubic = function (x: number) {
  return 1 - Math.pow(1 - x, 3);
};

var OutElastic = function (x: number) {
  var c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

var OutExpo = function (x: number) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

var OutQuad = function (x: number) {
  return 1 - (1 - x) * (1 - x);
};

var OutQuart = function (x: number) {
  return 1 - Math.pow(1 - x, 4);
};

var OutQuint = function (x: number) {
  return 1 - Math.pow(1 - x, 5);
};

var OutSine = function (x: number) {
  return Math.sin((x * Math.PI) / 2);
};

var Linear = function (x: number) {
  return x;
};

var Horizontal = function (x: number) {
  return 0;
};
var Vertical = function (x: number) {
  return 1;
};
var Toggle = function (x: number) {
  return x < 0.5 ? 0 : 1;
};

export const AllEasing = { Linear, InBack, InBounce, InCirc, InCubic, InElastic, InExpo, InOutBack, InOutBounce, InOutCirc, InOutCubic, InOutElastic, InOutExpo, InOutQuad, InOutQuart, InOutQuint, InOutSine, InQuad, InQuart, InQuint, InSine, OutBack, OutBounce, OutCirc, OutCubic, OutElastic, OutExpo, OutQuad, OutQuart, OutQuint, OutSine, Horizontal, Vertical, Toggle };
export type EasingFunctionType = keyof typeof AllEasing;
export const Easing: { [key: string]: EasingFunctionType } = Object.fromEntries(Object.keys(AllEasing).map((name) => [name as string, name as EasingFunctionType]));
export const evaluate = (fn: EasingFunctionType, value: number) => {
  return AllEasing[fn](value);
};
