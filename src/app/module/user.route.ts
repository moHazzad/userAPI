import  express  from "express";
import { createUserController } from "./user.controller";

const router = express.Router()

router.get('/users', createUserController.allUsers )
router.get('/users/:userId', createUserController.singleUserById )
router.put('/users/:userId', createUserController.updateSingleUser )
router.get('/users/:userId/orders', createUserController.getSingleUserOrder)
router.put('/users/:userId/orders', createUserController.addOrderToUserController)
router.delete('/users/:userId', createUserController.deleteSingleUser )
router.post('/users', createUserController.createUser )

export const UserRoute = router