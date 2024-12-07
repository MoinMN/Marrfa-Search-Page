import { Router } from "express";

const router = Router();

// import functions from controllers
import { GetBlogs, AddBlogs, DeleteBlogs } from "../controllers/blog.controller.js";


router.get('/get', GetBlogs);

router.post('/add', AddBlogs);

router.post('/delete', DeleteBlogs);


export default router;