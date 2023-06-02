import { delay, eventEmitter } from ".."
import { data } from "../Data"
import { Event } from "../Event"
import { Reels } from "../Reels"
import { State } from "../State"
import { getSpinResult, sendRequest } from "../spinResult"
import { Controller } from "./Controller"
export class ReelController extends Controller {
    private reels: Reels
    private spinTimeMS = 5000
    constructor(reels: Reels,) {
        super()
        this.reels = reels
    }
    protected async stateChangeCallback(state: State) {
        if (state === State.Spinning) {
            this.reels.start()
            const quickPromise = data.turboMode ? Promise.resolve : new Promise(resolve => { eventEmitter.on(Event.SkipAnimation, resolve) })
            let isQuick = data.turboMode
            const callback = () => {
                isQuick = true
            }
            eventEmitter.on(Event.SkipAnimation, callback)
            await Promise.all([Promise.race([delay(this.spinTimeMS), quickPromise]), sendRequest()])
            await this.reels.stop(getSpinResult().table, isQuick)
            eventEmitter.off(Event.SkipAnimation, callback)
        }
        this.stateCompleted()
        return
    }
}