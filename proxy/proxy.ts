import axios from "axios";
import express from "express";
import { loadEnv } from "vite";
import type { Request, Response } from "express";

export default (mode: string) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxy = express();

  proxy.get("/secret", async (req: Request, res: Response) => {
    const allowedHost = env["VITE_ALLOWED_HOST"] === req.hostname;
    if (!allowedHost) return res.status(401);

    const requestUrl = `${env["VITE_TRIAGE_URL"]}/token`;
    const requestBody = { secret: env["VITE_SECRET"] };
    const request = await axios.post(requestUrl, requestBody);
    const { token } = request.data;

    res.json({ token });
  });

  proxy.listen(3001);

  return {
    name: "proxy",
  };
};
