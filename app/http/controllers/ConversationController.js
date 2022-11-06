import { sendMessageToSpecificUser } from "../../../ws.js";
import Conversation from "../../models/conversation.js";
import User from "../../models/user.js";

export class ConversationController {
    static async index(req, res, next) {
        const conversations = await Conversation.findMine(req.user);
        res.status(200).json(conversations);
    }

    static async store(req, res, next) {
        try {
            const users = [req.user._id, ...req.body.users || []];
            console.log(users);
            const conversation = new Conversation({
                name: req.body.name,
                users: users,
            });
            const result = await conversation.save();

            users.forEach(async(userId) => {
                const user = await User.findById(userId);
                user.conversations.push(result._id);
                await User.updateOne({ _id: userId }, user);
                if (userId != req.user._id) {
                    sendMessageToSpecificUser("Nouvelle conversation " + result.name, userId, "NEW_CONVERSATION");
                }
            });

            res.status(201).json(result);
        } catch (e) {
            if (e.name === 'ValidationError') {
                const error = new Error(e.message);
                error.status = 422;
                next(error);
            }

        }
    }

    static async show(req, res, next) {
        const conversation = await Conversation.findById(req.params.id);
        res.status(200).json(conversation);
    }

    static async update(req, res, next) {
        const conversation = await Conversation.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(conversation);
    }

    static async destroy(req, res, next) {
        await Conversation.findOneAndDelete({ _id: req.params.id });
        res.status(204).json();
    }
}