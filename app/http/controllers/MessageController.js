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
    res.send("Got a response from the messages route");
}

function update(req, res, next) {
    res.send("Got a response from the messages route");
}

function destroy(req, res, next) {
    res.send("Got a response from the messages route");
}


export { index, store, show, update, destroy };