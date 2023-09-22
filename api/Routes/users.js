const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//changepassword
router.put("/changepassword", async (req, res) => {
    try {
        const { userId, oldpassword, newpassword } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json("User not found");
        }

        const passwordMatch = await bcrypt.compare(oldpassword, user.password);

        if (!passwordMatch) {
            return res.json("Invalid");
        }

        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newpassword, salt);

        user.password = newPasswordHash;
        await user.save();

        res.status(200).json("Password updated successfully");
    } catch (err){
        console.error(err); 
        res.status(500).json(err);
    }
});


//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
            await Post.deleteMany({ email: user.email });
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
            } catch (err) {
            res.status(500).json(err);
            }
        } catch (err) {
        res.status(404).json("User not found!");
        }
    } else {
    res.status(401).json("You can delete only your account!");
}
});

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id:req.params.id });
        if (!user) { 
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Reset User Password
router.post('/resetpassword', async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ isValid: false });
        }
        const newPassword = user.name.slice(0, 4) + user.empcode;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ isValid: true, newPassword });
    }
    catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'An error occurred while resetting the password.' });
    }
})
module.exports = router;