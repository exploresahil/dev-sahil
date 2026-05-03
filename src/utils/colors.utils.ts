import z from "zod";

export const ColorsSchema = z.object({
  default_light: z.string(),
  default_dark: z.string(),
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
});

export type ColorsSchemaType = z.infer<typeof ColorsSchema>;

export const Colors: ColorsSchemaType = {
  default_light: "#f5f5f7",
  default_dark: "#131314",
  primary: "#db2f27",
  secondary: "#e7c700",
  accent: "#008cbc",
};
