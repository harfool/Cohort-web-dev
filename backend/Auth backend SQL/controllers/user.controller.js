const registerUser = (req , res) => {
// get data from req.body
const {email , password} = req.body

//validate
if (!email || !password) {
    res.status(400).json({
        success : false,
        message : "Email or Password are required "
    })

// get user based on email

}
}

export {
    registerUser
}