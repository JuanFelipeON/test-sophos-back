"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
router.get("/", authenticateToken_1.default, task_controller_1.getTasks);
router.get("/:id", authenticateToken_1.default, task_controller_1.getTask);
router.delete("/:id", authenticateToken_1.default, task_controller_1.deleteTask);
router.post("/", authenticateToken_1.default, task_controller_1.postTask);
router.put("/:id", authenticateToken_1.default, task_controller_1.putTask);
exports.default = router;
