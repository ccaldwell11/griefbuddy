import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma = new PrismaClient();

// ts generics
function shuffle<Buddy>(array: Buddy[]): Buddy[] {
  const tuplePair = [...array];
  let currentIndex = tuplePair.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [tuplePair[currentIndex], tuplePair[randomIndex]] = [
      tuplePair[randomIndex],
      tuplePair[currentIndex],
    ];
  }
  return tuplePair;
}

router.get('/pair', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    const shuffledUsers = shuffle(users);

    const buddyPairs = [];
    for (let i = 0; i < shuffledUsers.length; i += 2) {
      const pair = [shuffledUsers[i], shuffledUsers[i + 1]].filter(Boolean); 
      // tried using double bang too
      buddyPairs.push(pair);
    }

    res.json(buddyPairs);

    // random buddy for each user
    shuffledUsers.forEach(async (user) => {
      const userId = user.id;
      chooseBuddy(userId);
    });
  } catch (error) {
    console.error('buddies couldnt be paired:', error);
    res.status(500).json(error);
  }
});

const chooseBuddy = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        buddy1: true,
        buddy2: true,
      },
    });

    if (!user) {
      console.error('user not found');
      return;
    }

    // check for present pairings
    if (user.buddy1.length === 0 && user.buddy2.length === 0) {
      console.log('user has no buddies');
      return;
    }

    // get buddy data
    let buddyData;
    if (user.buddy1.length > 0) {
      buddyData = user.buddy1[0];
    } else {
      buddyData = user.buddy2[0];
    }

    console.log('buddy selected:', buddyData);
  } catch (error) {
    console.error('error choosing buddy:', error);
  }
};

module.exports = router;
