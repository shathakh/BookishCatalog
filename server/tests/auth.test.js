const request = require("supertest");
const app = require("../src/app.js");

const AuthTests = () => {
  test("respond with json containing validation error /email is required/", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "555ahmed" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.message[0]).toBe("password is a required field");
  });
  test("respond with json containing validation error /email is not valid /", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "555ahmed", password: "123456" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message[0]).toBe("email must be a valid email");
  });
  test("respond with json containing validation error /password is required/", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "555ahmed@gmail.com" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message[0]).toBe("password is a required field");
  });
  test("respond with json containing error /no such email/", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "555ahmed@gmail.com", password: "123456788" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message).toBe("Wrong Email Or Password");
  });
  test("respond with json containing error /wrong password/", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "ahmed@gmail.com", password: "123456788" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message).toBe("Wrong Email Or Password");
    expect(response.headers["set-cookie"]).toBeUndefined();
  });
  test("respond with json containing /successful login/", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "ahmed@gmail.com", password: "123456" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.msg).toBe("logged in successfully");
  });

  test("respond with json containing validation error /password is required/", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({ email: "sally@gmail.com" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message[0]).toBe("password is a required field");
  });
  test("respond with json containing validation error / email is required/", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({ password: "1234585hcf" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message[0]).toBe("email is a required field");
  });
  test("respond with json containing validation error / firstName is required/", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        password: "1234585hcf",
        email: "shahhd@gmail.com",
        lastName: "khaled",
      })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message[0]).toBe("firstName is a required field");
  });
  test("respond with json containing validation error / lastName is required/", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        password: "1234585hcf",
        email: "shahhd@gmail.com",
        firstName: "khaled",
      })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message[0]).toBe("lastName is a required field");
  });
  test("respond with json containing validation error /email must be valid/", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        password: "1234585hcf",
        email: "shahhdcom",
        firstName: "khaled",
        lastName: "ali",
      })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message[0]).toBe("email must be a valid email");
  });
  test("respond with json containing error /email is already used/", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        firstName: "khaled",
        lastName: "ali",
        email: "ahmed@gmail.com",
        password: "1234585hcf",
      })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message).toBe("email is already used");
  });
  test("respond with json containing /successful signup/ ", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        email: "shatha3@gmail.com",
        password: "123aaa",
        firstName: "shatha",
        lastName: "Khaled",
      })
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body.msg).toBe("signed up successfully ");
  });
};

module.exports = AuthTests;
