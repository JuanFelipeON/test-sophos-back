import { Router } from "express";
import { newUser } from "../controllers/user.controller";
import { loginUser } from "../controllers/user.controller";


const router = Router();

router.post('/register',newUser);
router.post('/login',loginUser);

export default router;