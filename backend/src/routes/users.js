
const { Router } = require('express');
const { Cart, Users, Classes } = require('../../db');

const router = Router();

router.get("/", async (req, res) => {
    const response = await Users.find({});
    res.json(response)
})

router.post('/signup', async (req, res) => {
    const body = req.body;
    try {
        await Users.create({
            name: body.name,
            email: body.email
        })
        res.send("success")
    } catch {
        res.send("error")
    }
})

router.post("/cart", async (req, res) => {
    const userId = req.body.userId;
    const classId = req.body.classId;

    const user = await Users.findById(userId);
    if (!user) {
        return res.send("No user")
    }

    const filter = { user: userId };
    const update = { $addToSet: { class: classId } };
    const options = { upsert: true, new: true };


    const updatedCart = await Cart.findOneAndUpdate(filter, update, options);

    res.status(200).json(updatedCart); // Respond with the updated cart document



})

router.get("/cart/:id", async (req, res) => {
    const userId = req.params.id;
    const response = await Cart.findOne({ user: userId });
    console.log(response.class)
    const classes = await Classes.find({
        _id:{
            "$in":response.class
        }
    }).select("name description price")
    res.json(classes)

})

module.exports = router;