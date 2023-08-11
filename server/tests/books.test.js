const request = require("supertest");
const app = require("../src/app.js");
const dotenv = require("dotenv");

dotenv.config();
const { USER_TOKEN } = process.env;

const BookTests = () => {
  test("Books - GET - /api/book/:id respond with json containing error / unauthorized/", async () => {
    const response = await request(app).get("/api/book/1").expect(401);
    expect(response.body.message).toBe("unauthorized");
  });
  test("Books - GET - /api/book/:id respond with json containing validation error / id must be a number/", async () => {
    const response = await request(app)
      .get("/api/book/bb")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(400);
    expect(response.body.message[0]).toBe(
      'id must be a `number` type, but the final value was: `NaN` (cast from the value `"bb"`).'
    );
  });
  test("Books - GET - /api/book/:id respond with json containing error/unauthorized/", async () => {
    const response = await request(app)
      .get("/api/book/5")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(401);
    expect(response.body.message).toBe("unauthorized");
  });
  test("Books - GET - /api/book/:id respond with json containing books", async () => {
    const response = await request(app)
      .get("/api/book/1")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(200);
    expect(response.body.data.length).toBe(9);
  });

  test("searchBooks - GET - /api/book?searchText respond with json containing error / unauthorized/", async () => {
    const response = await request(app)
      .get("/api/book?searchText=woods")
      .expect(401);
    expect(response.body.message).toBe("unauthorized");
  });
  test("searchBooks - GET - /api/book?searchText respond with json containing no books", async () => {
    const response = await request(app)
      .get("/api/book?searchText=test")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(200);
    expect(response.body.data.count).toBe(0);
  });
  test("searchBooks - GET - /api/book?searchText respond with json containing books", async () => {
    const response = await request(app)
      .get("/api/book?searchText=woods")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(200);
    expect(response.body.data.count).toBe(1);
  });
  test("addBook - POST - /api/book respond with json containing error / unauthorized/", async () => {
    const response = await request(app)
      .post("/api/book")
      .send({
        title: "test",
        author: "test",
        description: "test",
        imageLink: "test",
      })
      .expect(401);
    expect(response.body.message).toBe("unauthorized");
  });
  test("addBook - POST - /api/book respond with json containing validation error / title is required/", async () => {
    const response = await request(app)
      .post("/api/book")
      .send({
        author: "test",
        description: "test",
        imageLink: "test",
      })
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(400);
    expect(response.body.message[0]).toBe("title is a required field");
  });
  test("addBook - POST - /api/book respond with json containing validation error / author is required/", async () => {
    const response = await request(app)
      .post("/api/book")
      .send({
        title: "test",
        description: "test",
        imageLink: "test",
      })
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(400);
    expect(response.body.message[0]).toBe("author is a required field");
  });
  test("addBook - POST - /api/book respond with json containing validation error / description is required/", async () => {
    const response = await request(app)
      .post("/api/book")
      .send({
        title: "test",
        author: "test",
        imageLink: "test",
      })
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(400);
    expect(response.body.message[0]).toBe("description is a required field");
  });
  test("addBook - POST - /api/book respond with json containing validation error / imageLink is required/", async () => {
    const response = await request(app)
      .post("/api/book")
      .send({
        title: "test",
        author: "test",
        description: "test",
      })
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(400);
    expect(response.body.message[0]).toBe("imageLink is a required field");
  });
  test("addBook - POST - /api/book respond with json containing book", async () => {
    const response = await request(app)
      .post("/api/book")
      .send({
        title: "test",
        author: "test",
        description: "test",
        imageLink: "test",
      })
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(201);
    expect(response.body.data.author).toBe("test");
  });
  test("deleteBook - DELETE - /api/book/:id respond with json containing error/unauthorized/", async () => {
    const response = await request(app).delete("/api/book/1").expect(401);
    expect(response.body.message).toBe("unauthorized");
  });
  test("deleteBook - DELETE - /api/book/:id respond with json containing error/book not found/", async () => {
    const response = await request(app)
      .delete("/api/book/30")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(400);
    expect(response.body.message).toBe("book not found");
  });
  test("deleteBook - DELETE - /api/book/:id respond with json containing book", async () => {
    const response = await request(app)
      .delete("/api/book/1")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(200);
    expect(response.body.msg).toBe("book deleted");
  });
  test("editBook - PUT - /api/book/:id respond with json containing error/unauthorized/", async () => {
    const response = await request(app).put("/api/book/1").expect(401);
    expect(response.body.message).toBe("unauthorized");
  });
  test("editBook - PUT - /api/book/:id respond with json containing error/book not found/", async () => {
    const response = await request(app)
      .put("/api/book/30")
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(400);
    expect(response.body.message).toBe("book not found");
  });
  test("editBook - PUT - /api/book/:id respond with json containing book", async () => {
    const response = await request(app)
      .put("/api/book/2")
      .send({
        title: "test",
        author: "test",
        description: "test",
        imageLink: "test",
      })
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(200);
    expect(response.body.data[0]).toBe(1);
  });
  test("editBook - PUT - /api/book/:id respond with json containing book", async () => {
    const response = await request(app)
      .put("/api/book/2")
      .send({
        title: "test2",
        author: "test2",
      })
      .set("Authorization", `Bearer ${USER_TOKEN}`)
      .expect(200);
    expect(response.body.data[0]).toBe(1);
  });
};
module.exports = BookTests;
