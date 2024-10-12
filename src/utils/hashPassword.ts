import bcrypt from 'bcrypt'
export async function hashPassword(password: string) {
  const saltRounds = 6
  const hashedPassword = password && await bcrypt.hash(password, saltRounds);

  return hashedPassword
}
