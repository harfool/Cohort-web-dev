import jwt from "jsonwebtoken"
export const isLoggedIn = async (req, res, next) => {
    try {
      
        console.log(req.cookies)

        // Extract the token from cookies (optional chaining ensures safety if cookies are undefined)
        let token = req.cookies?.token


        console.log("token found :", token ? "yes" : "No")

        // If token is not present, return an unauthorized response
        if (!token) {
            console.log("No Token")
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            })
        }

        // Verify the token using the secret key
        // If invalid or expired, this will throw an error and move to the catch block
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        // Log the decoded token payload 
        console.log("decoded data", decoded)

        // Attach decoded user data to the request 
        req.user = decoded

      
        next()

    } catch (error) {
        
        console.error("Authentication error:", error)

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }

}
