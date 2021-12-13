const mongoose = require("mongoose");
const user = require("../Connections/user");
const { v4: uuidv4 } = require("uuid");
const hash = require("../Helpers/hash");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://appytreeAdmin:NyREofQzFdPONYIj@cluster0.gwomc.mongodb.net/appytree?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to DB!");
  } catch (error) {
    console.error(
      "Connection to Database could not be established. Reason=>\n",
      error
    );
    await mongoose.disconnect();
    server.close(() => {
      console.log("Due to Database connection error, Server Closed!");
    });
  }
};
const signup = async (email, password, role) => {
  try {
    await startServer();
    let uid = uuidv4();
    let passHash = await hash.hashPassword(password, 10);
    console.log(email, uid, passHash, role);
    let newUser = await user.AddUser(email, uid, passHash, role);
    if (newUser) {
      return newUser;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return "Could not add new user!";
  }
};
rl.question("Enter email: ", function (email) {
  rl.question("Enter password: ", function (password) {
    rl.question("Enter role: ", async (role) => {
      console.log(
        `Starting to create a new account with\nEmail: ${email};\nPassword: ${password};\nRole: ${role}`
      );
      await signup(email, password, role);
      rl.close();
    });
  });
});

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
