import mongoose from 'mongoose';

/**
 * Connect the server to a MongoDB database.
 * @param {string} url - connectionString of the DB to connect with.
 */
export default async function mongoConnection(url) {
  await mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
};
