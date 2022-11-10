import { sendMessageToSpecificUser } from "../../../ws.js";
import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";

export class MessageController {
    static async index(req, res, next) {

        //paginate messages by 50
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 50;
        const skip = (page - 1) * perPage;

        const messages = await Message.where(req.params.convId).in('conversations')
            .sort({ "date": -1 })
            .skip(skip)
            .limit(perPage)
            .populate('sender')
            .populate('conversation');

        res.json({
            data: messages.map(message => {
                return {
                    "message": message.content,
                    "conversation": {
                        "id": message.conversation._id,
                        "name": message.conversation.name,
                    },
                    "sender": {
                        "id": message.sender._id,
                        "username": message.sender.username
                    },
                    "date": message.date
                }
            }),
            page,
            perPage,
        });
    }

    static async store(req, res, next) {
        try {
            const conversation = await Conversation.findById(req.params.convId);
            const message = await Message.create({
                content: req.body.content,
                conversation: conversation._id,
                sender: req.user._id,
            });
            conversation.messages.push(message._id);
            await Conversation.updateOne({ _id: conversation._id }, conversation);

            conversation.users.forEach(userId => {
                if (!userId.equals(req.user._id)) {
                    sendMessageToSpecificUser({
                        "data": {
                            "message": message.content,
                            "conversation": {
                                "id": conversation._id,
                                "name": conversation.name,
                            },
                            "sender": {
                                "id": req.user._id,
                                "username": req.user.username
                            },
                            "date": message.date
                        },
                    }, userId, "NEW_MESSAGE");
                }
            });
            res.status(201).json(message);
        } catch (err) {
            if (err.name === 'ValidationError') {
                const error = new Error(err.message);
                error.status = 422;
                next(error);
            }
        }
    }

    static async show(req, res, next) {
        const message = await Message.findById(req.params.id);
        res.status(200).json(message);
    }

    static async update(req, res, next) {
        const message = await Message.findOneAndUpdate({ _id: req.params.messageId }, req.body, { new: true });
        res.status(200).json(message);
    }

    static async destroy(req, res, next) {
        const message = await Message.findOneAndDelete({ _id: req.params.messageId });
        res.status(204).json();
    }
}