const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // seed users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Smith',
      googleId: '1014790459587567466317',
      emConName: '',
      emConNum: '',
      emConRelationship: '',
      preferredName: 'Ally',
      currMood: 'Feeling good',
      myLocation: '',
      agee: '28',
      myPhoneNumber: '123-456-7890',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Johnson',
      googleId: '101409527845345366317',
      emConName: '',
      emConNum: '',
      emConRelationship: '',
      preferredName: 'Bobby',
      currMood: 'okay',
      myLocation: '',
      agee: '32',
      myPhoneNumber: '987-654-3210',
    },
  });

  //   // seed buddies
  //   await prisma.buddy.create({
  //     data: {
  //       buddy1Id: '11638486326691276740',
  //       buddy2Id: user2.id,
  //       expired: false,
  //     },
  //   });

  //   // seed friends
  //   await prisma.friend.create({
  //     data: {
  //       friend1Id: '11638486326691276740',
  //       friend2Id: user2.id,
  //     },
  //   });

  console.log('seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
