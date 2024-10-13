const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    // Your connection strings 
    `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@roie.i6xor.mongodb.net/easylarning`
    // `mongodb+srv://roie:Aa123456@roie.i6xor.mongodb.net/easylarning`
  );
  console.log("mongo connect frome start_node");
}
