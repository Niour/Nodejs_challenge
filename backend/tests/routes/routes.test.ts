import request from "supertest";
import { sequelize } from "../../src/models/database";
import { app } from "../../src/index";
import { getToken } from "../login.test";

describe("Test the Company path", () => {
  test("It should bring some Companies", async (done) => {
    request(app)
      .get("/company")
      .auth(getToken(), { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        console.log(res.body[0]);
        if (err) {
          return done(err);
        }
        expect(res?.body?.length).toBeGreaterThan(1);
        done();
      });
  });
  afterAll(async () => {
    await sequelize.close();
  });
});
