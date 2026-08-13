const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../modules/User");

exports.register = [
    check('fullName')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters'),
    check("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password should be atleast 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password should contain atleast one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password should contain atleast one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password should contain atleast one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password should contain atleast one special character")
        .trim(),
    check("confirmPassword")
        .custom((value, { req }) => {
            if (value != req.body.password)
                throw new Error("Passwords do not match");
            return true;
        }),
    check('mobile')
        .notEmpty()
        .withMessage('mobile is required')
        .trim()
        .isLength({ min: 10 })
        .withMessage("mobile must be at 10 digits")
        .matches(/[0-9]/)
        .withMessage('Mobile can only contain digits'),
    check("gender")
        .notEmpty()
        .withMessage("Please select a user type")
        .isIn(["Male", "Female", "Other"])
        .withMessage("Invalud gender type"),
    (req, res, next) => {
        const user = { userType, fullName, email, mobile, dob, gender, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                "errors": errors.array().map(error => error.msg),
            });
        }

        bcrypt.hash(password, 12)
            .then(hashPassword => {
                const user = new User({ ...req.body, userType: "user", password: hashPassword });
                user.save()
                    .then((result) => {
                        return res.status(201).json(result);
                    }).catch((error) => {
                        return res.status(422).json({ "errors": error.errmsg });
                    });
            })
            .catch(error => {
                return res.status(422).json({ "errors": error });
            });
    }
];

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(422).json({ "errors": ['Invalid emial or password!!!'] });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(422).json({ "errors": ['Invalid emial or password!!!'] });
    res.status(201).json(user);
};

exports.getUser = async (req, res, next) => {
    const { _id } = req.params;
    console.log(_id);
    try {
        const user = await User.findById(_id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ errors: "Server Error" + err.errmsg });
    }
};


exports.updateUser = async (req, res, next) => {
    const { _id } = req.params;
    const { fullName, email, mobile, dob, gender } = req.body;

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({
                errors: ["User not found"]
            });
        }

        // Update only provided fields
        if (fullName !== undefined) user.fullName = fullName;
        if (email !== undefined) user.email = email;
        if (mobile !== undefined) user.mobile = mobile;
        if (dob !== undefined) user.dob = dob;
        if (gender !== undefined) user.gender = gender;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error(error);

        // Duplicate email/mobile
        if (error.code === 11000) {
            return res.status(409).json({
                errors: ["Email or mobile already exists"]
            });
        }

        res.status(500).json({
            errors: ["Server Error"]
        });
    }
};