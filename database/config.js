const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database running');
  } catch (err) {
    console.log(err);
    throw new Error('Error al conectar con la base de datos.')
  }
}

module.exports = {
  dbConnection
}
