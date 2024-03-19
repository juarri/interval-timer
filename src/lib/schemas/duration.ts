import { z } from 'zod';

export const hoursSchema = z.number().int().min(0).max(24).default(0);
export const minutesSchema = z.number().int().min(0).max(59).default(0);
export const secondsSchema = z.number().int().min(0).max(59).default(0);

export const durationSchema = z
	.object({
		hours: hoursSchema,
		minutes: minutesSchema,
		seconds: secondsSchema
	})
	.default({ hours: 0, minutes: 0, seconds: 0 });

export type DurationSchema = z.infer<typeof durationSchema>;

export function durationToSeconds(duration: DurationSchema) {
	return duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
}
