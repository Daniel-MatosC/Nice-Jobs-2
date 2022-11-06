import { mockedPremiunLogin, mockedUserNotPremium, mockedUserPremium, mockedUserPremiumAndOffering } from './../../mocks/index';
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";

describe("/users", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /users -  Must be able to create a user",async () => {
        const response = await request(app).post('/users').send(mockedUserNotPremium)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("isPremium")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("isOffering")
        expect(response.body.name).toEqual("hassan")
        expect(response.body.email).toEqual("hassan@gmail.com")
        expect(response.body.isActive).toEqual(true)
        expect(response.body.isPremium).toEqual(false)
        expect(response.body.isOffering).toEqual(false)
        expect(response.status).toBe(201)     
    })

    test("POST /users -  Must be able to create a user Premiun and not Offering",async () => {
        const response = await request(app).post('/users').send(mockedUserPremium)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("isPremium")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("isOffering")
        expect(response.body.name).toEqual("hassan da silva")
        expect(response.body.email).toEqual("hassansilva@gmail.com")
        expect(response.body.isActive).toEqual(true)
        expect(response.body.isPremium).toEqual(true)
        expect(response.body.isOffering).toEqual(false)
        expect(response.status).toBe(201)     
    })
    test("POST /users -  Must be able to create a user Premiun and  Offering ",async () => {
        const response = await request(app).post('/users').send(mockedUserPremiumAndOffering)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("isPremium")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("isOffering")
        expect(response.body.name).toEqual("hassan da silva junior")
        expect(response.body.email).toEqual("hassansilvajunior@gmail.com")
        expect(response.body.isActive).toEqual(true)
        expect(response.body.isPremium).toEqual(true)
        expect(response.body.isOffering).toEqual(true)
        expect(response.status).toBe(201)     
    })
    test("POST /users -  should not be able to create a user that already exists",async () => {
        const response = await request(app).post('/users').send(mockedUserNotPremium)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })
    test("GET /users - Must be able to list all users",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveLength(3) 
    })
    test("GET /users -  should not be able to list users without authentication",async () => {
        const response = await request(app).get('/users')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)   
    })
    test("GET /users -  should be able to list users not being Premium",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserNotPremium);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${userLoginResponse.body.token}`)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveLength(3) 
    })

    test("DELETE /users/:id -  should not be able to delete user without authentication",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
    test("DELETE /users/:id -  Must be able to soft delete user",async () => {
        await request(app).post('/users').send(mockedUserPremium)

        const adminLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(204)
        expect(findUser.body[0].isActive).toBe(false)
    })
    test("DELETE /users/:id -  should not be able to delete user with isActive === false",async () => {
        await request(app).post('/users').send(mockedUserPremium)

        const adminLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("PATCH /users/:id -  should not be able to update user without authentication",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const userTobeUpdate = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).patch(`/users/${userTobeUpdate.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
    test("PATCH /users/:id -  should be able to update user",async () => {
        const newValues = {name: "Hassan Rodrigues", email: "hassanrodrigues@mail.com"}

        const admingLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValues)

        const userUpdated = await request(app).get("/users").set("Authorization", token)

        expect(response.status).toBe(200)
        expect(userUpdated.body[0].name).toEqual("Hassan Rodrigues")
        expect(userUpdated.body[0]).not.toHaveProperty("password")
    }) 
    test("PATCH /users/:id - should not be able to update isActive",async () => {
        const newValue = {isActive: false}

        const admingLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValue)
        expect(response.body.message).toBe("You can't update this field")
        expect(response.status).toBe(401)
    })
    test("PATCH /users/:id - should not be able to update id",async () => {
        const newValue = {id: "13970660-5dbe-423a-9a9d-5c23b37943cf"}

        const admingLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValue)
        expect(response.body.message).toBe("You can't update this field")
        expect(response.status).toBe(401)
    })
    test("PATCH /users/:id - should not be able to update user with invalid id",async () => {
        const newValues = {name: "hassan matos", email: "hassanmatos@mail.com"}

        const admingLoginResponse = await request(app).post("/login").send(mockedPremiunLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const response = await request(app).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization",token).send(newValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

})