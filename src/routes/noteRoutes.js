const express = require("express");
const { createNote, deleteNote, updateNote, getNotes } = require("../controllers/noteController");
const noteRouter = express.Router();
const auth=require("../middlewares/auth")

noteRouter.get("/",auth,getNotes);

noteRouter.post("/create",auth,createNote);

noteRouter.delete("/:id",auth,deleteNote);

noteRouter.put("/:id",auth,updateNote);

module.exports=noteRouter;