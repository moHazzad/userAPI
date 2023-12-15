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
export const createUserController = {
    createUser
}