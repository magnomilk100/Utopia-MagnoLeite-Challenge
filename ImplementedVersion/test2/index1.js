const assert = require("chai").assert;

const database = (() => {
  const _database = {
    621: { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
    123: { id: 123, name: "FriendNo1", friends: [621, 631] },
    251: { id: 251, name: "SecondBestFriend", friends: [621] },
    631: { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
  };

  const getUser = (id) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        _database[id] ? res(_database[id]) : rej(new Error("not_found"));
      }, 300);
    });

  const listUserIDs = () => Promise.resolve([621, 123, 251, 631]);

  return { getUser, listUserIDs };
})();

const expected = [
  {
    id: 621,
    name: "XxDragonSlayerxX",
    friends: [
      { id: 123, name: "FriendNo1", friends: [621, 631] },
      { id: 251, name: "SecondBestFriend", friends: [621] },
      { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
    ],
  },
  {
    id: 123,
    name: "FriendNo1",
    friends: [
      { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
      { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
    ],
  },
  {
    id: 251,
    name: "SecondBestFriend",
    friends: [{ id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] }],
  },
  {
    id: 631,
    name: "ThirdWh33l",
    friends: [
      { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
      { id: 123, name: "FriendNo1", friends: [621, 631] },
      { id: 251, name: "SecondBestFriend", friends: [621] },
    ],
  },
];

const validate = (result) => {
  try {
    assert.deepEqual(result, expected);
    console.log("Success");
  } catch (e) {
    console.error("Failed", e);
  }
};

const generateFriendshipRelation = async () => {
  // new root array
  let userList = [];

  const userIds = await database.listUserIDs();

  for (let userIndex = 0; userIndex < userIds.length; userIndex++) {
    const userId = userIds[userIndex];

    const userRecord = await database.getUser(userId);
    const user = {
      id: userRecord.id,
      name: userRecord.name,
      friends: []
    }

    for (let friendIndex = 0; friendIndex < userRecord.friends.length; friendIndex++) {
      const friendId = userRecord.friends[friendIndex];
      const friendRecord = await database.getUser(friendId);
      user.friends.push(friendRecord);
    }
    userList.push(user);
  }
  
  return userList;
};

// implement a method to create this result
generateFriendshipRelation().then(
  (result) => { 
    console.log(JSON.stringify(result));
    validate(result);
  }
);

// implement a method to create this result
//const result = [];

// At the end call validate
//validate(result);