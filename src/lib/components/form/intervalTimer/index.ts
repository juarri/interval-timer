import CreateIntervalTimerForm from './create.svelte';
import CreateIntervalTimerButton from './createButton.svelte';
import type { Schema as IntervalTimerFormSchema } from './schema';
import { schema as intervalTimerFormSchema } from './schema';
import UpdateIntervalTimerForm from './update.svelte';
import UpdateIntervalTimerButton from './updateButton.svelte';

export {
	CreateIntervalTimerButton,
	CreateIntervalTimerForm,
	UpdateIntervalTimerButton,
	UpdateIntervalTimerForm,
	intervalTimerFormSchema
};
export type { IntervalTimerFormSchema };

export type formFields = 'preparationTime' | 'goTime' | 'stopTime' | 'cooldownTime';
export type formFieldSet = { label: string; value: formFields };

export const durationFieldSets: formFieldSet[] = [
	{ label: 'Preparation', value: 'preparationTime' },
	{ label: 'Work', value: 'goTime' },
	{ label: 'Rest', value: 'stopTime' },
	{ label: 'Cooldown', value: 'cooldownTime' }
];
