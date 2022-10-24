import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { cleanUpDatabase } from "./utils.js";

import User from "../app/models/user.js";
import { Role } from "../app/models/role.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";


describe('POST /login', function() {
    beforeEach(async function() {
        cleanUpDatabase();
    });
    it("shouldn't login as user doesn't exist", async function() {
        const res = await supertest(app)
            .post('/auth/login')
            .send({ username: "user", password: "password" })
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("shouldn't login as password is wrong", async function() {
        await User.create({
            username: "user",
            password: "password"
        });
        const res = await supertest(app)
            .post('/auth/login')
            .send({ username: "user", password: "wrongpassword" })
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should login as user", async function() {
        await User.create({
            username: "user",
            password: "password"
        });
        const res = await supertest(app)
            .post('/auth/login')
            .send({ username: "user", password: "password" })
            .expect(200)
            .expect('Content-Type', /json/);

    });
});

describe('POST /register', function() {
    beforeEach(async function() {
        cleanUpDatabase();
    });
    it("should register as user", async function() {
        const res = await supertest(app)
            .post('/auth/register')
            .send({ username: "user1", password: "password" })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("shouldn't register as user already exists", async function() {
        await User.create({
            username: "user2",
            password: "password"
        });
        const res = await supertest(app)
            .post('/auth/register')
            .send({ username: "user2", password: "password" })
            .expect(400)
            .expect('Content-Type', /json/);
    });

    it("shouldn't register as username is missing", async function() {
        const res = await supertest(app)
            .post('/auth/register')
            .send({ password: "password" })
            .expect(422)
            .expect('Content-Type', /json/);
    });

    it("shouldn't register as password is missing", async function() {
        const res = await supertest(app)
            .post('/auth/register')
            .send({ username: "user3" })
            .expect(422)
            .expect('Content-Type', /json/);
    });

});

afterAll(async function() {
    await mongoose.connection.close();
});