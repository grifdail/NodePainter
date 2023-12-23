var easeInBack = function (x: number) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
};

var easeOutBounce = function (x: number) {
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

var easeInBounce = function (x: number) {
  return 1 - easeOutBounce(1 - x);
};

var easeInCirc = function (x: number) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
};

var easeInCubic = function (x: number) {
  return x * x * x;
};

var easeInElastic = function (x: number) {
  var c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
};

var easeInExpo = function (x: number) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};

var easeInOutBack = function (x: number) {
  var c1 = 1.70158;
  var c2 = c1 * 1.525;
  return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
};

var easeInOutBounce = function (x: number) {
  return x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2;
};

var easeInOutCirc = function (x: number) {
  return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
};

var easeInOutCubic = function (x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

var easeInOutElastic = function (x: number) {
  var c5 = (2 * Math.PI) / 4.5;
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
};

var easeInOutExpo = function (x: number) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
};

var easeInOutQuad = function (x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

var easeInOutQuart = function (x: number) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

var easeInOutQuint = function (x: number) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
};

var easeInOutSine = function (x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

var easeInQuad = function (x: number) {
  return x * x;
};

var easeInQuart = function (x: number) {
  return x * x * x * x;
};

var easeInQuint = function (x: number) {
  return x * x * x * x * x;
};

var easeInSine = function (x: number) {
  return 1 - Math.cos((x * Math.PI) / 2);
};

var easeOutBack = function (x: number) {
  var c1 = 1.70158;
  var c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

var easeOutCirc = function (x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
};

var easeOutCubic = function (x: number) {
  return 1 - Math.pow(1 - x, 3);
};

var easeOutElastic = function (x: number) {
  var c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

var easeOutExpo = function (x: number) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

var easeOutQuad = function (x: number) {
  return 1 - (1 - x) * (1 - x);
};

var easeOutQuart = function (x: number) {
  return 1 - Math.pow(1 - x, 4);
};

var easeOutQuint = function (x: number) {
  return 1 - Math.pow(1 - x, 5);
};

var easeOutSine = function (x: number) {
  return Math.sin((x * Math.PI) / 2);
};

export {
  easeInBack,
  easeInBounce,
  easeInCirc,
  easeInCubic,
  easeInElastic,
  easeInExpo,
  easeInOutBack,
  easeInOutBounce,
  easeInOutCirc,
  easeInOutCubic,
  easeInOutElastic,
  easeInOutExpo,
  easeInOutQuad,
  easeInOutQuart,
  easeInOutQuint,
  easeInOutSine,
  easeInQuad,
  easeInQuart,
  easeInQuint,
  easeInSine,
  easeOutBack,
  easeOutBounce,
  easeOutCirc,
  easeOutCubic,
  easeOutElastic,
  easeOutExpo,
  easeOutQuad,
  easeOutQuart,
  easeOutQuint,
  easeOutSine,
};
