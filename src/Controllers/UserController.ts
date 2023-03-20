import { eventEmitter } from ".."
import { Event } from "../Event"
import { State } from "../State"
import { Controller } from "./Controller"
export class UserController extends Controller {
    constructor() {
        super()
        eventEmitter.on(Event.playerPressedStart, () => this.stateCompleted?.())
        eventEmitter.on(Event.stakeChanged, (stakeIndex: number) => { console.log(stakeIndex) })
    }
    protected stateChangeCallback(state: State): void {
        if (state !== State.Idle) {
            this.stateCompleted()
            return
        }
    }
}