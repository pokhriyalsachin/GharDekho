import express from 'express';
const router = express.Router();
import { deleteUser, updateUser, getUserListings , getUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
router.post("/update/:id",verifyUser,updateUser);
router.delete("/delete/:id",verifyUser,deleteUser);
router.get('/listings/:id',verifyUser, getUserListings);
router.get('/:id',verifyUser, getUser);
export default router;

