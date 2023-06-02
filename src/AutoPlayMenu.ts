import * as PIXI from 'pixi.js'
import { eventEmitter, stateMachine } from '.'
import { Checkbox } from './Checkbox'
import { textStyles } from './textStyles'
import { Event } from './Event'
import { State } from './State'
import { AutoPlayButton } from './AutoPlayButton'
import { Slider } from './Slider'
import { getAutoPlayDict } from './autoPlayDict'
import { SideMenuButton } from './SideMenuButton'
export class AutoPlayMenu extends PIXI.Container {
    private index: number = 0
    private down: SideMenuButton
    private up: SideMenuButton
    private upTarget: number
    private downTarget: number
    private text: PIXI.Text
    private start: AutoPlayButton
    private close: AutoPlayButton
    private maxValue = 300
    private count = getAutoPlayDict()[this.index]
    autoPlayStarted = false
    constructor() {
        super()
        this.createElements()
        this.checkMinMax()
        this.subscribtions()
    }
    private subscribtions() {
        this.up.on('pointerup', () => {
            this.changeAutoPlay(1)
        })
        this.down.on('pointerup', () => {
            this.changeAutoPlay(-1)
        })
        eventEmitter.on(Event.AutoPlayClicked, () => {
            this.visible = true
        })
        this.start.on('pointerup', () => {
            this.autoPlayStarted = true
            eventEmitter.emit(Event.PlayerPressedStart)
            eventEmitter.emit(Event.CloseDialogs)
            eventEmitter.emit(Event.CloseFade)
            eventEmitter.emit(Event.AutoPlayStarted, { count: this.count, upTarget: Math.ceil(this.upTarget * this.maxValue), downTarget: Math.ceil(this.downTarget * this.maxValue) })
        })
        this.close.on('pointerup', () => {
            eventEmitter.emit(Event.CloseDialogs)
            eventEmitter.emit(Event.CloseFade)
        })
        eventEmitter.on(Event.CloseDialogs, () => this.visible = false)
    }
    private createElements() {
        const countPosition = [-80, -75]
        this.visible = false
        const background = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/optionsMenu.png')))
        background.anchor.set(0.5)
        background.interactive = true
        this.text = this.addChild(new PIXI.Text(`${this.count}`, textStyles.autoPlayStyle))
        this.text.position.set(...countPosition)
        this.text.anchor.set(0.5)
        const autoPlayAmountText = this.addChild(new PIXI.Text('Amount of AutoPlays', textStyles.menuStyle))
        autoPlayAmountText.position.set(-20, -80)
        const title = this.addChild(new PIXI.Text('Auto Play', textStyles.autoPlayStyle))
        title.anchor.set(0.5)
        title.y = -125
        this.down = this.addChild(new SideMenuButton())
        this.down.position.set(...countPosition)
        this.up = this.addChild(new SideMenuButton())
        this.up.position.set(...countPosition)
        this.down.pivot.x = this.up.pivot.x = -40
        this.down.rotation = Math.PI
        this.start = this.addChild(new AutoPlayButton('Start'))
        this.start.position.set(90, 120)
        this.close = this.addChild(new AutoPlayButton('Cancel'))
        this.close.position.set(-90, 120)
        this.createSliders()
    }
    private createSliders() {
        const sliderUp = this.addChild(this.createSlider(200, 0, this.maxValue, 'Maximum limit', target => {
            this.upTarget = target
        }))
        sliderUp.position.set(-130, -30)
        const sliderDown = this.addChild(this.createSlider(200, 0, this.maxValue, 'Minimum limit', target => {
            this.downTarget = target
        }))
        sliderDown.position.set(-130, 20)
    }
    private changeAutoPlay(value: number) {
        this.index += value
        this.count = getAutoPlayDict()[this.index]
        this.text.text = `${this.count}`
        this.checkMinMax()
    }
    private checkMinMax() {
        this.down.disabled = !this.index
        this.up.disabled = this.index === getAutoPlayDict().length - 1
    }
    private createSlider(width: number, target: number, maxValue: number, description: string, callback: (value: number) => void) {
        const container = new PIXI.Container()
        const slider = container.addChild(new Slider(width))
        const valueText = container.addChild(new PIXI.Text(`${target}`, textStyles.autoPlayStyle))
        const descriptionText = container.addChild(new PIXI.Text(description, textStyles.menuStyle))
        descriptionText.anchor.set(0, 0.5)
        descriptionText.y = 20
        valueText.scale.set(0.9)
        valueText.x = 240
        valueText.anchor.set(0.5)
        slider.on('slidermovement', (target) => {
            valueText.text = `${Math.ceil(target * maxValue)}`
            callback(target)
        })
        return container
    }
}
