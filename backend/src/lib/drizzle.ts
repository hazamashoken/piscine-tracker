import { drizzle } from "drizzle-orm/node-postgres";
import * as schemas from "../schema/pisciner.js";
export const db = drizzle(process.env["DATABASE_URL"]!, { schema: schemas });
