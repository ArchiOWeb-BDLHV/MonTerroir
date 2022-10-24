import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { cleanUpDatabase } from "./utils.js";

import User from "../app/models/user.js";
import { Role } from "../app/models/role.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";


describe('GET /users', function() {
    beforeEach(async function() {
        cleanUpDatabase();
    });
    it("shouldn't list all users as not authticated", async function() {
        const res = await supertest(app)
            .get('/users')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("shouldn't list all users as non admin", async function() {
        const user = await User.create({
            username: "user",
            password: "password",
            role: Role.USER
        });
        const res = await supertest(app)
            .get('/users')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should list all users as admin", async function() {
        await Promise.all([
            User.create({ username: 'John Doe', password: 'password' }),
            User.create({ username: 'Jane Doe', password: 'password' })
        ]);

        const user = await User.create({
            username: "admin",
            password: "password",
            role: Role.ADMIN
        });

        const res = await supertest(app)
            .get('/users')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body.length).toBe(3);
    });
});



afterAll(async() => {
    await mongoose.disconnect();
});