import z from 'zod';

export const schema = z.object({
	title: z.string().min(1).max(31),
	description: z.string().max(255).optional(),
	preparationTime: z.object({
		hours: z.number().int().min(0).max(23),
		minutes: z.number().int().min(0).max(59),
		seconds: z.number().int().min(0).max(59)
	}),
	goTime: z.object({
		hours: z.number().int().min(0).max(23),
		minutes: z.number().int().min(0).max(59),
		seconds: z.number().int().min(0).max(59)
	}),
	stopTime: z.object({
		hours: z.number().int().min(0).max(23),
		minutes: z.number().int().min(0).max(59),
		seconds: z.number().int().min(0).max(59)
	}),
	cooldownTime: z.object({
		hours: z.number().int().min(0).max(23),
		minutes: z.number().int().min(0).max(59),
		seconds: z.number().int().min(0).max(59)
	}),
	intervals: z.number().int().min(1)
});

export type Schema = z.infer<typeof schema>;
