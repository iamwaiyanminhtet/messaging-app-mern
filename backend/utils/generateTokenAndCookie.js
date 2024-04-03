import jwt from "jsonwebtoken";

const generateTokenAndCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn : "10d"
    });

    res.cookie("messaging_access_token", token, {
        httpOnly : true,
        maxAge : 10 * 24 * 60 * 60 * 1000,
    });
}

export default generateTokenAndCookie;