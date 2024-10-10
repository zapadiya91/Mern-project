const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Employee = require("./model/employeeSchema");

mongoose
  .connect(
    "mongodb+srv://23030501006:3pfTrA8QizusIiYc@cluster0.wy2orca.mongodb.net/Emp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    console.log("Atlas Connected");

    app.get("/", async (req, res) => {
      const alldetails = await Employee.find();
      res.json(alldetails);
    });

    app.get("/emp/:id/", async (req, res) => {
      const empbyid = await Employee.findOne({ _id: req.params.id });
      res.json(empbyid);
    });

    app.delete("/empdelete/:id", async (req, res) => {
      const empdel = await Employee.deleteOne({ _id: req.params.id });
      res.json(empdel);
      console.log(empdel);
    });

    app.post("/empadd", async (req, res) => {
      const emp = new Employee();
      // const { EmployeeId, Name, Department, Position, Salary } = req.body;
      // console.log(Name);
      emp.EmployeeId = req.body.EmployeeId;
      emp.Name = req.body.Name;
      emp.Department = req.body.Department;
      emp.Position = req.body.Position;
      emp.Salary = req.body.Salary;
      const confirm = await emp.save();
      res.json({status:200})
      
    });

    app.put("/empedit/:id", async (req, res) => {
      const emp = await Employee.findOne({ _id: req.params.id });
      emp.Name = req.body.Name;
      emp.Department = req.body.Department;
      emp.Position = req.body.Position;
      emp.Salary = req.body.Salary;
      const updated = await emp.save();
      res.json(updated);
    });

    app.listen(8000, (e) => {
      console.log("server started");
    });
  });
