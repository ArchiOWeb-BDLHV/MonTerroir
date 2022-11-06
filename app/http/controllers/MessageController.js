import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";

export class MessageController {
    static async index(req, res, next) {
        const conversations = await Conversation.findById(req.params.convId);
        res.json(conversations.messages);
        /* const messages = await Message.find().sort('content');
        res.status(200).json(messages); */
    }

    static async store(req, res, next) {
        const message = new Message({
            content: req.body.content
        });
        const result = await message.save();
        res.status(201).json(result);
    }

    static async show(req, res, next) {
        const message = await Message.findById(req.params.id);
        res.status(200).json(message);
    }

    static async update(req, res, next) {
        const message = await Message.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(message);
    }

    static async destroy(req, res, next) {
        const message = await Message.findOneAndDelete({ _id: req.params.id });
        res.status(204).json();
    }
}