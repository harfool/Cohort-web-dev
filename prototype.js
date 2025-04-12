

Array.prototype.Harfool = ()=>{console.log("harfool gurjar");
}// this method to make predefined array perporty . that is use in every array

let arr = [1,2,34,5,56,8]
arr.Harfool()
if(arr.__proto__ === Array.prototype) {
    console.log("both are same "); 
    
}


Object.prototype.tellName = function(name){
    name = this.name 
    console.log(name);
    
}// this method to make predefined Object perporty . that is use in every Object


let obj = {
    name : "ganesh gujjar"
}

obj.tellName()  

