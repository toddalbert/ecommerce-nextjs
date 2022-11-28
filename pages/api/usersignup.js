import bcrypt from 'bcrypt'
import User from '../../models/User'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    // create user with hashed password
    const { email, password, fullName } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ email, password: hashedPassword, fullName })
    res.status(200).json({ success: 'Success' })
  } else {
    res.status(400).json({ error: 'This method is not allowed and/or invalid data' })
  }
}

export default connectDb(handler)
