ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "first_site_id" text;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "signup_host" text;

WITH activity AS (
  SELECT user_id, site_id, created_at
  FROM credit_transaction
  WHERE site_id IS NOT NULL
  UNION ALL
  SELECT user_id, site_id, created_at
  FROM wav2lip_task
  WHERE site_id IS NOT NULL
  UNION ALL
  SELECT user_id, site_id, created_at
  FROM payment
  WHERE site_id IS NOT NULL
),
ranked AS (
  SELECT
    user_id,
    site_id,
    row_number() OVER (PARTITION BY user_id ORDER BY created_at ASC) AS rn
  FROM activity
)
UPDATE "user" u
SET first_site_id = ranked.site_id
FROM ranked
WHERE ranked.user_id = u.id
  AND ranked.rn = 1
  AND u.first_site_id IS NULL;

UPDATE "user"
SET signup_host = first_site_id
WHERE signup_host IS NULL
  AND first_site_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS "user_first_site_id_idx" ON "user" ("first_site_id");
