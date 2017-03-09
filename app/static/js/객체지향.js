function create_object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}




var person = {
    name: 'zzoon',
    getName: function () {
        return this.name;
    },
    setName: function (name) {
        this.name = name;
    }
}

var student = create_object(person);


// 아래의 코드는 jQuery의 extend 중 일부분이다.
// jQuery.extend = jQuery.fn.extend = jQuery.prototype
jQuery.extend = jQuery.fn.extend = function (obj, prop) {
    if (!prop) {prop = obj; obj = this;}
    for (var i in prop) obj[i] = prop[i];
    return obj;
}
/*
인자가 하나가 들어오면, jQuery.prototype에 함수를 추가하는 형태가 되고,
인자가 두개가 들어오면, obj를 확장하는 구조가 된다.
 */

var person = {
    name: 'zzoon',
    getName: function () {
        return this.name;
    },
    setName: function (name) {
        this.name = name;
    }
}

// 상속
function create_object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

// 확장
function extend(obj, prop) {
    if (!prop) {prop = obj; obj = this;}
    for (var i in prop) obj[i] = prop[i];
    return obj;
}

var student = create_object(person);
var added = {
    setAge: function (age) {
        this.age = age;
    },
    getAge: function () {
        return this.age;
    }
}

extend(student, added);

student.setAge(25);
console.log(student.getAge());




function Person(arg) {
    this.name = arg;
}

Person.prototype.setName = function(value) {
    this.name = value;
}

Person.prototype.getName = function() {
    return this.name;
}

function Student(arg) {}
/*
function Student(arg) {
    Person.apply(this, arguments);
}
apply, call > 실행 컨텍스트를 바꾸는 함수
*/

var you = new Person('siwon');
// you.say = function () {console.log('hi')};
Student.prototype = you;  
// 상속 받는 포인트로써, prototype을 물려 받는 것이 아닌
// new 통한 객체(인스턴스)를 prototype으로 사용하고 있음을 알 수 있다.
// 이 패턴의 단점은 부모객체의 인스턴스가 부모 프로토타입을 가지고 있을 뿐만아니라,
// 인스턴스 자신의 프로퍼티도 가진 상태로 상속이 일어난다는 점이다.
// 보통은 인스턴스-자신의 프로퍼티는 필요하지 않다.
// 즉 부모의 인스턴스가 자식의 인스턴스에 영향을 주고 있다는 말이 된다.

var me = new Student('zzoon');
me.setName('zzoon');
console.log(me.getName());




Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
}

function Person(arg) {
    this.name = arg;
}

Person.method('setName', function(value){
    this.name = value;
});

Person.method('getName', function(){
    return this.name;
});

function Student(arg) {}

function F() {};
F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = Student;
Student.super = Person.prototype;

var me = new Student();
me.setName('zzoon');
console.log(me.getName());



var inherit = function (Parent, Child) {
    var F = function() {};
    return function (Parent, Child) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.super = Parent.prototype;
    }
}();

inherit(Person, Student);



var Person = function (arg) {
    var name = arg ? arg : 'zzoon';
    this.getName = function () {
        return name;
    }
    this.setName = function (name) {
        name = name;
    }
}

var me = new Person();
console.log(me.getName());
me.setName('siwon');
console.log(me.getName());
console.log(me.name);






var Person = function (arg) {
    var name = arg ? arg : 'zzoon';

    return {
        getName: function (){
            return name;
        },
        setName: function (arg){
            name = arg;
        }
    }
}

var me = Person();
console.log(me.getName());
// 그냥 오브젝트.



var ArrCreate = function (arg) {
    var arr = [1,2,3];

    return {
        getArr: function() {
            return arr;
        }
    }
}

var obj = ArrCreate();
var arr = obj.getArr();
arr.push(5);
console.log(obj.getArr());





var Person = function(arg) {
    var name = arg ? arg : 'zzoon';

    var Func = function(){}
    Func.prototype = {
        getName: function (){
            return name;
        },
        setName: function(arg){
            name = arg;
        }
    }

    return Func;
}();

var me = new Person();
console.log(me.getName());




// 위에서 배운 내용을 다 합쳐서 subClass를 만들어보자!
// 이 함수의 목적은 

// 인터페이스
var SuperClass = subClass(obj);
var SubClass= SuperClass.subClass(obj);
// 대략 이런 형태로~

// 1 단계
// 여기까지는 부모의 prototype만 상속 받음.
function subClass(obj) {
    
    var parent = this; // 이 함수의 호출자가 부모이다.
    var F = function(){};

    var child = function(){};

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
    child.parent_constructor = parent;

    return child;
}


// 2 단계
function subClass(obj) {
    
    var parent = this; // 이 함수의 호출자가 부모이다.
    var F = function(){};

    var child = function(){};

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
    child.parent_constructor = parent;

    // 여기서 부터는 obj를 통해서 자식의 prototype 확장
    for (var i in obj) {
        if( obj.hasOwnProperty(i) ) {
            child.prototype[i] = obj[i];
        }
    }

    return child;
}

