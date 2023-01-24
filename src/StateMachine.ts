import { TTransition } from "./TTransition";
import { State } from "./State"
type TCallback = (state: State) => Promise<void>
export class StateMachine {
    private _currentState?: State
    private callbacks: TCallback[] = []
    private transitions: TTransition[]
    private initialState: State
    setConfig(config: { transitions: TTransition[], initialState: State }) {
        this.transitions = config.transitions
        this.initialState = config.initialState
    }
    get currentState() {
        return this._currentState
    }
    onStateChange(callback: TCallback) {
        this.callbacks.push(callback)
    }
    async start() {
        if (this._currentState !== undefined) {
            throw 'start has already been used'
        }
        this._currentState = this.initialState
        while (true) {
            await Promise.all(this.callbacks.map(callback => callback(this.currentState)))
            this.changeState()
        }
    }
    private changeState() {
        const { to } = this.transitions.find(transition => transition.from === this.currentState)
        const newState = typeof to === 'function' ? to() : to
        console.log(`State Changed from ${State[this.currentState]} to ${State[newState]}`)
        this._currentState = newState
    }
}