import { describe, expect, it, afterEach } from "@jest/globals";
import { app, server } from "../src/app";
import request from "supertest";

describe("/ get call", () => {
  afterEach(() => {
    server.close();
  });
  it("GET /", async () => {
    const resp = await request(app).get("/");
    expect(resp.status).toBe(200);
  });
});
