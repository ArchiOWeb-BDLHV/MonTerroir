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
            .post('/api/conversations')
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

        const res = await supertest(app)
            .get('/api/conversations/' + resConv.body._id + '/messages')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual(
            expect.objectContaining({
                data: expect.any(Array),
                perPage: expect.any(Number),
                page: expect.any(Number),
            })
        );

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

        expect(res.body).toEqual(
            expect.objectContaining({
                data: expect.any(Array),
                perPage: expect.any(Number),
                page: expect.any(Number),
            })
        );
    });

    it("should create a message in a conversation", async function() {

        const user = await User.createFake();

        const resConv = await supertest(app)
            .post('/api/conversations')
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

        expect(res.body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                content: expect.any(String),
                conversation: expect.any(String),
                sender: expect.any(String),
                date: expect.any(String),
            })
        );
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

    it("should show a message in a conversation as own", async function() {

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

        const res2 = await supertest(app)
            .get('/api/conversations/' + resConv.body._id + '/messages/' + res.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/)


        expect(res2.body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                content: expect.any(String),
                conversation: expect.any(String),
                sender: expect.any(String),
                date: expect.any(String),
            })
        );

    });

    it("shouldn't show a message in a conversation as not own", async function() {

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
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                content: 'test',
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res2 = await supertest(app)
            .get('/api/conversations/' + resConv.body._id + '/messages/' + res.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should update a message in a conversation as own", async function() {

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

        const res2 = await supertest(app)
            .put('/api/conversations/' + resConv.body._id + '/messages/' + res.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                content: 'test2',
            })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res2.body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                content: expect.any(String),
                conversation: expect.any(Object),
                sender: expect.any(String),
                date: expect.any(String),
            })
        );
    });

    it("shouldn't update a message in a conversation as not own", async function() {

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
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                content: 'test',
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res2 = await supertest(app)
            .put('/api/conversations/' + resConv.body._id + '/messages/' + res.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .send({
                content: 'test2',
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should delete a message in a conversation as own", async function() {

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

        const res2 = await supertest(app)
            .delete('/api/conversations/' + resConv.body._id + '/messages/' + res.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(204)

        expect(res2.body).toEqual({});
    });

    it("shouldn't delete a message in a conversation as not own", async function() {

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
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                content: 'test',
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res2 = await supertest(app)
            .delete('/api/conversations/' + resConv.body._id + '/messages/' + res.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .expect(403)
            .expect('Content-Type', /json/);
    });

});


afterAll(async() => {
    await mongoose.disconnect();
});