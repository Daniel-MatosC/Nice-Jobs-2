import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { mockedCategory, mockedCategory2 } from "../../mocks";

describe("/categories", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log("Error during Data Source initialization", error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /categories - Must be able to create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .send(mockedCategory);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /categories - should not be able to create a category that already exists", async () => {
    const response = await request(app)
      .post("/categories")
      .send(mockedCategory);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /categories - Must be able to list all categories", async () => {
    await request(app)
      .post("/categories")
      .send(mockedCategory2);
    const response = await request(app).get("/categories");
    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
  });

  test("GET /categories/:id/services - Must be able to list one category service", async () => {
    const category = await request(app).get("/categories");
    const response = await request(app).get(
      `/categories/${category.body[0].id}/service`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("properties");
  });

  test("GET /categories/:id/services - Should not be able to list services of a category with an invalid id", async () => {
    const response = await request(app).get(
      `/categories/13970660-5dbe-423a-9a9d-5c23b37943cf/services`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
