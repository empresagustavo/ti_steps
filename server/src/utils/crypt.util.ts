import * as bcryptjs from "bcryptjs";

const SALT_ROUNDS_PASS: number = 10;

export const hashPassword = async (pass: string): Promise<string> => {
  return await bcryptjs.hash(pass, SALT_ROUNDS_PASS);
}

export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
}
