const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set('strictQuery', false);

const app = express();
const PORT = 3001;

const routes = require("../Backend/routes/routes");
const connectionOptions ={ useUnifiedTopology: true,
    useNewUrlParser: true, useFindAndModify: false};


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://jesusocampo1105:Colombia2020**@users.dklmzh8.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connected successfully"))
.catch((err) => console.error(err));

app.use("/", routes);

app.listen(PORT, ()=>{
  console.log("mi puerto es " + PORT);
});
