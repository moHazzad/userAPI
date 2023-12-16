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
    return result;

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

    const user = await getSingleUserById(userId);

    // Check if user is not null
    if (!user) {
        throw new Error('User not found');
    }

    // Ensure the orders array is initialized
    if (!user.orders) {
        user.orders = [];
    }

    user.orders.push(orderData);

    // Save the updated user
    await user.save();

    return user;

}

const getSingleUserOrderFromDb =async (userId: number) => {
    const user = await getSingleUserById(userId);
    if (!user) {
        return user 
    } else{
        if (!user?.orders || user?.orders?.length === 0) {
        // if the orders array is empty 
        return;
    }
    return user.orders;
    }
    
    
}

const getSingleUserTotalPriceFromDb = async(userId:number)=>{
    const userOrders = await getSingleUserOrderFromDb(userId);

    // Check if userOrders is an array (which means there are orders) or an object with a 'message' key (no orders or user not found)
    if (Array.isArray(userOrders)) {
        const totalPrice = userOrders.reduce((sum, order) => sum + (order.price || 0), 0);
        return { totalPrice };
    } else {
        // Return the message from getSingleUserOrderFromDb (no orders or user not found)
        return userOrders;
    }
}


export const userService = {
    createUserInDb,
    getAllUserUserFromDb,
    getSingleUserById,
    updateUserInformation,
    deleteUser,
    addOrderToUser,
    getSingleUserOrderFromDb,
    getSingleUserTotalPriceFromDb
}