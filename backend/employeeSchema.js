const mongoose = require("mongoose");
const empSchema = new mongoose.Schema({
  EmployeeId: Number,
  Name: String,
  Department: String,
  Position: String,
  Salary: Number
});
module.exports = mongoose.model("Employee", empSchema);
