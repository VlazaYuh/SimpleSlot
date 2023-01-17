import { stateMachine } from ".."
import { State } from "../State"
import { Controller } from "./Controller"
export class AnimationController extends Controller {
    constructor() {
        super()
    }
    protected stateChangeCallback(state: State): void {
        if (state !== State.Init) {
            this.stateCompleted()
            return
        }
    }
}