import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { cleanUpDatabase } from "./utils.js";
import User from "../app/models/user.js";
import crypto from "crypto";

describe('POST /login', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("shouldn't login as user doesn't exist", async function() {
        const res = await supertest(app)
            .post('/api/auth/login')
            .send({ username: "user", password: "password" })
            .expect(401)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual({ error: "Username or password incorrect" });
    });

    it("shouldn't login as password is wrong", async function() {
        const user = await User.createFake();

        const res = await supertest(app)
            .post('/api/auth/login')
            .send({ username: user.username, password: "wrongpassword" })
            .expect(401)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual({ error: "Username or password incorrect" });
    });

    it("should login as user", async function() {

        const user = await User.createFake({ password: "password" });

        const res = await supertest(app)
            .post('/api/auth/login')
            .send({ username: user.username, password: "password" })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual(
            expect.objectContaining({
                user: expect.objectContaining({
                    _id: user._id.toString(),
                    username: user.username,
                    location: user.location,
                    conversations: expect.any(Array),
                }),
                accessToken: expect.any(String)
            })
        );
    });
});

describe('POST /register', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("should register as user", async function() {
        const username = crypto.randomBytes(20).toString('hex');

        const res = await supertest(app)
            .post('/api/auth/register')
            .send({
                username: username,
                password: "password",
                location: {
                    type: "Point",
                    coordinates: [10, 10]
                },
            })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual(
            expect.objectContaining({
                user: expect.objectContaining({
                    _id: expect.any(String),
                    username: username,
                    location: {
                        type: "Point",
                        coordinates: [10, 10]
                    },
                    conversations: expect.any(Array),
                }),
                accessToken: expect.any(String)
            })
        );
    });

    it("shouldn't register as user already exists", async function() {

        const user = await User.createFake({ password: "password" });

        const res = await supertest(app)
            .post('/api/auth/register')
            .send({ username: user.username, password: "password" })
            .expect(400)
            .expect('Content-Type', /json/);
    });

    it("shouldn't register as username is missing", async function() {
        const res = await supertest(app)
            .post('/api/auth/register')
            .send({ password: "password" })
            .expect(422)
            .expect('Content-Type', /json/);
    });

    it("shouldn't register as password is missing", async function() {
        const username = crypto.randomBytes(20).toString('hex');

        const res = await supertest(app)
            .post('/api/auth/register')
            .send({ username: username })
            .expect(422)
            .expect('Content-Type', /json/);
    });

});

describe('Test auth logic', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("shouldn't login as the token is invalid", async function() {
        const res = await supertest(app)
            .get('/api/users')
            .set('Authorization', 'Bearer ' + "invalidtoken")
            .expect(403)
            .expect('Content-Type', /json/);

    });

    it("shouldn't login as the token is missing", async function() {

        const res = await supertest(app)
            .get('/api/users')
            .expect(401)
            .expect('Content-Type', /json/);

    });
});

afterAll(async function() {
    await mongoose.connection.close();
});