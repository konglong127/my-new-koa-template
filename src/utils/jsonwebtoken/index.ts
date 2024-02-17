import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const secret = 'AZBY.0918+CXDW*7263=_!~:"|&H2&()JX@)sdf*J)!J&^#&%GBS&3&V5Af';

export function createToken(data: any): string | undefined | null {
  return jwt.sign(data, secret, { expiresIn: 60 * 60 * 24 });
}

export function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, secret);
}

export function validateMiddleware( req: Request, res: Response, next: NextFunction ) {
  if (req.headers.token && typeof req.headers.token === "string") {
    let result=verifyToken(req.headers.token);
    if ( result!== "err") {
      req.body.token = result;
      next();
    } else {
      res.status(200).send({ msg: "variable t are too much", status: 404 });
    }
  } else {
    res.status(200).send({ msg: "variable t are too much", status: 404 });
  }
}

// let token=createToken({name:"asasd",age:21,asdasd:"123123"});
// console.log(token);
// let res=verifyToken(token as string);
// console.log(res);
