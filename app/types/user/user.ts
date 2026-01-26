export type CreateUserInput = {
    email: string;
    password: string;
    role: "USER" | "ADMIN";
};