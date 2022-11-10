import mongoose from 'mongoose';
import app from '../app.js';
import supertest from 'supertest';
import { generateAccessToken } from '../app/http/controllers/AuthController.js';
import User from '../app/models/user.js';
import { cleanUpDatabase } from './utils.js';
import Product from '../app/models/product.js';
import Review from '../app/models/review.js';

describe('Test product review logic', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it('should list all reviews from product', async function() {
        const product = await Product.createFake();
        const user = await User.createFake();

        const res = await supertest(app)
            .get('/api/products/' + product._id + '/reviews')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('should create a review', async function() {
        const product = await Product.createFake();
        const user = await User.createFake();

        const res = await supertest(app)
            .post('/api/products/' + product._id + '/reviews')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                score: 5,
                message: 'test',
                author: user._id,
                product: product._id,
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('should not create a review as authenticated but without score', async function() {

        const product = await Product.createFake();
        const user = await User.createFake();

        const res = await supertest(app)
            .post('/api/products/' + product._id + '/reviews')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                message: 'test',
            })
            .expect(422)
            .expect('Content-Type', /json/);

    });

    it('should update a review', async function() {
        const product = await Product.createFake();
        const user = await User.createFake();

        const review = await Review.create({
            score: 5,
            message: 'test',
            author: user._id,
            product: product._id,
        });

        const res = await supertest(app)
            .put('/api/products/' + product._id + '/reviews/' + review._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                score: 5,
                message: 'test2',
                author: user._id,
                product: product._id,
            })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('shoud delete a review', async function() {
        const product = await Product.createFake();
        const user = await User.createFake();

        const review = await Review.create({
            score: 5,
            message: 'test',
            author: user._id,
            product: product._id,
        });

        const res = await supertest(app)
            .delete('/api/products/' + product._id + '/reviews/' + review._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(204)

        const review2 = await Review.findById(review._id);
        expect(review2).toBeNull();
    });


});

afterAll(async function() {
    await mongoose.disconnect();
});