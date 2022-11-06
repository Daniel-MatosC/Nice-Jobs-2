// import request from "supertest";
// import app from "../../../app";
// import { DataSource } from "typeorm";
// import AppDataSource from "../../../data-source";
// import { mockedAdminLogin, mockedService } from "../../mocks";

// describe("/services", () => {
//   let connection: DataSource;

//   beforeAll(async () => {
//     await AppDataSource.initialize()
//       .then((res) => {
//         connection = res;
//       })
//       .catch((error) => {
//         console.log("Error during Data Source initialization", error);
//       });
//   });

//   afterAll(async () => {
//     await connection.destroy();
//   });

//   test("POST /services - Must be able to create a service", async () => {
//     const categories = await request(app).get("/categories");
//     // const users = await request(app).get("/users");
//     const adminLoginResponse = await request(app)
//       .post("/login")
//       .send(mockedAdminLogin);
//     mockedService.categoryId = categories.body[0].id;
//     // mockedService.user = users.body[0].id;
//     const response = await request(app)
//       .post("/services")
//       .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
//       .send(mockedService);

//     expect(response.body).toHaveProperty("id");
//     expect(response.body).toHaveProperty("createdAt");
//     expect(response.body).toHaveProperty("updatedAt");
//     expect(response.body).toHaveProperty("serviceName");
//     expect(response.body).toHaveProperty("serviceOwner");
//     expect(response.body).toHaveProperty("isActive");
//     expect(response.body).toHaveProperty("categoryId");
//     expect(response.body.categoryId).toHaveProperty("id");
//     expect(response.body.categoryId).toHaveProperty("name");
//     // expect(response.body).toHaveProperty("user");
//     // expect(response.body.user).toHaveProperty("id");
//     // expect(response.body.user).toHaveProperty("createdAt");
//     // expect(response.body.user).toHaveProperty("updatedAt");
//     // expect(response.body.user).toHaveProperty("name");
//     // expect(response.body.user).toHaveProperty("email");
//     // expect(response.body.user).toHaveProperty("password");
//     // expect(response.body.user).toHaveProperty("isPremium");
//     // expect(response.body.user).toHaveProperty("isActive");
//     // expect(response.body.user).toHaveProperty("isOffering");
//     // expect(response.body).toHaveProperty("description");
//     // expect(response.body.description).toHaveProperty("id");
//     // expect(response.body.description).toHaveProperty("serviceDescription");
//     // expect(response.body.description).toHaveProperty("serviceValue");
//     // expect(response.body.description).toHaveProperty("atuationArea");
//     expect(response.status).toBe(201);
//   });
// });
