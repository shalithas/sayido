import { Router } from "express";
import { Vendor } from "./vendor.model";

const router = new Router();

router.get('/', async (req, res) => {
    const vendors = await Vendor.find();

    res.send(vendors);
});

export default router;