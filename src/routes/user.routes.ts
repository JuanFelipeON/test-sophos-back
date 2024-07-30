import { Router } from "express";
import { postUser } from "../controllers/user.controller";
import { loginUser } from "../controllers/user.controller";


const router = Router();

router.post('/register',postUser);
router.post('/login',loginUser);

export default router;