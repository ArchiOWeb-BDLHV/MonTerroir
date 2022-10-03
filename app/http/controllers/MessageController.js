import Message from "../../models/message.js";

function index(req, res, next) {
    Message.find().exec(function(err, messages) {
        if (err) {
            return next(err);
        }
        res.send(messages);
    });
}

function store(req, res, next) {
    const message = new Message({
        content: req.body.content,
    });
    message.save(function(err) {
        if (err) {
            return next(err);
        }
        res.status(201).send(message);
    });
}

function show(req, res, next) {
    Message.findById(req.params.id).exec(function (err, messages) {
        if (err) {
            return next(err);
        }
        res.status(200).json(messages);
    });
}

function update(req, res, next) {
    Message.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, message) {
        if (err) {
            return next(err);
        }
        res.status(201).json(message);
    });
}


function destroy(req, res, next) {
    Message.findOneAndDelete({ _id: req.params.id }, function (err, message) {
        if (err) {
            return next(err);
        }
        res.status(204).json();
    });
}


export { index, store, show, update, destroy };