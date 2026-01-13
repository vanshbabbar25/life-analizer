import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
           return res.status(401).json({ message: "Authorization token missing" });
        }

        // 2️⃣ Extract token
        const token = authHeader.split(" ")[1];

        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 4️⃣ Attach user to request
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


export default authMiddleware;