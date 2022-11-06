import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { cleanUpDatabase } from "./utils.js";


describe('GET /conversations', function() {
    beforeEach(async function() {
        await cleanUpDatabase();
    });
    it("shouldn't list all conversations as not authticated", async function() {
        const res = await supertest(app)
            .get('/conversations')
            .expect(401)
            .expect('Content-Type', /json/);
    });

});



afterAll(async() => {
    await mongoose.disconnect();
});