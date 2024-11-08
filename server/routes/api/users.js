const router = require("express").Router();
const { User, validate } = require("../../models/User");
const bcrypt = require('bcryptjs');

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
		if (!users) {
            return res.status(404).send({ message: "User was not found" });
        }
        res.status(200).send(users);
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.put("/:id", async (req, res) => {
    try {
        const users = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
		if (!users) {
            return res.status(404).send({ message: "User was not found" });
        }
        res.status(200).send(users);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});



router.delete("/:id", async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
		if (!users) {
            return res.status(404).send({ message: "User was not found" });
        }
        res.status(200).send(`User is deleted. Goodbye ${users.name}!!`);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;
