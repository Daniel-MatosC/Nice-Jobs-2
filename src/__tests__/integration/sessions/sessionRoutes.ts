import { mockedPremiunLogin, mockedUserPremium } from './../../mocks/index';
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";


describe("/login", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        await request(app).post('/users').send(mockedUserPremium)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /login -  should be able to login with the user",async () => {
        const response = await request(app).post("/login").send(mockedPremiunLogin);
        
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
     
    })

    test("POST /login -  should not be able to login with the user with incorrect password or email",async () => {
        const response = await request(app).post("/login").send({
            email: "hassansilva@gmail.com",
            password: "12345671"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
        expect(response.body.message).toEqual("Incorrect email/password combination")
             
    })

})