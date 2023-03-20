import * as PIXI from 'pixi.js'
import { eventEmitter, stateMachine } from '.'
import { State } from './State'
import { stakeDict } from './stakeDict'
import { style } from './textStyles'
import { StakeButton } from './StakeButton'
import { StartButton } from './StartButton'
import { StakeChanger } from './StakeChanger'
import { Event } from './Event'
export class UI extends PIXI.Container {
    private buttonStart: StartButton
    private stakeContainer: StakeChanger
    private _stakeIndex: number = 0
    get stakeIndex() {
        return this._stakeIndex
    }
    init(width: number) {
        this.buttonStart = this.addChild(new StartButton())
        this.buttonStart.position.set(width / 2 + 70, 510)
        this.stakeContainer = this.addChild(new StakeChanger())
        this.stakeContainer.position.set(width / 2 - 30, 510)
        this.buttonStart.on('pointerup', () => {
            eventEmitter.emit(Event.playerPressedStart)
        })
        stateMachine.onStateChange(async state => {
            this.buttonStart.disabled = state !== State.Idle
        })
    }
}