import { User } from "./user.interface";
import { userModel } from "./user.model";


const createUserInDb =async (userData: User) => {
    if (!userData.orders) {
        userData.orders = [];
      }

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

// order 
// add order to the user 
const addOrderToUser = async (userId:number,orderData:object  )=>{
    // finding user by id 
    const user =await getSingleUserById(userId);
    
    if (!user) {
        throw new Error('The user does not exist')       
    }
    if (!user.orders) {
        user.orders=[];   
    }
    // if order available will add or create new 
    user.orders = [...user.orders, {...orderData}] 
    await user.save();

    return user;


}

const getSingleUserOrderFromDb =async (userId: number) => {
    const user = await getSingleUserById(userId) ;
    return user?.orders || null;
    
}


export const userService = {
    createUserInDb,
    getAllUserUserFromDb,
    getSingleUserById,
    updateUserInformation,
    deleteUser,
    addOrderToUser,
    getSingleUserOrderFromDb
}