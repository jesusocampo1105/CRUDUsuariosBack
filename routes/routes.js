const router = require("express").Router();
const users  = require("../model/schema");
const jwt = require("jsonwebtoken");

router.get("/get/users", async (req, res) => {
  try{
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } catch (error){
    res.json(error);
  }
  });

  router.post("/new/user", async (req, res) => {
      const newUser = new users({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
      });
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, "secretkey")
    res.status(200).json({token})
    })

    router.post("/login", async (req, res) =>{
      console.log("Estoy en la validacion")
      const {username, password} = req.body;
      const user = await users.findOne({username})
      if(!user) return res.status(401).send("El nombre de usuario no existe");
      if(user.password !== password) return res.status(401).send("Contraseña errada");

      const token = jwt.sign({_id: user._id}, "secretkey");
      return res.status(200).json({token});
    })



    router.put("/new/user/:id", async (req, res) => {
      try{
        const updateUser = await users.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json("Usuario actualizado");
      } catch (error){
        res.json(error);
      }
      });


      router.delete("/new/user/:id", async (req, res) => {
        try{
          const deleteUser = await users.findByIdAndRemove(req.params.id);
          res.status(200).json("Usuario eliminado");
        } catch (error){
          res.json(error);
        }
        });


  module.exports = router;

  function verifyToken(req, res, next){
    if (!req.headers.authorization){
      return res.status(401).send("Acceso no permitido");
    }
    const token = req.header.authorization.split(" ")[1]
    if(token === "null"){
      return res.status(401).send("Acceso no permitido");
    }
    const payload = jwt.verify(token, "secretkey")
    req.userId = payload._id;
    next();
  }
