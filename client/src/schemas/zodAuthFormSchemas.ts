import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .nonempty("The name field is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .nonempty("The password field is required")
        .max(16, "The password field accepts a maximum of 16 characters")
        .min(8, "The password field accepts a minimum of 8 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z
    .object({
        name: z
            .string()
            .nonempty("The name field is required")
            .max(20, "The name field accepts a maximum of 20 characters")
            .min(5, "The name field accepts a minimum of 5 characters"),
        email: z
            .string()
            .nonempty("The name field is required")
            .email("Enter a valid email address"),
        password: z
            .string()
            .nonempty("The password field is required")
            .max(16, "The password field accepts a maximum of 16 characters")
            .min(8, "The password field accepts a minimum of 8 characters"),
        confirmPassword: z
            .string()
            .nonempty("The confimr password field is required")
            .max(16, "The password field accepts a maximum of 16 characters")
            .min(8, "The password field accepts a minimum of 8 characters"),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        path: ["confirmPassword"],
        message: "The passwords did not match",
    });

export type SignupFormData = z.infer<typeof signupFormSchema>;
