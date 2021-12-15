import userRoute from "./user.js";
import profileRoute from "./profile.js";
import conversations from "./conversations.js";
import messages from "./messages.js";
import api from "./api.js";

export default function route(app) {
    app.use("/auth", userRoute);
    app.use("/profile", profileRoute);
    app.use("/conversations", conversations);
    app.use("/messages", messages);
    app.use("/api", api);
}
