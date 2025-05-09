import { Router } from "express";
import prisma from "../db/db.js";

const router = Router();

router.post('/login', async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({where: { email },});
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.password == password) {
            res.send({users: user, islogged: true})
        } else {
            res.send({islogged: false})
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/register', async (req, res) => {
    console.log(req.body);
    const {email, name, password} = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password, and name are required' });
          }
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const newuser = await prisma.$transaction(async(prisma) => {
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password,
                    role: 'PASSENGER',
                }
            });

            return user;
        })

        res.status(201).json({ 
            message: 'User and Student created',
            user: {
              id: newuser.id,
              email: newuser.email,
              name: newuser.name,
            }
          });
    } catch (err) {
        console.log(err);
    }
})

export default router;