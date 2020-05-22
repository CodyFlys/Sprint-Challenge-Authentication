const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("register endpoint tests", () => {
  // afterEach(async () => {
  //   await db("users").truncate();
  // });
    it("POST /register new user", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send({ username: "jorroo", password: "woodss" })
        .then(res => {
          expect(res.statusCode).toBe(201);
        });
    });
    it("POST /register return with JSON", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send({ username: "joroson", password: "123" })
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });
});

describe("login endpoint tests", () => {
  afterEach(async () => {
    await db("users").truncate();
  });
  it('will login to existing user', async () => {
    const data = {username: "jorroo", password: "woodss"}
    const res = await supertest(server).post("/api/auth/login").send(data)
    expect(res.statusCode).toBe(200);
  })
  it('returns 401 if username does not exist anywhere', async () => {
    const data = {username: "jorosondoesnotexist", password: "123"}
    const res = await supertest(server).post("/api/auth/login").send(data)
    expect(res.statusCode).toBe(401);
  })
});