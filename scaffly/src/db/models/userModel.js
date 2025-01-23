const { database } = require("../config/config");

class UserModel {
  static collection() {
    return database.collection("users");
  }
}

export default UserModel;
