import { eventEmitter, stateMachine, ui } from ".."
import { data } from "../Data"
import { Event } from "../Event"
import { State } from "../State"
import { Controller } from "./Controller"
export class UserController extends Controller {
    private autoPlayConfig = { isOn: false, count: 0, upLimit: 0, downLimit: 0 }
    get autoPlay() {
        return this.autoPlayConfig.isOn
    }
    constructor() {
        super()
        eventEmitter.on(Event.PlayerPressedStart, () => this.stateCompleted?.())
        eventEmitter.on(Event.StakeChanged, (stakeIndex: number) => { console.log(stakeIndex) })
        eventEmitter.on(Event.AutoPlayStarted, ({ count, upTarget, downTarget }) => {
            this.autoPlayConfig.isOn = true
            this.autoPlayConfig.count = count - 1
            this.autoPlayConfig.upLimit = upTarget
            this.autoPlayConfig.downLimit = downTarget
            //TODO implement up/down test
        })
        eventEmitter.on(Event.AutoPlayStopped, () => this.autoPlayConfig.isOn = false)
        this.subscribtions()
    }
    protected stateChangeCallback(state: State): void {
        if (state !== State.Idle) {
            this.stateCompleted()
        }
        if (state === State.Spinning && this.autoPlay && !this.autoPlayConfig.count-- || this.checkMinMax()) {
            this.autoPlayConfig.isOn = false
        }
    }
    private checkMinMax() {
        if (this.autoPlayConfig.downLimit !== 0 && this.autoPlayConfig.upLimit !== 0) {
            return (data.balance <= this.autoPlayConfig.downLimit || data.balance >= this.autoPlayConfig.upLimit)
        }
    }
    private subscribtions() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                if (stateMachine.currentState === State.Idle) {
                    eventEmitter.emit(Event.PlayerPressedStart)
                } else {
                    eventEmitter.emit(Event.SkipAnimation)
                }
            }
        })
    }
}