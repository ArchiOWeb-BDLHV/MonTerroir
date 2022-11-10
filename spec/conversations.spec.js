import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";
import User from "../app/models/user.js";
import { cleanUpDatabase } from "./utils.js";


describe('GET /conversations', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("shouldn't list all conversations as not authenticated", async function() {
        const res = await supertest(app)
            .get('/api/conversations')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should list all conversations as authenticated", async function() {
        const user = await User.createFake();

        const res = await supertest(app)
            .get('/api/conversations')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("should create a conversation", async function() {
        const user = await User.createFake();

        const res = await supertest(app)
            .post('/api/conversations')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: 'test',
                users: [user._id],
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });


    it("shouldn't create a conversation as authenticated but without name", async function() {
        const user = await User.createFake();

        const res = await supertest(app)
            .post('/api/conversations')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                users: [user._id],
            })
            .expect(422)
            .expect('Content-Type', /json/);

    });

});



afterAll(async() => {
    await mongoose.disconnect();
});