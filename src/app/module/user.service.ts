import { User } from "./user.interface";
import { userModel } from "./user.model";


const createUserInDb =async (userData: User) => {
    const user = new userModel(userData)
    const result = await user.save()
    return result
}

//  retrieve all user with specific field 
const getAllUserUserFromDb = async()=>{
    const result = await userModel.aggregate([
        {
            $project:{
                username:1,
                fullName: 1,
                age: 1,
                email: 1 ,
                address: 1 
            }
        }
    ])
    return result
}
const getSingleUserById = async(userId: number)=>{

    const result= await userModel.findOne({userId})
    return  result;

} 

const updateUserInformation = async (userId: number, updateInfo:User)=>{
    const result = await userModel.findOneAndUpdate({userId}, updateInfo, { new:true})
    return result
}

const deleteUser =async (userId: number) => {
    const result = await userModel.findOneAndDelete({userId}) 
    return result
    
}


export const userService = {
    createUserInDb,
    getAllUserUserFromDb,
    getSingleUserById,
    updateUserInformation,
    deleteUser
}