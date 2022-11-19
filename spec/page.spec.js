import supertest from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('pages', function() {
    it("should display error 404 for unknown route", async function() {
        const res = await supertest(app)
            .get('/404')
            .expect(404);
    });
});

afterAll(async() => {
    await mongoose.disconnect();
});