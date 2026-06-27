import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  niche: z.string().min(1, "Please select a niche"),
  country: z.string().min(1, "Please select a country"),
  desc: z.string().min(10, "Description must be at least 10 characters"),
});
