import mongoose from 'mongoose';
import app from '../app.js';
import supertest from 'supertest';
import { cleanUpDatabase } from './utils.js';
import User from '../app/models/user.js';
import { generateAccessToken } from '../app/http/controllers/AuthController.js';
import Productor from '../app/models/productor.js';
import path from 'path';

describe('GET /products', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });

    it("shouldn't list all products as unauthentificated", async function() {
        const res = await supertest(app)
            .get('/api/products/')
            .expect(401)
            .expect('Content-Type', /json/);
    });

    it("should list all products as authentificated", async function() {
        const user = await User.createFake();
        const res = await supertest(app)
            .get('/api/products/')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it("should create a product", async function() {
        const productor = await Productor.createFake();

        const res = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                "name": "test",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(201)
            .expect('Content-Type', /json/);

        console.log(res.body);
    });

    it("shouldn't create a product as authenticated but without name", async function() {

        const productor = await Productor.createFake();

        const res = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(422)
            .expect('Content-Type', /json/);

    });

    it('should show a product by id', async function() {
        const productor = await Productor.createFake();

        const product = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                "name": "test",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .get('/api/products/' + product.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('should update a product by id', async function() {

        const productor = await Productor.createFake();

        const product = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                "name": "test",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .put('/api/products/' + product.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                "name": "test2",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('should delete a product by id', async function() {

        const productor = await Productor.createFake();

        const product = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                "name": "test",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .delete('/api/products/' + product.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .expect(204)


        //check if the product is deleted in the database
        const product2 = await Productor.findById(product.body._id);
        expect(product2).toBeNull();

    });

    it("shouldn't delete a product by id as authenticated but not productor", async function() {

        const user = await User.createFake();

        const product = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                "name": "test",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("shouldn't update a product by id as authenticated but not productor", async function() {

        const user = await User.createFake();

        const product = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .send({
                "name": "test",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(403)
            .expect('Content-Type', /json/);
    });

    it("shouldn't delete a product by id as authenticated but not productor", async function() {

        const productor = await Productor.createFake();
        const user = await User.createFake();

        const product = await supertest(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + generateAccessToken(productor))
            .send({
                "name": "test",
                "description": "description",
                "price": 2,
                "category": "category"
            })
            .expect(201)
            .expect('Content-Type', /json/);

        const res = await supertest(app)
            .delete('/api/products/' + product.body._id)
            .set('Authorization', 'Bearer ' + generateAccessToken(user))
            .expect(403)
            .expect('Content-Type', /json/);

    });


});

afterAll(async() => {
    await mongoose.disconnect();
});