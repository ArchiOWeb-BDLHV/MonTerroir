import { nonProcessable } from "../../../errors.js";
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

            //if users already has a conversation with body users[0] return it
            let existingConversation = await Conversation.findOne({
                users: {
                    $all: [req.user._id, ...req.body.users]
                }
            });

            if (existingConversation) {
                return res.status(200).json(existingConversation);
            }

            const users = [req.user._id, ...req.body.users || []];
            const newConversation = new Conversation({
                name: req.body.name,
                users: users,
            });
            const result = await newConversation.save();

            await User.updateMany({ _id: { $in: users } }, { $push: { conversations: result._id } });

            users.forEach(async(userId) => {
                if (userId != req.user._id) {
                    sendMessageToSpecificUser("Nouvelle conversation " + result.name, userId, "NEW_CONVERSATION");
                }
            });

            res.status(201).json(result);
        } catch (e) {
            if (e.name === 'ValidationError') {
                nonProcessable(next, e);
            }

        }
    }

    static async show(req, res, next) {
        const conversation = await Conversation.findById(req.params.id).populate('users');
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