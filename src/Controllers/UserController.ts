import { eventEmitter, ui } from ".."
import { Event } from "../Event"
import { State } from "../State"
import { Controller } from "./Controller"
export class UserController extends Controller {
    private _autoPlay = false
    private count: number = 0
    private upTarget: number
    private downTarget: number
    get autoPlay() {
        return this._autoPlay
    }
    constructor() {
        super()
        eventEmitter.on(Event.PlayerPressedStart, () => this.stateCompleted?.())
        eventEmitter.on(Event.StakeChanged, (stakeIndex: number) => { console.log(stakeIndex) })
        eventEmitter.on(Event.OptionsClicked, () => { ui.optionsShow() })
        eventEmitter.on(Event.AutoPlayStarted, ({ count, upTarget, downTarget }) => {
            this._autoPlay = true
            this.count = count - 1
            this.upTarget = upTarget
            this.downTarget = downTarget
            //implement up/down test
        })
        eventEmitter.on(Event.AutoPlayStopped, () => this._autoPlay = false)
        eventEmitter.on(Event.ReduceAutoPlay, () => {
            if (this.count !== undefined && this.count !== 0) {
                this.count--
            }
        })
    }
    protected stateChangeCallback(state: State): void {
        if (state !== State.Idle) {
            this.stateCompleted()
        }
        if (state === State.Animation && this.count === 0) {
            this._autoPlay = false
        }
    }
}