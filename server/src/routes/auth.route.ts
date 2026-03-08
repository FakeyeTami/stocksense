import { Router, Request, Response } from "express";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
    const { email, password } = req.body;
    // TODO: add register logic
    res.json({ message: "register route" });
});

router.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    // TODO: add login logic
    res.json({ message: "login route" });
});

router.post("/logout", (_req: Request, res: Response) => {
    // TODO: add logout logic
    res.json({ message: "logout route" });
});

export default router;
