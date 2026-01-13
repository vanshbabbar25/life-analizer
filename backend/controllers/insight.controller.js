import {generatePatterns} from "../services/patternEngine/index.js";

export const getInsights = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const insights = await generatePatterns(userId);
        res.status(200).json({insights});
    } catch (error) {
        next(error);
    }
};