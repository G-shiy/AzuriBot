const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  idU: { type: String },
  idS: { type: String },
  registrador: {
    registredBy: { type: String, default: "null" },
    registredDate: { type: String, default: "null" },
    registred: { type: Boolean, default: false },
    registreds: { type: Number, default: 0 },
  },
  vip: {
    hasVip: { type: Boolean, default: false },
    date: { type: Number, default: 0 },
  },
  
  about: { type: String, default: "null" },
  reps: {
    size: { type: Number, default: 0 },
    lastRep: { type: String, default: "null" },
    lastSend: { type: String, default: "null" },
    time: { type: Number, default: 0 },
  },
  reminder: {
    list: { type: Array, default: [] },
    has: { type: Number, default: 0 },
  },
  ticket: {
    have: { type: Boolean, default: false },
    channel: { type: String, default: "null" },
    created: { type: String, default: "null" },
  },
  marry: {
    time: { type: Number, default: 0 },
    user: { type: String, default: "null" },
    has: { type: Boolean, default: false },
  },
  upvote: {
    count: { type: Number, default: 0 },
    cooldown: { type: Number, default: 0 },
  },
  infoCall: {
    lastCall: { type: Number, default: 0 },
    totalCall: { type: Number, default: 0 },
    lastRegister: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
