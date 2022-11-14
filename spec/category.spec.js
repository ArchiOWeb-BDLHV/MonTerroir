import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";
import User from "../app/models/user.js";
import { cleanUpDatabase } from "./utils.js";
import Category from "../app/models/category.js";
import { Role } from "../app/models/role.js";

describe("Category tests", function() {

    beforeEach(async function() {
        await cleanUpDatabase();
    });

    it("shouldn't list all categories as unauth", async function() {

        const res = await supertest(app)
            .get('/api/categories')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should list all categories as auth", async function() {

        const user = await User.createFake();

        const res = await supertest(app)
            .get('/api/categories')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("shouldn't create a category as unauth", async function() {

        const res = await supertest(app)
            .post('/api/categories')
            .send({ name: 'test' })
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should create a category as auth and admi", async function() {

        const user = await User.createFake({ role: Role.ADMIN });

        const res = await supertest(app)
            .post('/api/categories')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({ name: 'test', description: 'test' })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it("shouldn't update a category as unauth", async function() {

        const res = await supertest(app)
            .put('/api/categories/1')
            .send({ name: 'test', description: 'test' })
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should update a category as auth and admin", async function() {

        const user = await User.createFake({ role: Role.ADMIN });

        const category = await Category.createFake();

        const res = await supertest(app)
            .put('/api/categories/' + category._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({ name: 'test', description: 'test' })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("shouldn't delete a category as unauth", async function() {

        const res = await supertest(app)
            .delete('/api/categories/1')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should delete a category as auth and admin", async function() {

        const user = await User.createFake({ role: Role.ADMIN });

        const category = await Category.createFake();

        const res = await supertest(app)
            .delete('/api/categories/' + category._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(204)
    });



});

afterAll(async function() {
    await mongoose.disconnect();
});