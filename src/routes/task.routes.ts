import { Router } from "express";
import {
  deleteTask,
  getTask,
  getTasks,
  postTask,
  putTask,
} from "../controllers/task.controller";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();
router.get("/", authenticateToken, getTasks);
router.get("/:id", authenticateToken, getTask);
router.delete("/:id", authenticateToken, deleteTask);
router.post("/", authenticateToken, postTask);
router.put("/:id", authenticateToken, putTask);

export default router;
