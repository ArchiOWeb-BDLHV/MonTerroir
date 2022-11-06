import Conversation from "../../models/conversation.js";

export class ConversationController {
    static async index(req, res, next) {
        const conversations = await Conversation.find().sort('content');
        res.status(200).json(conversations);
    }

    static async store(req, res, next) {
        const conversation = new Conversation({
            content: req.body.content
        });
        const result = await conversation.save();
        res.status(201).json(result);
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