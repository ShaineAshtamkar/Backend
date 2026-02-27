// const http = require('http')

// const server = http.createServer(function (request, response) {
//     response.writeHead(200, { 'Content-Type': 'text/plain' })
//     response.write('Hello, world')
//     response.end();
// })

// const port = 3000
// server.listen(port, function () {
//     console.log(`Node server created at port ${port}`)
// })
//______________________________________________________________________
// const http = require('http');
// const server = http.createServer((req, res) => {

//     console.log(`${req.method} ${req.url}`);


//     if (req.ur   l === "/") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("Welcome to my server!");
//     } else if (req.url === "/about") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("This is the about page");
//     } else if (req.url === "/contact") {
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("Contact me: email@example.com | +972-50-123-4567");
//     } else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("404 - Page not found");
//     }
// });

// const port = 3000;
// server.listen(port, () => {
//     console.log(`Server running at port : ${port}`);
// });

//________________________________________________________________

// const http = require("http");

// let users = [
//     { id: 1, name: "John Doe", email: "john@example.com" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com" },
// ];

// const server = http.createServer((req, res) => {
//     const send = (status, data) => {
//         res.writeHead(status, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(data));
//     };

//     // GET /api/users
//     if (req.method === "GET" && req.url === "/api/users") {
//         return send(200, users);
//     }

//     // GET /api/users/:id
//     if (req.method === "GET" && req.url.startsWith("/api/users/")) {
//         const id = Number(req.url.split("/")[3]);
//         const user = users.find((u) => u.id === id);
//         return user ? send(200, user) : send(404, { error: "User not found" });
//     }

//     // POST /api/users
//     if (req.method === "POST" && req.url === "/api/users") {
//         let body = "";
//         req.on("data", (chunk) => (body += chunk));
//         req.on("end", () => {
//             try {
//                 const data = JSON.parse(body || "{}");
//                 if (!data.name || !data.email) return send(400, { error: "name and email required" });

//                 const newUser = {
//                     id: users.length ? users[users.length - 1].id + 1 : 1,
//                     name: data.name,
//                     email: data.email,
//                 };

//                 users.push(newUser);
//                 return send(201, newUser);
//             } catch {
//                 return send(400, { error: "Invalid JSON" });
//             }
//         });
//         return;
//     }

//     send(404, { error: "Route not found" });
// });

// server.listen(3000, () => console.log("Server running on port 3000"));
//______________________________________________________________________
//express
// const express = require("express");

// const app = express();


// app.get("/", (req, res) => {
//     console.log(req.method, req.url);
//     res.send("Welcome to my server!");
// });


// app.get("/about", (req, res) => {
//     console.log(req.method, req.url);
//     res.send("This is the about page");
// });


// app.get("/contact", (req, res) => {
//     console.log(req.method, req.url);
//     res.send("Contact: shaine@example.com");
// });


// app.use((req, res) => {
//     console.log(req.method, req.url);
//     res.status(404).send("404 - Page not found");
// });


// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });
//____________________________________________________________________________
// server.js
const express = require("express");
const app = express();
const PORT = 3000;

let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

app.use(express.json());


app.get("/api/users", (req, res) => {
    res.set("Content-Type", "application/json");
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    res.set("Content-Type", "application/json");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
});


app.post("/api/users", (req, res) => {
    const { id, name, email } = req.body || {};

    res.set("Content-Type", "application/json");
    if (typeof id !== "number" || !name || !email) {
        return res.status(400).json({ error: "id (number), name, email required" });
    }

    users.push({ id, name, email });
    res.status(201).json({ message: "User added" });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));