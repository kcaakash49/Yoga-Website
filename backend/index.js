const express = require("express")
const z = require("zod");

const { Users, Classes } = require("./db")

const app = express();
const port = process.env.PORT || 3000;

const classSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().nonnegative("Price must be a non-negative number"),
    availableSeats: z.number().int().nonnegative("Available seats must be a non-negative integer"),
    videoLink: z.string().url("Invalid video link URL"),
    instructorName: z.string(),
    instructorEmail: z.string().email("Invalid email format"),
    totalEnrolled: z.number().int().nonnegative().default(0),
    reason: z.string().optional()
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello")
})

app.post("/new-class", async (req, res) => {
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



app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

