import UserModal from "../Modals/User.modal.js";
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    try {
        const {name, email, password} = req.body.userData;

        if(!name || !email || !password) return res.status(401).json({succes: false, message: "All fields are mandatory"})
        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword, "hashedpassword")
        const user = new UserModal(
            {
                name: name,
                email,
                password: hashedPassword
            })

            await user.save();
console.log(user, "user")
            return res.status(200).json({succes: true, message: "Account created successful"})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.userData;
        if(!email || !password) return res.status(401).json({succes: false, message: "All fields are mandatory"})

        const user = await UserModal.findOne({ email: email});

        if(!user) return res.status(401).json({ succes: false, message: "Email is wrong"})

        const isPasscorrect = await bcrypt.compare(password, user.password);

        if(!isPasscorrect) {
            return res.status(401).json({ succes: false, message: "Password is wrong" })

            const token = await Jwt.sign({ id: user._id}, process.env.JWT_SECRET)

            return res.status(200).json({ succes: true, message: "Login successful", user: {name: user.name, id: user._id}, token})
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}