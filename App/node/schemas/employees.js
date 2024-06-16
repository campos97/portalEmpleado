import z from "zod";

const employeeSchema = z.object({
  name: z.string({
    invalid_type_error: "Employee name must be a string",
    required_error: "Employee name is required.",
  }),
  username: z.string({
    invalid_type_error: "Employee username must be a string",
    required_error: "Employee username is required.",
  }),
  position: z.string({
    invalid_type_error: "Employee position must be a string",
    required_error: "Employee position is required.",
  }),
  department: z.string({
    invalid_type_error: "Employee department must be a string",
    required_error: "Employee department is required.",
  }),
});

export function validateEmployee(input) {
  return employeeSchema.safeParse(input);
}

export function validatePartialEmployee(input) {
  return employeeSchema.partial().safeParse(input);
}
