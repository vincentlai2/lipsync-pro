ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "site_id" text;
ALTER TABLE "user_credit" ADD COLUMN IF NOT EXISTS "site_id" text;
ALTER TABLE "credit_transaction" ADD COLUMN IF NOT EXISTS "site_id" text;

UPDATE "payment"
SET "site_id" = 'wav2lipia.com'
WHERE "site_id" IS NULL;

UPDATE "user_credit"
SET "site_id" = 'wav2lipia.com'
WHERE "site_id" IS NULL;

UPDATE "credit_transaction"
SET "site_id" = 'wav2lipia.com'
WHERE "site_id" IS NULL;

ALTER TABLE "payment" ALTER COLUMN "site_id" SET DEFAULT 'lipsync.pro';
ALTER TABLE "user_credit" ALTER COLUMN "site_id" SET DEFAULT 'lipsync.pro';
ALTER TABLE "credit_transaction" ALTER COLUMN "site_id" SET DEFAULT 'lipsync.pro';

ALTER TABLE "payment" ALTER COLUMN "site_id" SET NOT NULL;
ALTER TABLE "user_credit" ALTER COLUMN "site_id" SET NOT NULL;
ALTER TABLE "credit_transaction" ALTER COLUMN "site_id" SET NOT NULL;

CREATE INDEX IF NOT EXISTS "payment_site_id_idx" ON "payment" ("site_id");
CREATE INDEX IF NOT EXISTS "payment_user_site_idx" ON "payment" ("user_id", "site_id");
CREATE INDEX IF NOT EXISTS "credit_transaction_site_id_idx" ON "credit_transaction" ("site_id");
CREATE INDEX IF NOT EXISTS "credit_transaction_user_site_idx" ON "credit_transaction" ("user_id", "site_id");
CREATE INDEX IF NOT EXISTS "user_credit_site_id_idx" ON "user_credit" ("site_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_credit_user_site_idx" ON "user_credit" ("user_id", "site_id");
