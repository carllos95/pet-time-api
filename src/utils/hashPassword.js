import bcrypt from 'bcrypt'
export async function hashPassword(password) {
  const saltRounds = 6
  const hashedPassword = password && await bcrypt.hash(password, saltRounds);

  return hashedPassword
}
