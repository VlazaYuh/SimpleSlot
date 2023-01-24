import { delay, stateMachine } from ".."
import { Reels } from "../Reels"
import { State } from "../State"
import { getSpinResult } from "../spinResult"
import { Controller } from "./Controller"
export class ReelController extends Controller {
    private reels: Reels
    constructor(reels: Reels) {
        super()
        this.reels = reels
    }
    protected async stateChangeCallback(state: State) {
        if (state === State.Spinning) {
            this.reels.start()
            await delay(5000)
            await this.reels.stop(getSpinResult().table)
        }
        this.stateCompleted()
        return
    }
}