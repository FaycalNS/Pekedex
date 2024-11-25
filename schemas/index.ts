import * as z from "zod";

export const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, "Search query cannot be empty")
    .refine(
      (val) => {
        const isId = /^\d+$/.test(val) && parseInt(val) <= 1008;
        const isName = /^[a-zA-Z-]+$/.test(val);
        return isId || isName;
      },
      { message: "Must be a valid Pokemon name (letters only) or ID (1-1008)" }
    ),
});
