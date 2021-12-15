import User from "../models/User.js";

class APIController {
    async getUser(req, res, next) {
        try {
            const { userId } = req.query;
            if (userId) {
                const userInfo = await User.findOne({ _id: userId });
                return res.status(200).json(userInfo);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default new APIController();
