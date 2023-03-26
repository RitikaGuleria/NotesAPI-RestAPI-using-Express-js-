const noteModel= require("../models/note");

const createNote=async(req,res)=>{

    console.log(req);

    const title= req.body.title;
    const description=req.body.description;

    const newNote=new noteModel({
        title:title,
        description:description,
        userId: req.userId
    });
    try {
        await newNote.save();
        return res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const updateNote= async (req,res)=>{
    const id = req.params.id;
    const title= req.body.title;
    const description= req.body.description;
    const newNote={
        title:title,
        description:description,
        userId:req.userId
    }
    try {
        await noteModel.findByIdAndUpdate(id,newNote,{new : true});
         return res.status(200).json(newNote);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const deleteNote=async(req,res)=>{
    const id=req.params.id;
    try {
        
        const note= await noteModel.findByIdAndRemove(id);
        return res.status(202).json(note);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const getNotes=async(req,res)=>{
    try {
        const notes=await noteModel.find({userId:req.userId});
        return res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

module.exports={createNote,updateNote,deleteNote,getNotes};