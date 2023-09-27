const mongoose = require('mongoose')
const mongouri = "mongodb+srv://crybaby0:qnlDY078tpVZW5hs@cluster0.z0vktat.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () => {
     await mongoose.connect(mongouri) //.then((res)=>console.log(res)).catch((rej)=>console.log(rej))
     console.log("connected")
    
}
module.exports = connectToMongo