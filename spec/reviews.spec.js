import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { generateAccessToken } from "../app/http/controllers/AuthController.js";
import Review from "../app/models/review.js";
import { cleanUpDatabase } from "./utils.js";

// GET /productors/id/reviews OR /products/id/reviews !!

describe('GET all reviews', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });

    it("shouldn't list all reviews as the conversation is not own ", async function() { // Changer
        const review = await Review.createFake();
        const review2 = await Review.createFake();

        const resRev = await supertest(app)
            .post('/api/reviews/')
            .set('Authorization', 'Bearer ' + generateAccessToken(review))
            .send({
                name: 'test',
                reviews: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);


        const res = await supertest(app)
            .get('/api/reviews/' + resRev.body._id + '/reviews') // Changer
            .set('Authorization', 'Bearer ' + generateAccessToken(review2))
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("should list all reviews as the conversation is own ", async function() { // Changer
        const review = await Review.createFake();

        const resRev = await supertest(app)
            .post('/api/reviews/')
            .set('Authorization', 'Bearer ' + generateAccessToken(review))
            .send({
                name: 'test',
                reviews: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);

    });

    it("should access to a message as the conversation is own but not creator", async function() { // Changer
        const review = await Review.createFake();
        let review2 = await Review.createFake();

        const resRev = await supertest(app)
            .post('/api/reviews/')
            .set('Authorization', 'Bearer ' + generateAccessToken(review))
            .send({
                name: 'test',
                reviews: [review2._id],
            })
            .expect(201)
            .expect('Content-Type', /json/);

        review2 = await Review.findById(review2._id);

        const res = await supertest(app)
            .get('/api/reviews/' + resRev.body._id + '/reviews') // Changer
            .set('Authorization', 'Bearer ' + generateAccessToken(review2))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("should create a message in a conversation", async function() { // Changer
        const review = await Review.createFake();

        const resRev = await supertest(app)
            .post('/api/reviews/')
            .set('Authorization', 'Bearer ' + generateAccessToken(review))
            .send({
                name: 'test',
                reviews: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .post('/api/reviews/' + resRev.body._id + '/reviews') // Changer
            .set('Authorization', 'Bearer ' + generateAccessToken(review))
            .send({
                content: 'test',
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it("shouldn't create a message in a conversation as the conversation is not own", async function() { // Changer
        const review = await Review.createFake();
        const review2 = await Review.createFake();

        const resRev = await supertest(app)
            .post('/api/reviews/')
            .set('Authorization', 'Bearer ' + generateAccessToken(review))
            .send({
                name: 'test',
                reviews: [],
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .post('/api/reviews/' + resRev.body._id + '/reviews') // Changer
            .set('Authorization', 'Bearer ' + generateAccessToken(review2))
            .send({
                content: 'test',
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

});



afterAll(async() => {
    await mongoose.disconnect();
});