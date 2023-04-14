const Express = require("express");
const app = new Express();
const cors=require('cors')
require("dotenv").config();

const connectDB = require("./config/database");
const userRouter = require("./router/userRouter");
const actorRouter =require('./router/actorRouter')
const {notFoundRoute}=require("./middleware/notFoundRoute")
const { errorHandler } = require("./middleware/errorHandler");
const { PORT } = process.env;

connectDB();
app.use(cors());
app.use(Express.json());
app.use('/api/user',userRouter)
app.use('/api/actor',actorRouter)
app.use('/*',notFoundRoute);
app.use(errorHandler)


app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
