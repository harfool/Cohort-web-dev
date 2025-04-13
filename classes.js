class batch{
    constructor(Name , course , department){
        this.Name = Name
        this.department = department
        this.course = course
    }
    aboutBatch(){
        console.log(`this is ${this.Name} and he is from ${this.department} department and he enrolled for ${this.course}`);
        
    }
}

let Student1 = new batch("Harfool gurjar" , "BCA " , "web dev cohort")
let Student2 = new batch("ganesh gujjar" , "ba" , null)
Student1.aboutBatch()
Student2.aboutBatch()

class Mentor extends batch {
constructor(Mentor , course){
    super(course, Mentor)
    this.Mentor = Mentor
}
aboutMentor(){
    console.log(`this is ${this.Mentor} and this mentor of ${this.course}`);
    
}
}
let hcSir = new Mentor("hitesh sir" , "Web dev cohort")
hcSir.aboutMentor()