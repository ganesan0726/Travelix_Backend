import express from "express";
import cors from "cors";
import mysql from "mysql";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);

app.use(
  express.json({
    limit: "50mb",
  }),
);

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "vcentry",
  password: "test@123",
  database: "travelix",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("MySql Database connected with Nodejs");
  }
});

const executeQuery = (sqlQuery, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

app.get("/", (req, res) => {
  res.status(200).send("API Server is up and Running");
});

// Destination
// Add destinations = Post Method
app.post("/api/upload/destination", async (request, response) => {
  const data = request.body;

  try {
    const sqlQuery = `INSERT INTO ganesan_destinations (destinationName, destinationImage, destinationCount) values (?, ?, ?)`;
    const result = await executeQuery(sqlQuery, [
      data.destinationName,
      data.destinationImage,
      data.destinationCount,
    ]);

    response.status(200).send({
      message: "Destination has been uploaded",
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
  console.log(
    `Response Status : ${response.statusCode} & Response Message : ${response.statusMessage}`,
  );
});

//Get Destinations - Show ALl detinations.

//Search Destination - http://localhost:4000/api/list/destination?destinationName=india
app.get("/api/list/destination", async (request, response) => {
  let sqlQuery;
  const destName = request.query.destinationName;
  if (destName == undefined || destName == "") {
    sqlQuery = "SELECT * FROM ganesan_destinations";
  } else {
    sqlQuery = `SELECT * FROM ganesan_destinations WHERE destinationName='${destName}'`;
  }
  try {
    const result = await executeQuery(sqlQuery, []);

    response.status(200).send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
  console.log(
    `Response Status : ${response.statusCode} & Response Message : ${response.statusMessage}`,
  );
});

// Delete destination
app.delete("/api/delete/destination/:id", async (request, response) => {
  const id = request.params.id;

  if (!Number.isInteger(parseInt(id))) {
    return response.status(400).json({ error: "Invalid ID" });
  }

  try {
    const sqlQuery = "DELETE FROM ganesan_destinations WHERE id = ?";
    const result = await executeQuery(sqlQuery, [id]);

    if (result.affectedRows > 0) {
      response
        .status(200)
        .send({ message: "Destination deleted successfully!" });
    } else {
      response.status(404).send({ error: "Destination not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
  console.log(
    `Response Status : ${response.statusCode} & Response Message : ${response.statusMessage}`,
  );
});

// Hotels
// Add hotels = Post Method
app.post("/api/upload/hotelLists", async (request, response) => {
  const data = request.body;

  try {
    const sqlQuery = `INSERT INTO ganesan_hotelsList (hotelName, hotelLocation, hotelStayCount, hotelWashRoom, hotelBedCount, hotelPrice, hotelImage) values (?, ?, ?, ?, ?, ?, ?)`;
    const result = await executeQuery(sqlQuery, [
      data.hotelName,
      data.locationName,
      data.stayCount,
      data.washRoomCount,
      data.bedCount,
      data.price,
      data.hotelImage,
    ]);

    response.status(200).send({
      message: "Hotel List has been uploaded",
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
  console.log(
    `Response Status : ${response.statusCode} & Response Message : ${response.statusMessage}`,
  );
});

// Search Hotels : /api/list/hotelLists?hotelLocation==Mumbai,India
// Get Hotels = Get Method
app.get("/api/list/hotelLists", async (request, response) => {
  let sqlQuery;
  const location = request.query.hotelLocation;
  if (location == undefined || location == "") {
    sqlQuery = "SELECT * FROM ganesan_hotelsList";
  } else {
    sqlQuery = `SELECT * FROM ganesan_hotelsList WHERE hotelLocation='${location}'`;
  }
  try {
    const result = await executeQuery(sqlQuery, []);
    response.status(200).send(result);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
  console.log(
    `Response Status : ${response.statusCode} & Response Message : ${response.statusMessage}`,
  );
});

// Delete Hotels  = Delete Methods:
app.delete("/api/delete/hotelLists/:id", async (request, response) => {
  const id = request.params.id;

  if (!Number.isInteger(parseInt(id))) {
    return response.status(400).json({ error: "Invalid ID" });
  }

  try {
    const sqlQuery = "DELETE FROM ganesan_hotelsList WHERE id = ?";
    const result = await executeQuery(sqlQuery, [id]);

    if (result.affectedRows > 0) {
      response.status(200).send({
        message: "Hotel List hase been successfully Deleted",
      });
    } else {
      response.status(404).send({
        message: "Hotel List not found",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
  console.log(
    `Response Status : ${response.statusCode} & Response Message : ${response.statusMessage}`,
  );
});

//Server running Status :
const portNumber = 4000;
server.listen(portNumber, () => {
  console.log("Server is running on port: " + portNumber);
});
