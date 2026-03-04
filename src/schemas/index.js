import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  pinCode: z.string().min(6, "PIN Code must be at least 6 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
});
