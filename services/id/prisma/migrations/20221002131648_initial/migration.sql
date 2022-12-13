-- CreateTable
CREATE TABLE "AuthContext" (
    "state" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "originUrl" TEXT NOT NULL,

    CONSTRAINT "AuthContext_pkey" PRIMARY KEY ("state")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePicture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "idpRefreshToken" TEXT,
    "idpAccessToken" TEXT NOT NULL,
    "idpAccessTokenExpiresAt" TIMESTAMPTZ(3) NOT NULL,
    "iamToken" TEXT NOT NULL,
    "iamTokenExpiresAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SigningKey" (
    "id" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SigningKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AccessToken" ADD CONSTRAINT "AccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
