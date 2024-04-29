const mongoose = require('mongoose');
const configureDB = async() =>{



try{
    const db= await mongoose.connect(process.env.DB_URL)
    console.log('connected to db');
}catch(err) {
    console.log(err);
}
}
// mongoose.connect('mongodb://127.0.0.1:27017/task-management')
// .then(() =>{
//     console.log('connected to db');
// }).catch((err) =>{
//     console.log('err connecteng to db',err);
// })
// }
module.exports= configureDB
