import { z } from "zod";

export const PostSchema = z.object({
  text: z.string().max(200, { message: "Text can not be more than 100 words" }),
  location: z.string(),
});
