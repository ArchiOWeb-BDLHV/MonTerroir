import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";
import Review from "../app/models/review.js";
import { cleanUpDatabase } from "./utils.js";
import Productor from "../app/models/productor.js";
import User from "../app/models/user.js";


describe('GET all reviews', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });

    it("shouldn't list all reviews as not logged", async function() {

        const res = await supertest(app)
            .get('/api/reviews/')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should list all reviews from a productor", async function() {
        const productor = await Productor.createFake();
        const user = await User.createFake();

        const res = await supertest(app)
            .get('/api/productors/' + productor._id + '/reviews')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).toEqual(
            expect.objectContaining({
                data: expect.objectContaining({
                    reviews: expect.any(Array),
                }),
            })
        );
    });

});

afterAll(async() => {
    await mongoose.disconnect();
});