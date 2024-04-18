-- CreateTable
CREATE TABLE "BuddyRequest" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "requestedId" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BuddyRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuddyRequest" ADD CONSTRAINT "BuddyRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyRequest" ADD CONSTRAINT "BuddyRequest_requestedId_fkey" FOREIGN KEY ("requestedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
