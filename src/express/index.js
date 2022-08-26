const session = require("express-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("../routes/auth.js");
const passportSetup = require("./passport.js");
const app = express();
const envVar = require("./env.js");
const mongoose = require("mongoose");
const Lift = require("../models/Lift");
const Workout = require("../models/Workout");

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log(err);
  });

//CREATE
// const Lift = mongoose.model('Lift', liftSchema);
// const newLift = new Lift({name: 'bench press', notes: 'keep elbos in', primary: ['chest'], secondary: ['tricep', 'glute']});
// newLift.save();
//READ
//Lift.find({name: 'curl'}).then(data=> {console.log(data)});
//Lift.findOne({name: 'bench press'}).then(data => console.log(data))
//Lift.findOne({version: {$gte: 1}}).then(data => console.log(data))
//UPDATE
//Lift.findOneAndUpdate({name: {$in: ['bench press', 'curl']}, {notes: 'focus on chest compression'}, {new: true, runValidators: true}).then(m => console.log(m)) <--returns a document (defaults to old document, unless you set new:true) - make sure to add runValidators
//Lift.updateOne({name: 'bench press'}, {notes: 'focus on chest compression'}).then(m => console.log(m)) <--does not return a document
//{$in: []} allows you to include multiple values
//Lift.update({name: {$in: ['bench press', 'curl']}, {notes: 'focus on chest compression'}).then(m => console.log(m))
//DELETE
//Lift.findOneAndDelete({name: 'bench press'}).then(m => console.log(m))
//Lift.remove(...) <--this will remove all instances of the given parameter

//instance method  --used for individual products
// liftSchema.methods.toggleName = async function(newName) {
//   this.name = newName;
//   this.save();
// }
//static method --primarily adding something to all product models
// liftSchema.statics.addAuthor = function () {
//  this.updateMany({}, {author: 'eric'}).then(m => console.log(m))
//}

//liftSchema.virtual('repsSets').get(function () {
// return `${this.lifts} ${this.last}`
//})

//liftSchema.pre('save', function(next) {console.log('this happens before save'); next()}) --either make it an async function because it returns a promise, or use the next function/parameter
//liftSchema.post('save', function(next) {console.log('this happens after save'); next()}) --either make it an async function because it returns a promise, or use the next function/parameter

const corsOptions = {
  origin: envVar.LOCAL_HOST,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

app.use("/auth", authRoute);
app.use(express.json());

app.listen(envVar.PORT, () => {
  console.log(`serving on port ${envVar.PORT}`);
});

app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", envVar.LOCAL_HOST);
  res.send({ name: "this is localhost:5000" });
});

app.get("/lift", async (req, res) => {
  const lifts = await Lift.find({});
  res.send(lifts);
});

app.get("/lift/:id", async (req, res) => {
  const { id } = req.params;
  const lift = await Lift.findById(id);
  res.send(lift);
});

app.put("/lift/:id", async (req, res) => {
  const {id} = req.params;
  const product = await Lift.findByIdAndUpdate(req.body.id, req.body, {runValidators: true, new: true})
  res.send(product);
})

app.delete("/lift/:id", async (req, res) => {
  const {id} = req.params;
  const product = await Lift.findByIdAndDelete(id)
  res.json(id);
})


app.post("/lift", async (req, res) => {
  try {
    const { name, creator, notes, primary, secondary } = req.body;
    const created = new Date();
    let newUrl = '/lift/';
    const newLift = new Lift({
      name: name,
      notes: notes,
      primary: primary,
      secondary: secondary,
      whoCreated: creator,
      whenCreated: created,
    });
    const addLift = await newLift
      .save()
      .then((m) => {console.log(`your lift saved - ${m}`);newUrl += m._id;console.log(newUrl)})
      .catch((e) => console.log(`failed - ${e}`));

    res.set("Access-Control-Allow-Origin", envVar.LOCAL_HOST);
    res.json({redirect: newUrl})
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});
