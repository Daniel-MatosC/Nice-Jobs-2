import { User } from './../../../entities/user.entity';
import { Services } from './../../../entities/services.entity';
import {
  mockedCategory,
  mockedPremiunLogin,
  mockedPremiunLoginTrue,
  mockedSchedule,
  mockedScheduledateEmpty,
  mockedScheduledateInvalid,
  mockedScheduleHourEmpty,
  mockedScheduleHourInvalid,
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

  test("POST /schedules - should be able to create a schedule with date empty", async () => {
    const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
  
    mockedScheduledateEmpty.serviceId = services.body[0].id;
    mockedScheduledateEmpty.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedScheduledateEmpty);

    console.log(response.body)

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schedules - should be able to create a schedule with hour empty", async () => {
    const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
  
    mockedScheduleHourEmpty.serviceId = services.body[0].id;
    mockedScheduleHourEmpty.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedScheduleHourEmpty);

    console.log(response.body)

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schedules - should be able to create a schedule with hour invalid", async () => {
    const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
  
    mockedScheduledateInvalid.serviceId = services.body[0].id;
    mockedScheduledateInvalid.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedScheduledateInvalid);

    console.log(response.body)

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schedules - should be able to create a schedule with date invalid", async () => {
    const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLoginTrue);
    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const services = await request(app).get("/services");
  
    mockedScheduleHourInvalid.serviceId = services.body[0].id;
    mockedScheduleHourInvalid.userId = users.body[1].id;
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedScheduleHourInvalid);

    console.log(response.body)

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /schedules - should not be able to create a schedule if isOffering = false", async () => {
    const userLoginResponse = await request(app)
    .post("/login")
    .send(mockedPremiunLogin);
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

  test("GET /schedules/:id - Must be able to list one schedule by id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);

    const schedules = await request(app)
      .get("/schedules/")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);    

    const response = await request(app)
      .get(`/schedules/${schedules.body.schedules[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isDone");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body.user).toHaveProperty("name");

    expect(response.status).toBe(200);
  });
  test("GET /schedules/:id -should not be able to list one schedule by id invalid", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);

    const schedules = await request(app)
      .get("/schedules/")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);    

    const response = await request(app)
      .get(`/schedules/84a7fb28-400b-4adb-80ba-022850e1932a`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Schedule not found");
      expect(response.status).toBe(404);
  });
  test("GET /schedules/services/:id - Must be able to list schedules by service id ", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);

    const services = await request(app)
      .get("/services")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`); 
    
    const response = await request(app)
      .get(`/schedules/services/${services.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("date");
    expect(response.body[0]).toHaveProperty("hour");
    expect(response.body[0]).toHaveProperty("user");
    expect(response.body[0]).toHaveProperty("services");

  });
  test("GET /schedules/services/:id -should not be able to list schedules by service id  invalid", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedPremiunLoginTrue);

    const services = await request(app)
      .get("/services")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`); 
    
    const response = await request(app)
      .get(`/schedules/services/84a7fb28-400b-4adb-80ba-022850e1932c`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);


    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);

  });
});
