import  express  from "express";
import { createUserController } from "./user.controller";

const router = express.Router()

router.get('/users', createUserController.allUsers )
router.get('/users/:userId', createUserController.singleUserById )
router.post('/users', createUserController.createUser )

export const UserRoute = router