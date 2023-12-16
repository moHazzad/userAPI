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

        if (!result) {
            return res
            .status(404)
            .json({
                success: false,
                message: 'user not created'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'user is created successfully',
                data: result,
              });
        }    
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
        res.status(500).json({
            success: false, 
            message: 'Error in retrieving user', 
            error: err
         });
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
        res.status(500).json({
            success: false, 
            message: 'Error retrieved  user', 
            error: err
         });
    }

}

// update user info 
const updateSingleUser = async(req: Request, res: Response)=>{
    // getting user id to find the exect user and the body of update info 
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
        res.status(500).json({
            success: false, 
            message: 'Error update user', 
            error: err
         });
    }

}

const deleteSingleUser =async (req: Request, res:Response) => {
    const userId = parseInt(req.params.userId)
    const result = await userService.deleteUser(userId)
    try {
        if (!result) {
            return res
            .status(404)
            .json({
                success :false ,
                message :"User Not Found",
            })
        } else {
            res.status(200).json({
                success :true ,
                message :`Delete User Successfully`,
                data: null
            })
            
        }
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Error deleting user', 
            error: error
         });
    }


    
}

const addOrderToUserController = async(req: Request, res:Response)=>{
    const userId = parseInt(req.params.userId)
    const order = req.body;
    //console.log('order',order)
    try {
        const  result=await userService.addOrderToUser(userId,order)
        if (!result) {
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
              message: 'Order placed successfully',
              data: null,
            });
          }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false, 
            message: 'Error to update order', 
            error: err
         });
    }

}

export const createUserController = {
    createUser,
    allUsers,
    singleUserById,
    updateSingleUser,
    deleteSingleUser,
    addOrderToUserController
}