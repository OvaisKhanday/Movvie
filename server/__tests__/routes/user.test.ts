import { describe, expect, it, afterEach } from "@jest/globals";
import { app, server } from "../../src/app";
import request from "supertest";

describe("/auth - user route", () => {
  afterEach(() => {
    server.close();
  });
  it("unauthorized user should not login in", async () => {
    const resp = await request(app).get("/auth/user");
    expect(resp.status).toBe(401); // not authorized
  });
});

describe("Login and GET user", () => {
  afterEach(() => {
    server.close();
  });
  let cookies = "";
  it("should login successfully", async () => {
    const resp = await request(app)
      .post("/auth/login")
      .send({ username: "test_user", password: "password" })
      .set("Accept", "application/json");
    expect(resp.status).toBe(200);
    cookies = resp.header["set-cookie"][0];
  });
  it("should get user details", async () => {
    const resp = await request(app).get("/auth/user").set("Cookie", cookies);
    expect(resp.statusCode).toEqual(200);
  });

  it("should not login in without username or email", async () => {
    const resp = await request(app).post("/auth/login").send().set("Accept", "application/json");
    expect(resp.status).toEqual(400);
    expect(resp.body).toHaveProperty("message", "Username or Email required");
  });
});
