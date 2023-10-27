#! /usr/bin/env node

//execute this by running node populatedb "mongoose-url-with double quotes"

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);

  const Item = require('./models/item');
  const Category = require('./models/category');
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createItems();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function createItems() {
    const allCategories = await Category.find().exec();

    const item1 = new Item({
        name: "RC tank",
        description: "A remote-controlled tank that can fire shots",
        category: allCategories[1]._id,
        price: 5000,
        quantity: 3,
    });

    const item2 = new Item({
        name: "RC robot",
        description: "A remote-controlled robot that can fire laser beams",
        category: allCategories[1]._id,
        price: 9000,
        quantity: 2,
    });
    await item1.save();
    await item2.save();

    console.log(`Added items`);
  }
  
 