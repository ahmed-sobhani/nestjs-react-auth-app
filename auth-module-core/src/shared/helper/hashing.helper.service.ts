import { compare, genSalt, hash } from 'bcrypt';

/**
 * Generate Random Salt
 * @returns generated random salt string
 */
export const randomSalt = async (): Promise<string> => {
  return genSalt(16);
};

/**
 *  Bycrypt Hash Password
 * @param passwordString Password String
 * @param salt  Salt
 * @returns Hashed Password String
 */
export const bcryptHashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  return hash(password, salt);
};

/**
 * Compare Password And Hashed Password
 * @param password Password String
 * @param hashed Hashed Password
 * @returns If password and hashedPassword are same, return true. else false
 */
export const bcryptComparePassword = async (
  password: string,
  hashed: string,
): Promise<boolean> => {
  return compare(password, hashed);
};

/**
 * Hash a password
 * @param password Password String
 * @returns hashed password string
 */
export const hashPassword = async (password: string) => {
  const salt: string = await randomSalt();
  return await bcryptHashPassword(password, salt);
};
