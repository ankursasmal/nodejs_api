let express=require('express');
require('dotenv').config()

 const router = require('./router/rout');
let app=express();
const PORT=process.env.PORT;
 
app.use(express.json());
app.use(router);

app.listen(PORT,()=>{
    console.log(`server run :${PORT}`)
})