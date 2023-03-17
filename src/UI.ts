import * as PIXI from 'pixi.js'
import { stateMachine } from '.'
import { State } from './State'
import { stakeDict } from './stakeDict'
import { style } from './textStyles'
import { StakeButton } from './StakeButton'
import { StartButton } from './startButton'
import { StakeChanger } from './StakeChanger'
export class UI extends PIXI.Container {
    private buttonStart: StartButton
    private stakeContainer: StakeChanger
    private _stakeIndex: number = 0
    get stakeIndex() {
        return this._stakeIndex
    }
    init(width: number) {
        this.buttonStart = this.addChild(new StartButton(width / 2 + 70, 510))
        this.stakeContainer = this.addChild(new StakeChanger(width))
        stateMachine.onStateChange(async state => {
            this.buttonStart.disabled = state !== State.Idle
        })
    }
}