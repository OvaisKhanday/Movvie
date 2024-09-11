import { describe, expect, it, afterEach } from "@jest/globals";
import request from "supertest";
import { app, server } from "../../src/app";
import exp from "constants";

describe("ROUTE: /bookmark/all", () => {
  afterEach(() => {
    server.close();
  });

  it("unauthorized user should not get bookmark list", async () => {
    const resp = await request(app).get("/bookmark/all");
    expect(resp.statusCode).toEqual(401);
  });

  it("should return 400 if page is invalid", async () => {
    const resp = await request(app).get("/bookmark/all?page=abc");
    expect(resp.statusCode).toEqual(400);
  });

  it("should return 401 if page is valid but user unauthenticated", async () => {
    const resp = await request(app).get("/bookmark/all?page=34");
    expect(resp.statusCode).toEqual(401);
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

  it("should get the list of bookmarks", async () => {
    const resp = await request(app).get("/bookmark/all").set("Cookie", cookies);
    expect(resp.statusCode).toEqual(200);
  });
});

describe("DELETE bookmark", () => {
  it("should return 400 if id not present", async () => {
    const resp = await request(app).delete("/bookmark/delete");
    expect(resp.statusCode).toEqual(400);
  });
  it("should not delete bookmark, if user unauthenticated and id is provided", async () => {
    const resp = await request(app).delete("/bookmark/delete?id=12");
    expect(resp.statusCode).toEqual(401);
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

  it("should return 404, if media not found", async () => {
    const resp = await request(app).delete("/bookmark/delete?id=0").set("Cookie", cookies);
    expect(resp.statusCode).toEqual(404);
    expect(resp.notFound).toEqual(true);
  });
});
