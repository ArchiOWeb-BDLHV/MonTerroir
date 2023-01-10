import { nonProcessable, unauthorized } from "../../../errors.js";
import { sendMessageToSpecificUser } from "../../../ws.js";
import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";

export class MessageController {
    static async index(req, res, next) {

        //paginate messages by 50
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 50;
        const skip = (page - 1) * perPage;

        const messages = await Message.where('conversation').equals(req.params.convId)
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
                    "date": message.date,
                    "mine": message.sender._id.equals(req.user._id)
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

            conversation.users.forEach(userId => {
                if (!userId.equals(req.user._id)) {
                    sendMessageToSpecificUser({
                        "data": {
                            "message": message.content,
                            "conversation": {
                                "id": message.conversation._id,
                                "name": message.conversation.name,
                            },
                            "sender": {
                                "id": message.sender._id,
                                "username": message.sender.username
                            },
                            "date": message.date,
                            "mine": false
                        },
                    }, userId, "NEW_MESSAGE");
                }
            });
            res.status(201).json({
                "message": message.content,
                "conversation": {
                    "id": message.conversation._id,
                    "name": message.conversation.name,
                },
                "sender": {
                    "id": message.sender._id,
                    "username": message.sender.username
                },
                "date": message.date,
                "mine": message.sender._id.equals(req.user._id)
            });
        } catch (err) {
            if (err.name === 'ValidationError') {
                nonProcessable(next, err);
            }
        }
    }

    static async show(req, res, next) {
        const message = await Message.findById(req.params.messageId);
        if (!message.conversation.equals(req.params.convId)) {
            unauthorized(next);
        }
        res.status(200).json(message);
    }

    static async update(req, res, next) {
        const message = await Message.findOneAndUpdate({ _id: req.params.messageId }, req.body, { new: true }).populate('conversation');

        message.conversation.users.forEach(userId => {
            if (!userId.equals(req.user._id)) {
                sendMessageToSpecificUser({
                    "data": {
                        "message": {
                            "id": message._id,
                            "content": message.content,
                        },
                        "conversation": {
                            "id": message.conversation._id,
                            "name": message.conversation.name,
                        },
                        "sender": {
                            "id": req.user._id,
                            "username": req.user.username
                        },
                        "date": message.date
                    },
                }, userId, "UPDATE_MESSAGE");
            }
        });

        res.status(200).json(message);
    }

    static async destroy(req, res, next) {
        const message = await Message.findOneAndDelete({ _id: req.params.messageId }).populate('conversation');
        message.conversation.users.forEach(userId => {
            if (!userId.equals(req.user._id)) {
                sendMessageToSpecificUser({
                    "data": {
                        "message": {
                            "id": message._id,
                            "content": message.content,
                        },
                        "conversation": {
                            "id": message.conversation._id,
                            "name": message.conversation.name,
                        },
                        "sender": {
                            "id": req.user._id,
                            "username": req.user.username
                        },
                        "date": message.date
                    },
                }, userId, "DELETE_MESSAGE");
            }
        });
        res.status(204).json();
    }
}