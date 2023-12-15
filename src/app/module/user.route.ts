import  express  from "express";
import { createUserController } from "./user.controller";

const router = express.Router()

router.post('/users', createUserController.createUser )

export const UserRoute = router