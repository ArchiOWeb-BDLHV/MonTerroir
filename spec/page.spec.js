import supertest from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('pages', function() {
    it("should redirect page 404 to the documentation", async function() {
        const res = await supertest(app)
            .get('/404')
            .expect(404);
    });
});

afterAll(async() => {
    await mongoose.disconnect();
});