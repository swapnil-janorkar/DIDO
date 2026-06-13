import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db";

const SECRET="dido-secret";

export const register=async(
    name:string,
    email:string,
    password:string
)=>{
    const hash=await bcrypt.hash(
        password,
        10
    );

    const r=await pool.query(
        `INSERT INTO users
        (name,email,password_hash)
        VALUES($1,$2,$3)
        RETURNING id,name,email`,
        [name,email,hash]
    );

    return r.rows[0];
};

export const login=async(
    email:string,
    password:string
)=>{
    const r=await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    const user=r.rows[0];

    if(!user){
        throw new Error("Invalid credentials");
    }

    const valid=
        await bcrypt.compare(
            password,
            user.password_hash
        );

    if(!valid){
        throw new Error("Invalid credentials");
    }

    const token=jwt.sign(
        {
            id:user.id,
            email:user.email
        },
        SECRET,
        {
            expiresIn:"7d"
        }
    );

    return {
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        }
    };
};