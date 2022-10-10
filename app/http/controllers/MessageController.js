import Message from "../../models/message.js";

async function index(req, res, next) {
    const messages = await Message.find().sort('content');
    res.status(200).json(messages);
}

async function store(req, res, next) {
    const message = new Message({
        content: req.body.content
    });
    const result = await message.save();
    res.status(201).json(result);
}

async function show(req, res, next) {
    const message = await Message.findById(req.params.id);
    res.status(200).json(message);
}

async function update(req, res, next) {
    const message = await Message.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(message);
}

async function destroy(req, res, next) {
    const message = await Message.findOneAndDelete({ _id: req.params.id });
    res.status(204).json();
}

export { index, store, show, update, destroy };