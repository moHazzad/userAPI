import { Request, Response } from "express";
import { userService } from "./user.service";
import UserValidationSchema from "./user.validation";


const createUser = async(req: Request, res: Response) =>{
    try {
        const {user} = req.body
        // parsing user data into zod 
        const zodParsedData = UserValidationSchema.parse(user);
        //saving to db
        const result = await userService.createUserInDb(zodParsedData)

        res.status(200).json({
            success: true,
            message: 'user is created successfully',
            data: result,
          });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'user went wrong',
            data: err,
          });
    }
}

const allUsers = async(req: Request, res: Response)=>{
    try {
        const users = await userService.getAllUserUserFromDb()
        if (!users) {
            return res
              .status(404)
              .json({ success: false, message: 'No users found' });
          } else {
            res.status(200).json({
              success: true,
              message: 'users data are retrieved',
              data: users,
            });
          }
    } catch (err) {
        console.log(err);
    }
}

const singleUserById = async(req: Request, res: Response)=>{
    const userId = parseInt(req.params.userId)
    try {
        const user = await userService.getSingleUserById(userId)
        if (!user) {
            return res
              .status(404)
              .json({ 
                success: false,
                message: 'No user found',
                error:{
                    code: 404,
                    details:"The user with the given ID was not found."                    
                }
             });
          } else {
            res.status(200).json({
              success: true,
              message: 'single user data retrieved',
              data: user,
            });
          }
        
    } catch (err) {
        console.log(err);
    }

}

const updateSingleUser = async(req: Request, res: Response)=>{
    const userId = parseInt(req.params.userId)
    const updateInfo = req.body
    try {
        const updateUser = await userService.updateUserInformation(userId, updateInfo)
        if (!updateUser) {
            return res
              .status(404)
              .json({ 
                success: false,
                message: 'No user found',
                error:{
                    code: 404,
                    details:"The user with the given id was not found."                    
                }
             });
          } else {
            res.status(200).json({
              success: true,
              message: 'user update successfully',
              data: updateUser,
            });
          }
        
    } catch (err) {
        console.log(err);
    }

}

export const createUserController = {
    createUser,
    allUsers,
    singleUserById,
    updateSingleUser
}