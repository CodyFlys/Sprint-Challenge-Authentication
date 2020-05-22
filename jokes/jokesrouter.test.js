const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const Users = require("../auth/auth-model");

describe("joke endpoint tests", () => {
  // afterEach(async () => {
  //   await db("users").truncate();
  // });
  it("GET /jokes type json test", async () => {
    await supertest(server)
      .get("/api/jokes")
      .then(res => {
        expect(res.type).toBe("application/json");
      })
      
  });

  it("expects 400 not authorized", async () => {
    await supertest(server)
      .get("/api/jokes")
      .then(res => {
        expect(res.statusCode).toBe(400);
      })
      
  });
  
});