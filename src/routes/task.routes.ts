import { Router } from "express";
import { deleteTask, getTask, getTasks, postTask, putTask } from "../controllers/task.controller";

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);
router.post('/',postTask);
router.put('/:id',putTask);

export default router;