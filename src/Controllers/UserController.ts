import { stateMachine, ui } from ".."
import { State } from "../State"
import { Controller } from "./Controller"
export class UserController extends Controller {
    constructor() {
        super()
        ui.on('player_pressed_start', () => this.stateCompleted?.())
    }
    protected stateChangeCallback(state: State): void {
        if (state !== State.Idle) {
            this.stateCompleted()
            return
        }
    }
}