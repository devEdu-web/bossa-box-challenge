import { Request, Response } from "express";

interface IController {
  handle(req: Request, res: Response): Promise<Response>
}

interface IToolPayload {
  title: string;
  link: string;
  description: string;
  tags: string[];
}