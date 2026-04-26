import * as z from "zod";
export enum ProgramLevel {
    UNDERGRADUATE = "UNDERGRADUATE",
    POSTGRADUATE = "POSTGRADUATE",
    PHD = "PHD",
}
export const ProgramZodSchema = z.object({
    name: z.string().min(1, "Program name is required"),
    shortName: z.string().min(1, "Program short name is required"),
    level: z.enum(ProgramLevel).refine((val) => ["UNDERGRADUATE", "POSTGRADUATE", "PHD"].includes(val), {
        message: "Program level must be one of Undergraduate, or Postgraduate or PHD",
    }),
    description: z.string().min(1, "Program description is required"),
});

export type ProgramFormData = z.infer<typeof ProgramZodSchema>;
