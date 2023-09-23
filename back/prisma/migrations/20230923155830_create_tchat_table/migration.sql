-- DropIndex
DROP INDEX "users_id_key";

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_users" (
    "channel_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_muted" TIMESTAMP(3),
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_ban" BOOLEAN NOT NULL DEFAULT false,
    "id" SERIAL NOT NULL,

    CONSTRAINT "channel_users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel_messages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channel_user_id" INTEGER NOT NULL,

    CONSTRAINT "channel_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "channel_users_channel_id_user_id_uindex" ON "channel_users"("channel_id", "user_id");

-- AddForeignKey
ALTER TABLE "channel_users" ADD CONSTRAINT "channel_users_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_users" ADD CONSTRAINT "channel_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel_messages" ADD CONSTRAINT "channel_messages_channel_user_id_fkey" FOREIGN KEY ("channel_user_id") REFERENCES "channel_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
