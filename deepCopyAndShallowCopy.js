//A shallow copy copies only the top-level data. If the object has nested arrays or objects, it still points to the same reference. So changes in nested data reflect in the original.
let original = {
    name : "harfool",
    skills : ["javascript" , "Html", "CSS"]
}

let shallowCopy = {...original}

shallowCopy.name = "champian"

shallowCopy.skills.push("react")

console.log(original); //{ name: 'harfool', skills: [ 'javascript', 'Html', 'CSS', 'react' ] }
console.log(shallowCopy);  //{ name: 'champian', skills: [ 'javascript', 'Html', 'CSS', 'react' ] }

//A deep copy makes a full copy of an object or array, including all nested structures. The original and the copy are fully separate in memory.

let Person = {name :"harfool" , hobbies : ["reading" , "writing"]}
let deepCopy = structuredClone(Person) 
let DeepCopy = JSON.parse(JSON.stringify(Person)); // Also deep, but can't copy functions/dates


deepCopy.hobbies.push("singing")
console.log(deepCopy);//{ name: 'harfool', hobbies: [ 'reading', 'writing', 'singing' ] }

console.log(Person); //{ name: 'harfool', hobbies: [ 'reading', 'writing' ] } deep copy don't affect original object . both are  seprated in memory