import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import {
  mockedAdminLogin,
  mockedCategory,
  mockedPremiunLogin,
  mockedPremiunLoginTrue,
  mockedService,
  mockedServiceInvalidCategoryId,
  mockedUserPremium,
  mockedUserPremiumTrue,
} from "../../mocks";

describe("/services", () => {
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

  test("POST /services - Must be able to create a service", async () => {
    await request(app).post("/users").send(mockedUserPremiumTrue);
    await request(app).post("/categories").send(mockedCategory);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);
    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const category = await request(app).get("/categories");
    mockedService.category = category.body[0].id;
    mockedService.user = user.body[0].id;
    const response = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedService);

    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("serviceName");
    expect(response.body).toHaveProperty("serviceOwner");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("category");
    expect(response.body.category).toHaveProperty("id");
    expect(response.body.category).toHaveProperty("name");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("createdAt");
    expect(response.body.user).toHaveProperty("updatedAt");
    expect(response.body.user).toHaveProperty("name");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user).toHaveProperty("password");
    expect(response.body.user).toHaveProperty("isPremium");
    expect(response.body.user).toHaveProperty("isActive");
    expect(response.body.user).toHaveProperty("isOffering");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toHaveProperty("id");
    expect(response.body.description).toHaveProperty("serviceDescription");
    expect(response.body.description).toHaveProperty("serviceValue");
    expect(response.body.description).toHaveProperty("atuationArea");
    expect(response.status).toBe(201);
  });

  //   test("POST /services - should not be able to create a service that already exists", async () => {
  //     const categories = await request(app).get("/categories");
  //     const adminLoginResponse = await request(app)
  //       .post("/login")
  //       .send(mockedPremiunLogin);
  //     mockedService.category = categories.body[0].id;
  //     const response = await request(app)
  //       .post("/services")
  //       .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
  //       .send(mockedService);

  //     console.log("Teste", response.body);

  //     expect(response.body).toHaveProperty("message");
  //     expect(response.status).toBe(400);
  //   });

  test("POST /services - should not be able to create a service not being isOffering", async () => {
    const categories = await request(app).get("/categories");
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLogin);
    mockedService.category = categories.body[0].id;
    const response = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedService);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /services - should not be able to create service without an authentication", async () => {
    const categories = await request(app).get("/categories");
    mockedService.category = categories.body[0].id;
    const response = await request(app).post("/services").send(mockedService);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /services - should not be able to create property with invalid categoryId", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);
    const response = await request(app)
      .post("/properties")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedServiceInvalidCategoryId);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /services -  Must be able to list all services", async () => {
    const response = await request(app).get("/services");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});
