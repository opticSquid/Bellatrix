const user = require("../Schema/user");
const activeUser = require("../Schema/actieUser");
/**
 * @description This function is used to add new user to the DB.
 * @param {string} email
 * @param {string} uid
 * @param {string} password
 * @param {string} role
 * @returns {Promise<boolean>} Boolean value indicating wheather the user is added or not.
 */
const addUser = async (email, uid, password, role) => {
  try {
    let newUser = new user({
      Email: email,
      uid: uid,
      Password: password,
      Role: role,
    });
    await newUser.save();
    return true;
  } catch (err) {
    console.error("Error while adding new user", err);
    return false;
  }
};

/**
 * @description This function is used to find the user either by email or uid.
 * @param {string} email -  email of the user
 * @param {string} uid - uid of the user
 * @param {Object} required - object of the required fields
 * @returns {Promise<{Email:string,uid:string,Password:string,Role:string}>} Details of the users account
 */
const findUser = async (
  email = undefined,
  uid = undefined,
  required = undefined
) => {
  let project = required === undefined ? { __v: 0 } : { __v: 0, ...required };
  if (uid === undefined && email !== undefined) {
    const userDetail = await user.findOne({ Email: email }, project);
    return userDetail;
  } else if (email === undefined && uid !== undefined) {
    const userDetail = await activeUser.findOne({ uid: uid }, project);
    return userDetail;
  } else {
    return null;
  }
};
/**
 * @description This function is used to initialte an active session / login session for a user.
 * @param {string} uid - UID of the user
 * @param {string} ip - IP of the user
 * @param {string} ref_tokn - Refresh token of the user
 * @returns {Promise<boolean>} Boolean value indicating wheather the login session is registered or not.
 */
const addActiveUer = async (uid, ip, ref_tokn) => {
  try {
    let newSession = new activeUser({ uid: uid, IP: ip, Ref_Tkn: ref_tokn });
    await newSession.save();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
/**
 * @description This function is used to delete the active session of a user.
 * @param {string} uid - UID of the user
 * @returns {Promise<boolean>} Boolean value indicating wheather the active session is deleted or not.
 */
const deleteActiveUser = async (uid) => {
  let newSession = await activeUser.findOneAndDelete({ uid: uid });
  return newSession;
};

module.exports = {
  FindUser: findUser,
  InitiateSession: addActiveUer,
  TerminateSessoin: deleteActiveUser,
  AddUser: addUser,
};
