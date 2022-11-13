import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { cleanUpDatabase } from "./utils.js";

import crypto from "crypto";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";
import { Role } from "../app/models/role.js";
import User from "../app/models/user.js";

describe('GET /users', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("shouldn't list all users as not authticated", async function() {
        const res = await supertest(app)
            .get('/api/users')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("shouldn't list all users as non admin", async function() {
        const username = crypto.randomBytes(20).toString('hex');
        const user = await User.createFake();
        const res = await supertest(app)
            .get('/api/users')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should list all users as admin", async function() {
        const username1 = crypto.randomBytes(20).toString('hex');
        const username2 = crypto.randomBytes(20).toString('hex');
        const usernameAdmin = crypto.randomBytes(20).toString('hex');

        await Promise.all([
            User.createFake(),
            User.createFake(),
        ]);

        const user = await User.createFake({ role: Role.ADMIN });

        const res = await supertest(app)
            .get('/api/users')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);

    });
});

describe('GET /users/:id', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("shouldn't show user as not authticated", async function() {
        const username = crypto.randomBytes(20).toString('hex');

        const user = await User.createFake();
        const res = await supertest(app)
            .get('/api/users/' + user._id)
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("shouldn't show user as non own user", async function() {

        const user = await User.createFake();
        const otherUser = await User.createFake();

        expect(user._id).not.toBe(otherUser._id);

        const res = await supertest(app)
            .get('/api/users/' + otherUser._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(403)
            .expect('Content-Type', /json/);

    });

    it("should show user as own user", async function() {
        const username = crypto.randomBytes(20).toString('hex');

        const user = await User.createFake();

        const res = await supertest(app)
            .get('/api/users/' + user._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("should create user as admin", async function() {
        const username = crypto.randomBytes(20).toString('hex');
        const admin = await User.createFake({ role: Role.ADMIN });

        const res = await supertest(app)
            .post('/api/users')
            .set('Authorization', 'Bearer ' + generateAccessToken(admin))
            .send({
                username: username,
                password: "password",
                role: Role.USER,
                location: {
                    type: "Point",
                    coordinates: [5, 5]
                }
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it("shouldn't create user as non admin", async function() {

        const user = await User.createFake();

        const res = await supertest(app)
            .post('/api/users')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                username: crypto.randomBytes(20).toString('hex'),
                password: "password",
                role: Role.USER,
                location: {
                    type: "Point",
                    coordinates: [0, 0]
                }
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("shouldn't update user as not own", async function() {

        const user = await User.createFake();
        const otherUser = await User.createFake();

        const res = await supertest(app)
            .put('/api/users/' + otherUser._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                username: crypto.randomBytes(20).toString('hex'),
                password: "password",
                role: Role.USER,
                location: {
                    type: "Point",
                    coordinates: [0, 0]
                }
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should delete user as admin", async function() {

        const user = await User.createFake({ role: Role.ADMIN });

        const otherUser = await User.createFake();

        const res = await supertest(app)
            .delete('/api/users/' + otherUser._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(204)
    });

    it("shouldn't delete user as non admin", async function() {

        const user = await User.createFake();

        const otherUser = await User.createFake();

        const res = await supertest(app)
            .delete('/api/users/' + otherUser._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(403)
            .expect('Content-Type', /json/);
    });

});


afterAll(async() => {
    await mongoose.disconnect();
});