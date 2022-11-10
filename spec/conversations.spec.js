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

    it("shouldn't show a conversation as not own", async function() {

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
            .get('/api/conversations/' + resConv.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should show a conversation as own", async function() {

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
            .get('/api/conversations/' + resConv.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("shouldn't update a conversation as not own", async function() {

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
            .put('/api/conversations/' + resConv.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .send({
                name: 'test2',
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should update a conversation as own", async function() {

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
            .put('/api/conversations/' + resConv.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: 'test2',
            })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("shouldn't delete a conversation as not own", async function() {

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
            .delete('/api/conversations/' + resConv.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user2))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should delete a conversation as own", async function() {

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
            .delete('/api/conversations/' + resConv.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(204)
    });

});



afterAll(async() => {
    await mongoose.disconnect();
});