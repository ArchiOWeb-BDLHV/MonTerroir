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
        const user = await User.create({
            username: username,
            password: "password",
            role: Role.USER
        });
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
            User.create({ username: username1, password: 'password' }),
            User.create({ username: username2, password: 'password' })
        ]);

        const user = await User.create({
            username: usernameAdmin,
            password: "password",
            role: Role.ADMIN
        });

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

        const user = await User.create({
            username: username,
            password: "password",
            role: Role.USER
        });
        const res = await supertest(app)
            .get('/api/users/' + user._id)
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("shouldn't show user as non own user", async function() {

        const user = await User.create({
            username: crypto.randomBytes(20).toString('hex'),
            password: "password",
        });
        const otherUser = await User.create({
            username: crypto.randomBytes(20).toString('hex'),
            password: "password"
        });

        expect(user._id).not.toBe(otherUser._id);

        const res = await supertest(app)
            .get('/api/users/' + otherUser._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(403)
            .expect('Content-Type', /json/);

    });

    it("should show user as own user", async function() {
        const username = crypto.randomBytes(20).toString('hex');

        const user = await User.create({
            username: username,
            password: "password",
        });
        const res = await supertest(app)
            .get('/api/users/' + user._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);
    });
});


afterAll(async() => {
    await mongoose.disconnect();
});