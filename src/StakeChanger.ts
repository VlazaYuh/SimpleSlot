import * as PIXI from 'pixi.js'
import { eventEmitter, stateMachine } from '.'
import { State } from './State'
import { stakeDict } from './stakeDict'
import { style } from './textStyles'
import { StakeButton } from './StakeButton'
export class StakeChanger extends PIXI.Container {
    private stakeUp: StakeButton
    private stakeDown: StakeButton
    private stakeIndex: number = 0
    private stakeText: PIXI.Text
    constructor(width: number) {
        super()
        this.stakeUp = this.addChild(new StakeButton(width / 2 - 30, 510))
        this.stakeDown = this.addChild(new StakeButton(width / 2 - 30, 510))
        this.stakeDown.pivot.set(-100, 0)
        this.stakeDown.rotation = Math.PI
        this.stakeText = this.addChild(new PIXI.Text(`${stakeDict[0]}`, style))
        this.stakeText.anchor.set(0.5)
        this.stakeText.position.set(width / 2 - 30, 510)
        this.stakeText.pivot.set(50, 0)
        stateMachine.onStateChange(async state => {
            this.stakeUp.disabled = state !== State.Idle
            this.stakeDown.disabled = state !== State.Idle
            if (!this.stakeIndex) {
                this.stakeDown.disabled = true
            }
            if (this.stakeIndex === stakeDict.length - 1) {
                this.stakeUp.disabled = true
            }
        })
        this.stakeUp.on('pointerup', () => {
            this.changeStake(1)
        })
        this.stakeDown.on('pointerup', () => {
            this.changeStake(-1)
        })
    }
    private changeStake(value: number) {
        this.stakeIndex += value
        eventEmitter.emit(`stake_changed`, this.stakeIndex)
        this.stakeText.text = `${stakeDict[this.stakeIndex]}`
        this.stakeDown.disabled = false
        this.stakeUp.disabled = false
        if (this.stakeIndex === 0) {
            this.stakeDown.disabled = true
        }
        if (this.stakeIndex === stakeDict.length - 1) {
            this.stakeUp.disabled = true
        }
    }
}