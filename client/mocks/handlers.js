import { rest } from "msw";
import { getEquipments } from "./data";

export const handlers = [
  rest.get("http://localhost:5000/api/getEquipments", (req, res, ctx) => {
    return res(ctx.json(getEquipments.success));
  }),
];
