import { stateMachine } from ".."
import { State } from "../State"
export abstract class Controller {
    protected stateCompleted: () => void
    constructor() {
        stateMachine.onStateChange(state => {
            const promise = new Promise<void>(resolve => { this.stateCompleted = resolve })
            this.stateChangeCallback(state)
            return promise
        })
    }
    protected abstract stateChangeCallback(state: State): void
}