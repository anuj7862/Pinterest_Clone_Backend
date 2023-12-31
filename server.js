const app = require('express')();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Server is up");
})


app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});