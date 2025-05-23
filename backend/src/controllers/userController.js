const UserModel = require('../models/userModel')
exports.getAllUsers = async (req, res) => {
    try{
        const users = await UserModel.find()
        res.status(200).json(users)
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
}