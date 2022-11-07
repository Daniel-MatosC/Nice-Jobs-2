import { User } from './../../../entities/user.entity';
import { Services } from './../../../entities/services.entity';
import {
  mockedCategory,
  mockedPremiunLogin,
  mockedPremiunLoginTrue,
  mockedSchedule,
  mockedScheduleInvalidHourLess8,
  mockedScheduleInvalidHourMore22,
  mockedScheduleInvalidServiceId,
  mockedService,
  mockedUserNotPremium,
  mockedUserPremium,
  mockedUserPremiumTrue,
} from "./../../mocks/index";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("/schedules", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    await request(app).post("/users").send(mockedUserPremiumTrue);
    await request(app).post("/users").send(mockedUserNotPremium);
    await request(app).post("/users").send(mockedUserPremium);
    
    const premiumLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLoginTrue);

    const users = await request(app).get("/users").set("Authorization", `Bearer ${premiumLoginResponse.body.token}`)
    
    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${premiumLoginResponse.body.token}`)
      .send(mockedCategory);
    const categories = await request(app).get("/categories").set("Authorization", `Bearer ${premiumLoginResponse.body.token}`)
    mockedService.category = categories.body[0].id;
    mockedService.user = users.body[0].id;
    const services = await request(app)
      .post("/services")
      .set("Authorization", `Bearer ${premiumLoginResponse.body.token}`)
      .send(mockedService);
    
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schedules - should be able to create a schedule", async () => {
    const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
  
    mockedSchedule.serviceId = services.body[0].id;
    mockedSchedule.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(201);
  });

  test("POST /schedules -  should not be able to create a schedule that already exists", async () => {
    const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
    
    mockedSchedule.serviceId = services.body[0].id;
    mockedSchedule.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /schedules -  should not be able to create a schedule with an invalid hour < 8", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
    mockedScheduleInvalidHourLess8.serviceId = services.body[0].id;
    mockedScheduleInvalidHourLess8.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedScheduleInvalidHourLess8);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schedules -  should not be able to create a schedule with an invalid hour > 18", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
   
    mockedScheduleInvalidHourMore22.serviceId = services.body[0].id;
    mockedScheduleInvalidHourMore22.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedScheduleInvalidHourMore22);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schedules -  should not be able to create a schedule with an invalid service id", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    
    mockedScheduleInvalidServiceId.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedScheduleInvalidServiceId);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schedules -  should not be able to create a schedule without authentication", async () => {
    const premiumLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLogin);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${premiumLoginResponse.body.token}`);
    const services = await request(app).get("/services");
    mockedSchedule.serviceId = services.body[0].id;
    mockedSchedule.userId = users.body[1].id;
    const response = await request(app).post("/schedules").send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /schedules - Must be able to list all schedules", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLogin);
    const response = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });
});
