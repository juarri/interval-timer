import CreateIntervalTimerForm from './create.svelte';
import UpdateIntervalTimerForm from './update.svelte';
import { schema as intervalTimerFormSchema } from './schema';
import type { Schema as IntervalTimerFormSchema } from './schema';

export { CreateIntervalTimerForm, UpdateIntervalTimerForm, intervalTimerFormSchema };
export type { IntervalTimerFormSchema };

export type formFields = 'preparationTime' | 'goTime' | 'stopTime' | 'cooldownTime';
export type formFieldSet = { label: string; value: formFields };

export const durationFieldSets: formFieldSet[] = [
	{ label: 'Preparation', value: 'preparationTime' },
	{ label: 'Work', value: 'goTime' },
	{ label: 'Rest', value: 'stopTime' },
	{ label: 'Cooldown', value: 'cooldownTime' }
];
