const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    // Your connection strings 
    `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.frzne.mongodb.net/start_node`
  );
  console.log("mongo connect frome start_node");
}
