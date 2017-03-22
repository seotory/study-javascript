// 기존 객체 지향 프로그래밍의 문제..

// side effect..
// 여러분이 짠 소스는 결코 순수하지 않다.. 왜냐면...
function processMessage () {
    var msg = new Message();
    send(msg);
}
// 표면적으로는 입출력이 없으나, 숨겨진 입출력이 있음. 이런 함수들은 메소드 명을 보고 함수의 동작을 짐작할 수 없으며 side - effect 부작용을 낳는 주요 함수가 된다.



var f1 = function () {}
var f2 = function () {}
var f3 = function () {}

// 순수값. 작업중에 값이 변하지 않는다.
var pure_value = 'zzoon';


encrypted_value = get_encrypted(f1)
encrypted_value = get_encrypted(f2)
encrypted_value = get_encrypted(f3)


// 중요한 개념
// 1. 순수 함수
// 인자의 값에만 의존이 있는 함수

// 2. 고계 함수
// 인자를 함수로 받아서 반환값으로 인자(함수)에 영향을 받는 새로운 함수나 값을 만들어 내는 함수.

// f1,2,3 는 추상화된 슈도 코드이다.
var f1 = function (input) {
    var result; //이 함수의 연산부
    result = 1; //이 함수의 연산부
    return result + input;
}

var f2 = function (input) {
    var result;
    result = 2;
    return result;
}

var f3 = function (input) {
    var result;
    result = 3;
    return result;
}

var get_encrypted = function (func) {
    var str = 'zzoon';

    return function () {
        return func(str);
    }
}

var encrypted_value = get_encrypted(f1)(1); // get_encrypted(f1) -> 여기서 반환하는 함수가 클로저.
console.log(encrypted_value);
var encrypted_value = get_encrypted(f2)(2);
console.log(encrypted_value);
var encrypted_value = get_encrypted(f3)(3);
console.log(encrypted_value);



// 배열 총합.
function sum(arr) {
    var len = arr.length;
    var i = 0, sum = 0;

    for (; i < len ; i++) {
        sum += arr[i];
    }

    return sum;
}

var arr = [1,2,3,4];
console.log(sum(arr));

// 곱
function muliply(arr) {
    var len = arr.length;
    var i = 0, result = 1;

    for (; i < len ; i++) {
        result *= arr[i];
    }

    return result;
}

var arr = [1,2,3,4];
console.log(muliply(arr));


// 함수형으로 ㄲ
var arr = [1,2,3,4]  // =>pure value.

// 순수함수
var sum = function (x, y) {
    return x + y;
}
var muliply = function (x, y) {
    return x * y;
}

// 고계함수
function reduce(func, arr, memo) {
    var len = arr.length, i=0, accum=memo;

    for (; i < len ; i++) {
        accum = func(accum, arr[i]);
    }
    return accum;
}

console.log( reduce(sum, arr, 0) );
console.log( reduce(muliply, arr, 1) );




function fact(num) {
    var val = 1;
    for (var i = 2 ; i<= num; i++) {
        val = val * i;
    }
    return val;
}

console.log(fact(100));


var fact = function () {
    var cache = {'0':1};
    var func = function (n) {
        var result = 0;
        if(typeof(cache[n]) === 'number') {
            result = cache[n];
        }else {
            result = cache[n] = n * func(n-1);
        }
        return result;
    }
    return func;
}()

console.log(fact(10));
console.log(fact(20));


// 피보나치
/*
 기원전 5세기 인도의 수학자 핑갈라가 쓴 책

첫 달에는 새로 태어난 토끼 한 쌍만이 존재한다.
두 달 이상이 된 토끼는 번식 가능하다.
번식 가능한 토끼 한 쌍은 매달 새끼 한 쌍을 낳는다.
토끼는 죽지 않는다.
*/
var fibo = function () {
    var cache = {'0':1, '1':1};
    var func = function (n) {
        if (typeof(cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(n-1) + func(n-2);
        }
        return result;
    }
    return func;
}();

console.log(fibo(10));



var cacher = function (cache, func) {
    var calculate = function (n) {
        if (typeof(cache[n]) === 'number') {
            result = cache[n];
        } else {
            result = cache[n] = func(calculate, n);
        }
        return result;
    }
    return calculate;
}

var fact = cacher({'0':1}, function (func, n) {
    return n * func(n-1);
});

var fibo = cacher({'0':0,'1':1}, function (func, n){
    return func(n-1) + func(n-2);
});






// 커링
function calculate(a,b,c) {
    return a*b+c;
}

function curry(func) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    }
}

var new_func1 = curry(calculate, 1);
console.log( new_func1(2,3) );

var new_func2 = curry(calculate, 1, 3);
console.log( new_func2(3) );


// bind
Function.prototype.bind = function (thisArg) { // 고계 함수.
    var fn = this;
    slice = Array.prototype.slice;
    args = slice.call(arguments, 1);
    return function () {
        return fn.apply(thisArg, args.concat(slice.call(arguments)));
    }
}
/*
fn 은 실행시킨 함수.
*/

var print_all = function (arg) {
    for (var i in this) console.log(i + ' : ' + this[i]);
    for (var i in arguments) console.log(i + ' : ' + arguments[i]);
}

var myobj = {name: 'zzoon'};
var myfunc = print_all.bind(myobj);
myfunc();

var myfunc1 = print_all.bind(myobj, 'iamssw', 'others');
myfunc1('insidejs');


function wrap(object, method, wrapper) {
    var fn = object[method];  // 원본 메소드.
    return object[method] = function () {
        console.log(this);
        // return wrapper.apply(this, [fn].concat(  // 이 라인으로 하면 wrap 와 mywrap 의 this가 따로놀음.
        return wrapper.apply(this, [fn.bind(this)].concat( //fn 을 배열로 만듬.
            Array.prototype.slice.call(arguments)
        ))
    }
}

Function.prototype.original = function (value) {
    this.value = value;
    console.log('value: ' + this.value);
}

var mywrap = wrap(Function.prototype, 'original', function (orig_func, value){
    this.value = 20;
    orig_func(value);
    console.log('wrapper value: ' + this.value);
});

var obj = new mywrap('zzoon');