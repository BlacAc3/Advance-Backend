import bcrypt from "bcryptjs";

/**
 * Hashes a plaintext password using bcrypt.
 * @param password The plaintext password to hash.
 * @returns A promise that resolves with the hashed password string.
 */
export const hashPassword = async (password: string): Promise<string> => {
  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt
  return bcrypt.hash(password, salt);
};

/**
 * Compares a plaintext password with a bcrypt hashed password.
 * @param password The plaintext password to compare.
 * @param hashedPassword The bcrypt hashed password from the database.
 * @returns A promise that resolves with true if the passwords match, false otherwise.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  // Compare the plaintext password with the hashed password
  // This function handles the salt extraction from the hash automatically
  return bcrypt.compare(password, hashedPassword);
};
