
const { Router } = require('express');
const { Cart, Users, Classes, PurchasedClass } = require('../../db');
const { default: mongoose } = require('mongoose');

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

    res.status(200).json(updatedCart);
})

router.post("/purchased", async(req,res) => {
    const userId = req.body.userId;
    const classId = req.body.classId;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const userPurchase = await PurchasedClass.findOne({user: userId}).session(session);
        const classAlreadyPurchased = userPurchase && userPurchase.class.includes(classId);
        if(classAlreadyPurchased){
            return res.json({
                message: "Class already purchased"
            })
        }
        const classInfo = await Classes.findById(classId).session(session);
        if (!classInfo) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Class not found" });
        }

        if (classInfo.availableSeats <= 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "No available seats" });
        }
        const filter = { user: userId };
        const update = { $addToSet: { class: classId } };
        const options = { upsert: true, new: true };
        const updatedCart = await PurchasedClass.findOneAndUpdate(filter, update, options).session(session);
        const classUpdate = await Classes.findByIdAndUpdate(classId, {
            $inc: { totalEnrolled: 1, availableSeats: -1 }
        }, { new: true }).session(session);
    
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({updatedCart, classUpdate});
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

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

router.delete('/delete-cart-item/:id', async(req,res) => {
    const classId = req.params.id;
    const userId = req.body.userId;
    console.log(classId,userId)
    try{
        const filter = {user: userId};
        const update = {$pull: {class: classId}};
        const option = { new:true }
    
        const updatedcart = await Cart.findOneAndUpdate(filter,update,option);
        if(!updatedcart){
            return res.status(404).json({ message: "Cart not found"})
        }
        res.status(200).json(updatedcart)

    }catch(err){
        console.error("Error updating cart", err);
        res.status(500).json({ message: "Internal Server error "})
    }
})

module.exports = router;