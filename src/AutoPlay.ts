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
export class AutoPlay extends PIXI.Container {
    private menuContainer = this.addChild(new PIXI.Container())
    private index: number = 0
    private down: SideMenuButton
    private up: SideMenuButton
    private upTarget: number
    private downTarget: number
    private text: PIXI.Text
    private start: AutoPlayButton
    private close: AutoPlayButton
    private maxValue = 300
    autoPlayStarted = false

    constructor() {
        super()
        this.createMenu()
        this.checkMinMax()
        let count = parseInt(this.text.text)
        this.subscribtions(count)
    }
    private subscribtions(count: number) {
        this.up.on('pointerup', () => {
            this.changeAutoPlay(1)
        })
        this.down.on('pointerup', () => {
            this.changeAutoPlay(-1)
        })
        eventEmitter.on(Event.AutoPlayClicked, () => {
            this.menuContainer.visible = true
        })
        this.start.on('pointerup', () => {
            this.autoPlayStarted = true
            eventEmitter.emit(Event.PlayerPressedStart)
            eventEmitter.emit(Event.CloseDialogs)
            eventEmitter.emit(Event.CloseFade)
            eventEmitter.emit(Event.AutoPlayStarted, { count: count, upTarget: Math.ceil(this.upTarget * this.maxValue), downTarget: Math.ceil(this.downTarget * this.maxValue) })
            count = parseInt(this.text.text)
        })
        this.close.on('pointerup', () => {
            eventEmitter.emit(Event.CloseDialogs)
            eventEmitter.emit(Event.CloseFade)
        })
        eventEmitter.on(Event.CloseDialogs, () => this.menuContainer.visible = false)
    }
    private createMenu() {
        this.menuContainer.visible = false
        const background = this.menuContainer.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/optionsMenu.png')))
        background.anchor.set(0.5)
        background.interactive = true
        this.text = this.menuContainer.addChild(new PIXI.Text(`${getAutoPlayDict()[this.index]}`, textStyles.autoPlayStyle))
        this.text.position.set(-80, -75)
        this.text.anchor.set(0.5)
        const autoPlayAmountText = this.menuContainer.addChild(new PIXI.Text('Amount of AutoPlays', textStyles.menuStyle))
        autoPlayAmountText.position.set(-20, -80)
        const title = this.menuContainer.addChild(new PIXI.Text('Auto Play', textStyles.autoPlayStyle))
        title.anchor.set(0.5)
        title.y = -125
        this.createButtonsAndSliders()
    }
    private createButtonsAndSliders() {
        this.down = this.menuContainer.addChild(new SideMenuButton())
        this.down.position.set(-80, -75)
        this.up = this.menuContainer.addChild(new SideMenuButton())
        this.up.position.set(-80, -75)
        this.down.pivot.x = this.up.pivot.x = -40
        this.down.rotation = Math.PI
        const sliderUp = this.menuContainer.addChild(this.createSlider(200, 0, this.maxValue, 'If balance increases by', target => {
            this.upTarget = target
        }))
        sliderUp.position.set(-130, -30)
        const sliderDown = this.menuContainer.addChild(this.createSlider(200, 0, this.maxValue, 'If balance decreases by', target => {
            this.downTarget = target
        }))
        sliderDown.position.set(-130, 20)
        this.start = this.menuContainer.addChild(new AutoPlayButton('Start'))
        this.start.position.set(90, 120)
        this.close = this.menuContainer.addChild(new AutoPlayButton('Cancel'))
        this.close.position.set(-90, 120)
    }
    private changeAutoPlay(value: number) {
        this.index += value
        this.text.text = `${getAutoPlayDict()[this.index]}`
        this.checkMinMax()
    }
    private checkMinMax() {
        this.down.disabled = !this.index
        this.up.disabled = this.index === getAutoPlayDict().length - 1
    }
    private createSlider(width: number, target: number, maxValue: number, descriptionText: string, callback: (value: number) => void) {
        const container = new PIXI.Container()
        const slider = container.addChild(new Slider(width))
        const valueText = container.addChild(new PIXI.Text(`${target}`, textStyles.autoPlayStyle))
        const descriptionTextt = container.addChild(new PIXI.Text(descriptionText, textStyles.menuStyle))
        descriptionTextt.anchor.set(0, 0.5)
        descriptionTextt.y = 20
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
