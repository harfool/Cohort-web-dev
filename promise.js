let myPromise = new Promise((res , rej)=>{
    res((val)=>{
    console.log(val)
    })
    rej((err)=>{
    console.log("my promise err " , err);
    
    })
} )

myPromise()
.then(()=>{
    console.log("promise" )
})
.catch(()=>{
    console.log("give time to promise")
})

