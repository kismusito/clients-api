const dotenv = require("dotenv");
const fs = require("fs");
const db = require("./dist/src/database");

// Load ENV variables
dotenv.config();

// Load Models
const { User } = require("./dist/src/auth/models/user.model.js");

// Connect to Mongo Database
db.default().then();

// Read The JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_seed/users.json`, "utf-8")
);

// Import Sample Data In DB
const importData = async () => {
  try {
    await User.create(users);
    console.log(`Data successfully imported`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData().then();
} else if (process.argv[2] === "-d") {
  deleteData().then();
}
