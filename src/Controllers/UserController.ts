import { eventEmitter } from ".."
import { Event } from "../Event"
import { State } from "../State"
import { Controller } from "./Controller"
export class UserController extends Controller {
    constructor() {
        super()
        eventEmitter.on(Event.PlayerPressedStart, () => this.stateCompleted?.())
        eventEmitter.on(Event.StakeChanged, (stakeIndex: number) => { console.log(stakeIndex) })
    }
    protected stateChangeCallback(state: State): void {
        if (state !== State.Idle) {
            this.stateCompleted()
            return
        }
    }
}