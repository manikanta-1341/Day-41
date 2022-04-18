const mongo = require("../shared/connect");

module.exports.hallDetails = async (req, res, next) => {
  try {
    const data = await mongo.db
      .collection("hall")
      .find({ status: "occupied" })
      .project({ _id: 0 })
      .toArray();
    // console.log("in hallDetails::",data)
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

module.exports.hallBooking = async (req, res, next) => {
  try {
    // console.log("in booking", req.params.id);
    const data = "";
    const rooms = await mongo.db
      .collection("rooms")
      .findOne({ room_id: parseInt(req.params.id) });
    if (!rooms.status) {
      // console.log("in if")
      await mongo.db
        .collection("rooms")
        .updateOne(
          { room_id: parseInt(req.params.id) },
          { $set: { status: "occupied" } }
        );
      data = await mongo.db
        .collection("hall")
        .updateOne(
          { room_id: parseInt(req.params.id) },
          { $set: { ...req.body, status: "occupied" } }
        );

      // console.log("in booking", rooms1);
    } else {
      res.send("Occupied ! /room/availability - check availability");
    }
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

module.exports.customerDetails = async (req, res, next) => {
  try {
    const data = await mongo.db
      .collection("hall")
      .find({ status: "occupied" })
      .project({ _id: 0, status: 0 })
      .toArray();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

module.exports.getRooms = async (req, res, next) => {
  try {
    const data = await mongo.db.collection("rooms").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
module.exports.emptyRooms = async (req, res, next) => {
  try {
    const data = await mongo.db
      .collection("rooms")
      .find({ status: { $exists: false } })
      .toArray();
    console.log("in emptyRoom", data);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
module.exports.createRoom = async (req, res, next) => {
  try {
    const data = await mongo.db.collection("rooms").insertOne(req.body);
    await mongo.db.collection("hall").insertOne({ room_id: req.body.room_id });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
module.exports.deleteRoom = async (req, res, next) => {
  try {
    const rooms = await mongo.db
      .collection("rooms")
      .find({ room_id: parseInt(req.params.id) })
      .toArray();
    // console.log("rooms",rooms)
    if (rooms[0].status) {
      // console.log("in if")
      await mongo.db
        .collection("rooms")
        .updateOne(
          { room_id: parseInt(req.params.id) },
          { $unset: { status: "" } }
        );
      const data = await mongo.db.collection("hall").updateMany(
        { room_id: parseInt(req.params.id) },
        {
          $unset: {
            name: "",
            date: "",
            start_time: "",
            end_Time: "",
            status: "",
          },
        }
      );
      // console.log("in delete",data)
      res.send(data);
    } else {
      res.send(`room_id : ${req.params.id} is unoccupied`);
    }
  } catch (err) {
    res.send(err);
  }
};
