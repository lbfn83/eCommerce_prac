class MyClass {
    constructor() {
        console.log("initiate");
    }

    sayHello(str)
    {
        console.log(str)
    }

    add(arg1, arg2) {
        var result;
        result = arg1 + arg2;
        return result;
    }

    callAnotherFn (arg1, arg2) {
        // the below single line doesn't affect the result of the function
        this.sayHello("halo world");
        var result = this.add(arg1, arg2);
        return result;
    }

    callTheCallback(callback){
        callback();
    }
}

module.exports = MyClass