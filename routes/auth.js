import express from "express";
import { login, register } from "../app/http/controllers/AuthController.js";
import safeRoute from "./safeRoute.js";


const router = express.Router();

router.post("/login", safeRoute(login));

router.post("/register", safeRoute(register));


export default router;