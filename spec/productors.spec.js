import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { cleanUpDatabase } from "./utils.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";

import Productor from "../app/models/productor.js";
import User from "../app/models/user.js";
import { Role } from "../app/models/role.js";

describe('GET /productors', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("shouldn't list all productors as not authticated", async function() {
        const res = await supertest(app)
            .get('/api/productors')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should list all productors as authenticated", async function() {
        const user = await User.createFake();

        const productor = await Productor.createFake();

        const res = await supertest(app)
            .get('/api/productors')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);



        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(String),
                    username: expect.any(String),
                    location: expect.any(Object),
                })
            ])
        );

    });

    it("shouldn't create a productor as not admin", async function() {
        const user = await User.createFake();

        const res = await supertest(app)
            .post('/api/productors')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                name: "Productor 1",
                email: ""
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should create a productor as admin", async function() {
        const user = await User.createFake({ role: Role.ADMIN });

        const res = await supertest(app)
            .post('/api/productors')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                username: "Productor 1",
                password: "test",
                role: Role.PRODUCTOR,
                location: {
                    type: "Point",
                    coordinates: [0, 0]
                }
            })
            .expect(201)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                username: expect.any(String),
                location: expect.any(Object),
            })
        );
    });

    it("should show a productor", async function() {
        const user = await User.createFake();
        const productor = await Productor.createFake();

        const res = await supertest(app)
            .get('/api/productors/' + productor._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                username: expect.any(String),
                location: expect.any(Object),
            })
        );

    });


    it("shouldn't update a productor as not me", async function() {
        const user = await User.createFake();
        const productor = await Productor.createFake();

        const res = await supertest(app)
            .put('/api/productors/' + productor.id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                username: "Productor 2",
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should update a productor as me", async function() {
        const productor = await Productor.createFake();

        const res = await supertest(app)
            .put('/api/productors/' + productor.id)
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                username: "Productor 2",
            })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                username: expect.any(String),
                location: expect.any(Object),
            })
        );
    });

    it("shouldn't delete a productor as not me", async function() {
        const user = await User.createFake();
        const productor = await Productor.createFake();

        const res = await supertest(app)
            .delete('/api/productors/' + productor.id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should delete a productor as me", async function() {
        const productor = await Productor.createFake();

        const res = await supertest(app)
            .delete('/api/productors/' + productor.id)
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .expect(204)

        expect(res.body).toEqual({});
    });


    it("should find productors by location", async function() {

        const user = await User.createFake();
        const productor = await Productor.createFake();
        const productorFar = await Productor.createFake({
            location: {
                type: "Point",
                coordinates: [89, 89]
            }
        });

        expect(await Productor.countDocuments()).toBe(2);

        const res = await supertest(app)
            .get('/api/productors')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .query({
                location: "0.001,0.001",
                distance: 10000
            })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body.length).toBe(1);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: productor.id,
                    distance: 157.42862037304747,
                })
            ])
        );

    });
});

afterAll(async function() {
    await mongoose.disconnect();
});