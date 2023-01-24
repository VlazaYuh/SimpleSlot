import { stateMachine } from ".."
import { Reels } from "../Reels"
import { State } from "../State"
import { getSpinResult} from "../spinResult"
import { Controller } from "./Controller"
export class AnimationController extends Controller {
    private reels: Reels
    constructor(reels: Reels) {
        super()
        this.reels = reels
    }
    protected stateChangeCallback(state: State): void {
        if (state === State.Animation) {
            this.reels.allSymbolsTint()
            for (let i = 0; i < getSpinResult().win.lines.length; i++) {
                for (let i1 = 0; i1 < getSpinResult().win.lines[i].reels.length; i1++) {
                    if (i1 < getSpinResult().win.lines[i].reels.length) {
                        this.reels.getSymbol(getSpinResult().win.lines[i].reels[i1],this.reels.rows-getSpinResult().win.lines[i].line).animate('win')
                    }
                }
            }
        }
        this.stateCompleted()
        return
    }
}
