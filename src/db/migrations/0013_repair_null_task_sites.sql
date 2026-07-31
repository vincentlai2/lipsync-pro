WITH matched_usage AS (
  SELECT DISTINCT ON (t.id)
    t.id AS task_id,
    ct.site_id
  FROM wav2lip_task t
  JOIN credit_transaction ct
    ON ct.user_id = t.user_id
   AND ct.type = 'USAGE'
   AND ct.site_id IS NOT NULL
   AND abs(extract(epoch from (t.created_at - ct.created_at))) <= 120
  WHERE t.site_id IS NULL
  ORDER BY t.id, abs(extract(epoch from (t.created_at - ct.created_at))) ASC
)
UPDATE wav2lip_task t
SET site_id = matched_usage.site_id,
    updated_at = now()
FROM matched_usage
WHERE t.id = matched_usage.task_id
  AND t.site_id IS NULL;

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
SET first_site_id = ranked.site_id,
    signup_host = ranked.site_id,
    updated_at = now()
FROM ranked
WHERE ranked.user_id = u.id
  AND ranked.rn = 1
  AND u.first_site_id IS NULL;
