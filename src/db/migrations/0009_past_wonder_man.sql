CREATE TABLE "wav2lip_task" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider_task_id" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"video_url" text NOT NULL,
	"audio_url" text NOT NULL,
	"output_url" text,
	"error_message" text,
	"credits_used" integer DEFAULT 0 NOT NULL,
	"provider_response" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	CONSTRAINT "wav2lip_task_provider_task_id_unique" UNIQUE("provider_task_id")
);
--> statement-breakpoint
ALTER TABLE "wav2lip_task" ADD CONSTRAINT "wav2lip_task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "wav2lip_task_user_id_idx" ON "wav2lip_task" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "wav2lip_task_status_idx" ON "wav2lip_task" USING btree ("status");--> statement-breakpoint
CREATE INDEX "wav2lip_task_provider_task_id_idx" ON "wav2lip_task" USING btree ("provider_task_id");