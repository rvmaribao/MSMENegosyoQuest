-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('PRE', 'POST');

-- CreateTable
CREATE TABLE "Participant" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(120) NOT NULL,
    "businessName" VARCHAR(160) NOT NULL,
    "location" VARCHAR(160) NOT NULL,
    "industry" VARCHAR(80) NOT NULL,
    "email" VARCHAR(254),
    "mobile" VARCHAR(30),
    "recoveryHash" TEXT NOT NULL,
    "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "type" "AssessmentType" NOT NULL,
    "position" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[] NOT NULL,
    "correctAnswer" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "negosyoTip" TEXT,
    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentAttempt" (
    "id" UUID NOT NULL,
    "participantId" UUID NOT NULL,
    "type" "AssessmentType" NOT NULL,
    "score" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "AssessmentAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentAnswer" (
    "attemptId" UUID NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOption" INTEGER NOT NULL,
    "isCorrect" BOOLEAN,
    CONSTRAINT "AssessmentAnswer_pkey" PRIMARY KEY ("attemptId", "questionId")
);

-- CreateTable
CREATE TABLE "AppSetting" (
    "key" TEXT NOT NULL,
    "postTestOpen" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AppSetting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");
CREATE INDEX "Participant_createdAt_idx" ON "Participant"("createdAt");
CREATE UNIQUE INDEX "Question_type_position_key" ON "Question"("type", "position");
CREATE UNIQUE INDEX "AssessmentAttempt_participantId_type_key" ON "AssessmentAttempt"("participantId", "type");
CREATE INDEX "AssessmentAttempt_type_completedAt_idx" ON "AssessmentAttempt"("type", "completedAt");

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentAnswer" ADD CONSTRAINT "AssessmentAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentAnswer" ADD CONSTRAINT "AssessmentAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;