// https://gist.github.com/JLRishe/5dbb93c0ccb4982ef7cd8ceb8c97694b
var curryN = (function () {
    var slice = Function.prototype.call.bind(Array.prototype.slice);
    var bindArr = function (f, arr) { return f.bind.apply(f, [{}].concat(arr)); };

    return function curryN(argCount, func) {
        return function fn() {
            var args = slice(arguments, 0, argCount);

            return args.length === argCount
                ? func.apply({}, args)
                : bindArr(fn, args);
        };
    };
})();

var curry = function curry(func) { return curryN(func.length, func); };

module.exports = {
    curryN,
    curry
};