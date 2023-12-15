import { User } from "./user.interface";
import { userModel } from "./user.model";


const createUserInDb =async (userData: User) => {

    const user = new userModel(userData)
    const result = await user.save()
    return result
}

export const userService = {
    createUserInDb
}