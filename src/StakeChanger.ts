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
    constructor() {
        super()
        this.stakeUp = this.addChild(new StakeButton())
        this.stakeUp.x = - 20
        this.stakeDown = this.addChild(new StakeButton())
        this.stakeDown.x = - 20
        this.stakeDown.pivot.set(-100, 0)
        this.stakeDown.rotation = Math.PI
        this.stakeText = this.addChild(new PIXI.Text(`${stakeDict[0]}`, style))
        this.stakeText.anchor.set(0.5)
        this.stakeText.x = -70
        stateMachine.onStateChange(async state => {
            this.stakeUp.disabled = state !== State.Idle
            this.stakeDown.disabled = state !== State.Idle
            this.checkDisable()
        })
        this.stakeUp.on('pointerup', () => {
            this.changeStakeBy(1)
        })
        this.stakeDown.on('pointerup', () => {
            this.changeStakeBy(-1)
        })
    }
    private changeStakeBy(value: number) {
        this.stakeIndex += value
        eventEmitter.emit(`stake_changed`, this.stakeIndex)
        this.stakeText.text = `${stakeDict[this.stakeIndex]}`
        this.stakeDown.disabled = false
        this.stakeUp.disabled = false
        this.checkDisable()
    }
    private checkDisable() {
        if (this.stakeIndex === 0) {
            this.stakeDown.disabled = true
        }
        if (this.stakeIndex === stakeDict.length - 1) {
            this.stakeUp.disabled = true
        }
    }
}