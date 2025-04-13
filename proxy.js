let user ={
    name :"harfool gurjar",
    id : 1,
    passord : '1221'
}

let proxyUser = new Proxy(user , {
    get(target , prop){
    //   console.log(target); //  its give whole object 
      if (prop === "passord") {
     throw new Error("access denied");
      }
      return target[prop]
      
    }
})
// console.log(proxyUser.passord);
// console.log(proxyUser.id);
// console.log(proxyUser.name);

let arr = [12,2,3,45,6,3]

// write proxy for reverse index

function negativeIndex(arr){
    return new Proxy(arr , {
       get(target , prop){
 
        let Index = Number(prop)
        if(Index < 0){
            return target[target.length + Index]
        }

        return target[prop]
       }
    })
}
 let negativeIndexProxy =  negativeIndex(arr)
 console.log(negativeIndexProxy[-1]);
 