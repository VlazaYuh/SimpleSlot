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
    private autoPlayIndex: number = 0
    private autoPlayDown: SideMenuButton
    private autoPlayUp: SideMenuButton
    private autoPlayText: PIXI.Text
    private winIncrease: number = 0
    private winDecrease: number = 0
    private autoPlayStart: AutoPlayButton
    private autoPlayStop: AutoPlayButton
    private autoPlayStarted = false
    constructor() {
        super()
        this.createMenu()
        this.checkMinMax()
        let numberOfAutoPlays = parseInt(this.autoPlayText.text)
        this.subscribtions(numberOfAutoPlays)
    }
    private subscribtions(numberofAutoPlays: number) {
        this.autoPlayUp.on('pointerup', () => {
            this.changeAutoPlay(1)
        })
        this.autoPlayDown.on('pointerup', () => {
            this.changeAutoPlay(-1)
        })
        eventEmitter.on(Event.AutoPlayClicked, () => {
            this.menuContainer.visible = true
        })
        this.autoPlayStart.on('pointerup', () => {
            this.autoPlayStarted = true
            eventEmitter.emit(Event.PlayerPressedStart)
            eventEmitter.emit(Event.CloseDialogs)
            eventEmitter.emit(Event.CloseFade)
            numberofAutoPlays = parseInt(this.autoPlayText.text)
        })
        this.autoPlayStop.on('pointerup', () => {
            this.autoPlayStarted = false
            eventEmitter.emit(Event.CloseDialogs)
            eventEmitter.emit(Event.CloseFade)
        })
        stateMachine.onStateChange(state => {
            if (this.autoPlayStarted && numberofAutoPlays > 1) {
                return new Promise(resolve => {
                    if (state === State.Idle) {
                        eventEmitter.emit(Event.PlayerPressedStart)
                        numberofAutoPlays--
                        /*  console.log(`${numberofAutoPlays}`) */
                    }
                    resolve()
                })
            } else {
                this.autoPlayStarted = false
            }
        })
        eventEmitter.on(Event.CloseDialogs, () => this.menuContainer.visible = false)
    }
    private createMenu() {
        this.menuContainer.visible = false
        const menu = this.menuContainer.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/optionsMenu.png')))
        menu.anchor.set(0.5)
        menu.interactive = true
        this.autoPlayText = this.menuContainer.addChild(new PIXI.Text(`${getAutoPlayDict()[this.autoPlayIndex]}`, textStyles.autoPlayStyle))
        this.autoPlayText.position.set(-80, -75)
        this.autoPlayText.anchor.set(0.5)
        const autoPlayAmountText = this.menuContainer.addChild(new PIXI.Text('Amount of AutoPlays', textStyles.menuStyle))
        autoPlayAmountText.position.set(-20, -80)
        const title = this.menuContainer.addChild(new PIXI.Text('Auto Play', textStyles.autoPlayStyle))
        title.anchor.set(0.5)
        title.y = -125
        this.createButtonsAndSliders()
    }
    private createButtonsAndSliders() {
        this.autoPlayDown = this.menuContainer.addChild(new SideMenuButton())
        this.autoPlayDown.position.set(-80, -75)
        this.autoPlayUp = this.menuContainer.addChild(new SideMenuButton())
        this.autoPlayUp.position.set(-80, -75)
        this.autoPlayDown.pivot.x = this.autoPlayUp.pivot.x = -40
        this.autoPlayDown.rotation = Math.PI
        const sliderUp = this.menuContainer.addChild(this.createOption(200, this.winIncrease, 300, 'If balance increases by'))
        sliderUp.position.set(-140, -30)
        const sliderDown = this.menuContainer.addChild(this.createOption(200, this.winDecrease, 300, 'If balance decreases by'))
        sliderDown.position.set(-140, 20)
        this.autoPlayStart = this.menuContainer.addChild(new AutoPlayButton('Start'))
        this.autoPlayStart.position.set(90, 120)
        this.autoPlayStop = this.menuContainer.addChild(new AutoPlayButton('Cancel'))
        this.autoPlayStop.position.set(-90, 120)
    }
    private changeAutoPlay(value: number) {
        this.autoPlayIndex += value
        this.autoPlayText.text = `${getAutoPlayDict()[this.autoPlayIndex]}`
        this.checkMinMax()
    }
    private checkMinMax() {
        this.autoPlayDown.disabled = !this.autoPlayIndex
        this.autoPlayUp.disabled = this.autoPlayIndex === getAutoPlayDict().length - 1
    }
    private createOption(sliderWidth: number, sliderTarget: number, maxValue: number, additionalText: string) {
        const container = new PIXI.Container()
        const slider = container.addChild(new Slider(sliderWidth, sliderTarget, maxValue))
        const sliderText = container.addChild(new PIXI.Text(`${sliderTarget}`, textStyles.autoPlayStyle))
        const sliderAdditionalText = container.addChild(new PIXI.Text(additionalText, textStyles.menuStyle))
        sliderAdditionalText.anchor.set(0, 0.5)
        sliderAdditionalText.y = 20
        sliderText.scale.set(0.9)
        sliderText.x = 240
        sliderText.anchor.set(0.5)
        slider.on('slidermovement', (target) => {
            sliderText.text = `${Math.trunc(target)}`
        })
        return container
    }
}
