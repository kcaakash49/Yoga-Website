const { Router, application } = require('express');
const z = require("zod");
const { Classes } = require('../../db');

const router = Router();


const classSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().nonnegative("Price must be a non-negative number"),
    availableSeats: z.number().int().nonnegative("Available seats must be a non-negative integer"),
    videoLink: z.string().url("Invalid video link URL"),
    instructorName: z.string(),
    instructorEmail: z.string().email("Invalid email format"),
    totalEnrolled: z.number().int().nonnegative().default(0),
    reason: z.string().nullable().default(null)
});

const updateClassSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative("Price must be a non-negative number").optional(),
    availableSeats: z.number().int().nonnegative("Available seats must be a non-negative integer").optional(),
    videoLink: z.string().url("Invalid video link URL").optional(),
    instructorName: z.string().optional(),
    instructorEmail: z.string().email("Invalid email format").optional(),
    totalEnrolled: z.number().int().nonnegative().optional(),
    reason: z.string().optional()
});

//display approved status classes
router.get("/approved-classes", async (req, res) => {
    try{
        const allClasses = await Classes.find({status:"approved"});
        res.json({
            allClasses
        })

    }catch(err){
        res.json({
            msg:"Something happened",
            error: err
        })
    }
})

//adding new class
router.post("/new-class", async (req, res) => {
    const newClass = req.body;
    const result = classSchema.safeParse(newClass);
    if(!result.success){
        return res.status(400).json({
            message:"validation error",
            errors: result.error.issues.map(err => ({
                path: err.path.join('.'),
                message: err.message
            }))
            
        })
    }
    try {
        const response = await Classes.create(newClass)
        res.json({
            message: "Class added successfully",
            class: newClass
        })
    } catch (e) {
        res.json({
            message: "Something happened while adding class",
            error: e.message
        })
    }
})

//filter classes using instructor email
router.get("/allclasses/:email", async(req,res) => {
    const { email } = req.params;
    try{
        const response = await Classes.find({instructorEmail: email});
        if (response.length < 1){
            return res.status(200).json({
                msg:"No any classes by the instructor"
            })
        }
        res.json({
            response
        })

    }catch{
        res.json({
            msg: "Something happened"
        })
    }
})

//gives all classes without any filter
router.get("/allclasses", async (req, res) => {
    try{
        const allClasses = await Classes.find({});
        res.json({
            allClasses
        })

    }catch(err){
        res.json({
            msg:"Something happened",
            error: err
        })
    }
})

//updating class status and reason
router.put('/change-status/:id',async(req,res) => {
    const id = req.params.id;
    const { status, reason } = req.body;
    try{
        const response = await Classes.updateOne({_id : id}, {status: status, reason: reason})
        res.json({
            message: "Update successful",
            response
        })
    }catch(err){
        res.json({
            message: "Couldnot update",
            err
        })
    }
})

//get single class details
router.get('/:id', async(req,res) => {
    const id = req.params.id;
    try{
        const response = await Classes.findById(id);
        res.status(200).json(response)
    }catch{
        res.status(400).json({
            message: "Cannot find anything"
        })
    }
})

//update class details
router.put('/update-class/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const { success } = updateClassSchema.safeParse(body);
    if(!success){
        return res.status(400).json({
            message:"inputs not correct"
        })
    }
    console.log(body);
    try{
        const response = await Classes.updateOne({_id:id},body);
        res.json({
            message:"Update Successful"
        })
    }catch(err){
        res.json(err)
    }
})
module.exports =  router 