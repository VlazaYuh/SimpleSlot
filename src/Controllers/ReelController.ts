import { delay, stateMachine } from ".."
import { Reels } from "../Reels"
import { State } from "../State"
import { Controller } from "./Controller"
export class ReelController extends Controller {
    reels:Reels
    constructor(reels:Reels) {
        super()
        this.reels=reels
    }
    protected async stateChangeCallback(state: State) {
        if (state === State.Spinning) {
            this.reels.start()
            await delay(5000)
            this.reels.stop([[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4]])
        }
        this.stateCompleted()
    }
}