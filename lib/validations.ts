import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .regex(/^[0-9()+\-\s.]{10,}$/, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(5, "Please enter your project address."),
  projectType: z.string().min(1, "Please select a project type."),
  preferredContact: z.enum(["phone", "email", "either"], {
    message: "Please choose a preferred contact method.",
  }),
  message: z
    .string()
    .min(10, "Please share a few details about your project.")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
