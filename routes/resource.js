import express from "express";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

function callPolicy(policy, method) {
    return policy[method];
}

function callController(controller, method) {
    return controller[method];
}

export function resource(controller, policy) {
    [{
            "verb": "get",
            "method": "index",
            "path": "/",
        },
        {
            "verb": "post",
            "method": "store",
            "path": "/",
        },
        {
            "verb": "get",
            "method": "show",
            "path": "/:id",
        },
        {
            "verb": "put",
            "method": "update",
            "path": "/:id",
        },
        {
            "verb": "delete",
            "method": "destroy",
            "path": "/:id",
        }
    ].forEach(element => {

        const methods = [];

        if (policy) {
            methods.push(callPolicy(policy, element.method));
        }

        methods.push(asyncRoute(callController(controller, element.method)));

        router[element.verb](element.path, methods);
    });

    return router;
}