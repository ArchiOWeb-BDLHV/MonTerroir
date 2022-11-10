import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";
import User from "../app/models/user.js";
import { cleanUpDatabase } from "./utils.js";


describe('GET /conversations/id/messages', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });

    it("shouldn't list all messages as the conversation is not own ", async function() {
        const user = await User.createFake();
        const user2 = await User.createFake();

        const resConv = await supertest(app)
            .post('/api/conversations/')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: 'test',
                users: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);


        const res = await supertest(app)
            .get('/api/conversations/' + resConv.body._id + '/messages')
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should list all messages as the conversation is own ", async function() {
        const user = await User.createFake();

        const resConv = await supertest(app)
            .post('/api/conversations/')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: 'test',
                users: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);

    });

    it("should access to a message as the conversation is own but not creator", async function() {
        const user = await User.createFake();
        let user2 = await User.createFake();

        const resConv = await supertest(app)
            .post('/api/conversations/')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: 'test',
                users: [user2._id],
            })
            .expect(201)
            .expect('Content-Type', /json/);

        user2 = await User.findById(user2._id);

        const res = await supertest(app)
            .get('/api/conversations/' + resConv.body._id + '/messages')
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("should create a message in a conversation", async function() {
        const user = await User.createFake();

        const resConv = await supertest(app)
            .post('/api/conversations/')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: 'test',
                users: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .post('/api/conversations/' + resConv.body._id + '/messages')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                content: 'test',
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it("shouldn't create a message in a conversation as the conversation is not own", async function() {
        const user = await User.createFake();
        const user2 = await User.createFake();

        const resConv = await supertest(app)
            .post('/api/conversations/')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: 'test',
                users: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .post('/api/conversations/' + resConv.body._id + '/messages')
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .send({
                content: 'test',
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

});



afterAll(async() => {
    await mongoose.disconnect();
});