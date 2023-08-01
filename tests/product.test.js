const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect('mongodb+srv://SanketMistry:sanket6934@clusternew.v8ubdgd.mongodb.net/SMS');
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /", () => {
    it("should return hello", async () => {
        const res = await request(app).get("/");
        expect(res.text).toBe("hello");
    });
});

describe("GET /student", () => {
    it("should return student data", async () => {
        const res = await request(app).get("/student");
        console.log(res.body)
        expect(res.body[0]).toHaveProperty('_id'); 
    });
});

describe("GET /auth", () => {
    it("should return authentication data", async () => {
        const res = await request(app).get("/auth");
        expect(res.body.statusCode).toBe(200);
    });
});