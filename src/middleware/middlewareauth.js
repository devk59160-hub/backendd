import jwt from "jsonwebtoken";


export const isAuthentication = (req,res,next)=>{
    try {
       const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"please login first"
            })
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.userId = decoded.id;
        next();
   } catch (error) {
  console.log("JWT ERROR:", error.name, error.message);

  return res.status(401).json({
    success: false,
    message: "Invalid or expired token",
  });
}
};