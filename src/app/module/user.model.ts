import mongoose, { model } from 'mongoose';
import { User } from './user.interface';
import config from '../config';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema<User>({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: [{ type: String }],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },

})

    // middleWare 

userSchema.pre('save', async function (next) {

    const user = this; 
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    
    next();
})

// to remove password field from the return doc 
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    return userObject;
}


export const userModel = model<User>('User', userSchema) 
