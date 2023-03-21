import * as PIXI from 'pixi.js'
import { eventEmitter, stateMachine } from '.'
import { State } from './State'
import { stakeDict } from './stakeDict'
import { styles } from './textStyles'
import { StakeButton } from './StakeButton'
import { Event } from './Event'
export class StakeChanger extends PIXI.Container {
    private stakeUp: StakeButton
    private stakeDown: StakeButton
    private stakeIndex: number = 0
    private stakeText: PIXI.Text
    constructor() {
        super()
        this.stakeUp = this.addChild(new StakeButton())
        this.stakeUp.pivot.x = -40
        this.stakeDown = this.addChild(new StakeButton())
        this.stakeDown.pivot.x = -40
        this.stakeDown.rotation = Math.PI
        this.stakeText = this.addChild(new PIXI.Text(`${stakeDict[0]}`, styles.stakeStyle))
        this.stakeText.anchor.set(0.5)
        stateMachine.onStateChange(async state => {
            this.stakeUp.disabled = state !== State.Idle
            this.stakeDown.disabled = state !== State.Idle
            if (state === State.Idle) {
                this.checkMinMax()
            }
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
        eventEmitter.emit(Event.stakeChanged, this.stakeIndex)
        this.stakeText.text = `${stakeDict[this.stakeIndex]}`
        this.checkMinMax()
    }
    private checkMinMax() {
        if (this.stakeIndex === 0) {
            this.stakeDown.disabled = true
        } else {
            this.stakeDown.disabled = false
        }
        if (this.stakeIndex === stakeDict.length - 1) {
            this.stakeUp.disabled = true
        } else {
            this.stakeUp.disabled = false
        }
    }
}