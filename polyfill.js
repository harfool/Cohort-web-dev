//A polyfill is a piece of code (usually written in JavaScript) that implements modern features of the language in older browsers that do not support them natively.


//this is polyfill of forEach
if(!Array.prototype.myForEach){
    Array.prototype.myForEach = function(callBack){
        originalArray = this // object context (current object k taeraf point krta h)
        for(let i = 0 ; i < originalArray.length; i ++){
           console.log( callBack(originalArray[i] , i));
           
        }
    }
}
let num = [1,2,3,4,5,6,7,8,9]




num.myForEach((num,  i  )=> "value " + num + " index is " + i )

//polyfill of map 
//map signature - it return a new array 

if (!Array.prototype.myMap) {
    Array.prototype.myMap = function(callBack){
        let newArr = []

        originalArray = this 
        for(let i = 0 ; i < originalArray.length; i++){
            
            let irr = callBack(originalArray[i] , i) 
            newArr.push(irr)
        }
        return newArr;
    }
}

const newArray = num.myMap(v => v)
console.log(newArray);

// polyfill of filter

if(!Array.prototype.myFilter){
     Array.prototype.myFilter = function(callBack) {
        let value = []

        for(let i =0 ;  i < this.length ; i++){
            if (callBack(this[i])) {
                value.push(this[i])
            }
        }

        return value
     }
}
let even = num.myFilter(n => n % 3 == 0)
console.log(even);

//polyfill of Promies