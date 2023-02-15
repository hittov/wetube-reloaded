import express from "express";

const PORT = 4000;

const app  = express();

const handleHome = (req, res) => {
    return res.send("<h1>Home</h1>");
};
const handleLogin = (req, res) => {
    return res.send("login");
}

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListeing = () => console.log(`Server listenting on port http://localhost:${PORT} ✔`);

app.listen(PORT, handleListeing);