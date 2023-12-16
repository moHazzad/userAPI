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
            message: 'Student is created successfully',
            data: result,
          });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
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
              .json({ success: false, message: 'No Students found' });
          } else {
            res.status(200).json({
              success: true,
              message: 'student data are retrieved',
              data: users,
            });
          }
    } catch (err) {
        console.log(err);
    }
}

const singleUserById = async(req: Request, res: Response)=>{
    const userId = parseInt(req.params.userId)
    console.log(userId,'from cosol');
    try {
        const user = await userService.getSingleUserById(userId)
        if (!user) {
            return res
              .status(404)
              .json({ success: false, message: 'No Student found' });
          } else {
            res.status(200).json({
              success: true,
              message: 'single student data retrieved',
              data: user,
            });
          }
        
    } catch (err) {
        console.log(err);
    }

}

export const createUserController = {
    createUser,
    allUsers,
    singleUserById
}