import type { AnyFunction } from '#/helpers/util';

export type DelayedActionCallback = AnyFunction;

/**
 * Delayed function executor with cancel feature.
 */
export class DelayedAction {
	private timeoutId: NodeJS.Timeout = null;

	constructor(private delay: number) {}

	/**
	 * Execute the given callback with delay.
	 *
	 * @param callback Callback function to execute
	 */
	execute(callback: DelayedActionCallback): void {
		this.cancel();

		this.timeoutId = setTimeout(() => {
			callback();

			this.timeoutId = null;
		}, this.delay);
	}

	/**
	 * Cancel the pending action.
	 */
	cancel(): void {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);

			this.timeoutId = null;
		}
	}
}