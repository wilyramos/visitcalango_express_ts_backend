import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";



export class UserController {
    static createUser = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                res.status(409).json("El usuario ya existe");
            }

            const hashedPassword = await hashPassword(password);
            console.log(hashedPassword);

            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            await user.save();

            res.status(201).json("Usuario creado correctamente");

        } catch (error) {
            // console.log(error);
            res.status(500).json("Internal server error");
        }
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        console.log(email,
            password);

        try {

            const user = await User.findOne({ email });

            if (!user) {
                res.status(404).json("Usuario no encontrado");
            }

            // Compare password
            const isPasswwordCorrect = await bcrypt.compare(password, user.password);
            console.log(isPasswwordCorrect);
            if (!isPasswwordCorrect) {
                res.status(401).json("Contraseña incorrecta");
            }

            // Generate token
            const token = generateJWT({ id: user.id });
            res.send(token);
        } catch (error) {
            // console.log(error);
            res.status(500).json("Internal server error");
        }
    }

    static profile = async (req: Request, res: Response) => {
        try {
            res.json(req.user);
        } catch (error) {
            // console.log(error);
            res.status(500).json("Internal server error");
        }
    }

    static getUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.find().select("-password");
            res.json(users);
        } catch (error) {
            // console.log(error);
            res.status(500).json("Internal server error");
        }
    }

    static getUser = async (req: Request, res: Response) => {
        res.send("get user");
    }

    static updateUser = async (req: Request, res: Response) => {
        res.send("update user");
    }

    static deleteUser = async (req: Request, res: Response) => {
        res.send("delete user");
    }
}

export default UserController;