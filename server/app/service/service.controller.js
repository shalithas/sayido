import { Router } from "express";
import { Service } from "./service.model";


const router = new Router();

router.get('/', async (req, res) => {
    const services = await Service.find();

    res.send(services);
});

export default router;