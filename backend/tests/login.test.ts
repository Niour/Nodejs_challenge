import request from "supertest";
import fs from "fs";
import { app } from "../src/index";

export const getToken = (): string => fs.readFileSync("./jestToken").toString();

describe("first test for Jest", () => {
  test("Just a test", async () => {});
});

beforeAll(async (done) => {
  request(app)
    .post("/login")
    .send({ username: "Nikos", password: "123" })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      fs.writeFileSync("./jestToken", res.body.token);
      done();
    });
});
