import z from 'zod';

export const formSchema = z.object({
	title: z.string(),
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
	intervals: z.number().int().min(1).default(1)
});

export type FormSchema = z.infer<typeof formSchema>;
