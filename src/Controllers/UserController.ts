import { eventEmitter } from ".."
import { Event } from "../Event"
import { State } from "../State"
import { Controller } from "./Controller"
export class UserController extends Controller {
    constructor() {
        super()
        eventEmitter.on(Event[1], () => this.stateCompleted?.())
        eventEmitter.on(Event[0], (stakeIndex: number) => { console.log(stakeIndex) })
    }
    protected stateChangeCallback(state: State): void {
        if (state !== State.Idle) {
            this.stateCompleted()
            return
        }
    }
}