import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // Insert dummy user if not exist
  const count = await prisma.user.count()
  if (!count) {
    console.log('Inserting a user.')

    // This user has ID of `BigInt(1)`.
    await prisma.user.create({
      data: { name: 'dummy' },
    })
  }

  const user1 = (await prisma.user.findFirst()) as User
  // This output `true`
  console.log({ user: user1, isSame: user1.id === BigInt(1) })

  const [user2] = await prisma.$queryRaw<User[]>`SELECT id, name FROM "User"`
  // However, this isn't `true`.
  console.log({ user: user2, isSame: user2.id === BigInt(1) })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