var test = subClass({
    print: function(){ console.log('출력'); }
})



// 3 단계 생성자 호출 

var child = function () {
    if (parent._init) {
        parent._init.apply(this, arguments);
    }
    if (child.prototype._init) {
        child.prototype._init.apply(this, arguments);
    }
}
// child가 new 라는 키워드가 함께 붙으면 위의 코드가 실행됨. 
// 생성자 함수로 _init 함수가 실행된다. => java의 super 같은 느낌
// 얼핏 보면 잘 실행될것 같으나, _init이 자기자신의 프로퍼티가 아닌 상속 받은 프로퍼티일 수 도 있으니 아래와 같이 작성이 필요함

var child = function () {
    if (parent.hasOwnProperty('_init')) {
        parent._init.apply(this, arguments);
    }
    if (child.prototype.hasOwnProperty('_init')) {
        child.prototype._init.apply(this, arguments);
    }
}
// 위의 코드는 
// var SuperClass = subClass();
// var SubClass= SuperClass.subClass();
// 이렇게 되었을때만 잘 동작한다 만약 아래와 같이 또 다시 상속을 받게 된다면...
// var SuperClass = subClass();
// var SubClass= SuperClass.subClass();
// var Sub_SubClass = SubClass.subClass();
// var instance = new Sub_SubClass();
// 따라서 재귀적으로 작성해야 할 필요가 있음

var child = function () {
    var _parent = child.parent_constructor;
    if(_parent && _parent !== Function) {
        _parent.apply(this, arguments); 
        // 재귀 호출
        // 이게 가능한 이유는 이미 부모의 클래스가 child function을 가지고 생성되었기 때문이다.
    }

    if (child.prototype.hasOwnProperty('_init')) {
        child.prototype._init.apply(this, arguments);
    }
}


// 4 단계 보완
if(this === window) {
    var parent = Function;
} else {
    var parent = this;
}

var parent = this === window ? Function : this ;

child.subClass = arguments.callee;


// 완성
function subClass(obj) {
    
    var parent = this === window ? Function : this ;
    var F = function(){};

    var child = function () {
        var _parent = child.parent_constructor;
        if(_parent && _parent !== Function) {
            _parent.apply(this, arguments); 
            // 재귀 호출
            // 이게 가능한 이유는 이미 부모의 클래스가 child function을 가지고 생성되었기 때문이다.
        }

        if (child.prototype.hasOwnProperty('_init')) {
            child.prototype._init.apply(this, arguments);
        }
    }

    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
    child.parent_constructor = parent;
    child.subClass = arguments.callee;

    // 여기서 부터는 obj를 통해서 자식의 prototype 확장
    for (var i in obj) {
        if( obj.hasOwnProperty(i) ) {
            child.prototype[i] = obj[i];
        }
    }

    return child;
}

var person_obj = {
    _init: function () {
        console.log('person init'); 
    },
    getName: function () {
        return this._name;
    },
    setName: function (name) {
        this._name = name;
    }
};

var student_obj = {
    _init: function () {
        console.log('student init');
    },
    getName: function() {
        return "Student Name: " + this._name;
    }
}

var Person = subClass(person_obj);
var person = new Person();
person.setName('siwon');
console.log(person.getName());

var Student = Person.subClass(student_obj);
var student = new Student();
student.setName('seosiwon');
console.log(student.getName());
console.log(Person.toString());





// subClass에 클로저 적용

// 위의 코드중에 거슬리는 부분은 F 함수가 subClass 호출시 마다 객체 생성이 된다는 점이다.
// 그래서 아래와 같이 클로저로 만들어 메모리 영역에 묶어버린다.
var subClass = function (obj) {
    var F = function(){};
    var subClass = function (obj) {
    
        var parent = this === window ? Function : this ;
        var child = function () {
            var _parent = child.parent_constructor;
            if(_parent && _parent !== Function) {
                _parent.apply(this, arguments); 
                // 재귀 호출
                // 이게 가능한 이유는 이미 부모의 클래스가 child function을 가지고 생성되었기 때문이다.
            }

            if (child.prototype.hasOwnProperty('_init')) {
                child.prototype._init.apply(this, arguments);
            }
        }

        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.parent = parent.prototype;
        child.parent_constructor = parent;
        //child.subClass = arguments.callee;
        child.subClass = subClass;

        // 여기서 부터는 obj를 통해서 자식의 prototype 확장
        for (var i in obj) {
            if( obj.hasOwnProperty(i) ) {
                child.prototype[i] = obj[i];
            }
        }

        return child;
    } 
    return subClass;
}();


// 이번엔 은닉화를 이용해서 만들어보쟝.
var person = function (arg) {
    var name = undefined;

    return {
        _init: function (arg) {
            name = arg ? arg : 'siwon';
        },
        getName: function () {
            return name;
        },
        setName: function (arg) {
            name = arg;
        }
    }
}

Person = subClass(person());
var iamsiwon = new Person('iamsiwon');
console.log(iamsiwon.getName());

Student = Person.subClass();
var student = new Student('bb');
console.log(student.getName());