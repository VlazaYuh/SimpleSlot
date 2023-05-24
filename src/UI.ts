import * as PIXI from 'pixi.js'
import { eventEmitter, stateMachine, userController } from '.'
import { State } from './State'
import { StartButton } from './StartButton'
import { StakeChanger } from './StakeChanger'
import { Event } from './Event'
import { SideMenu } from './SideMenu'
import { Options } from './Options'
import { AutoPlayMenu } from './AutoPlayMenu'
import { Fade } from './Fade'
import { AutoPlayButton } from './AutoPlayButton'
import { data } from './Data'
import { textStyles } from './textStyles'
import { getSpinResult } from './spinResult'
export class UI extends PIXI.Container {
    private buttonStart: StartButton
    private stakeContainer: StakeChanger
    private _stakeIndex: number = 0
    private sideMenu: SideMenu
    private options: Options
    private autoPlayMenu: AutoPlayMenu
    private autoPlayOpen: AutoPlayButton
    private autoPlayStop: AutoPlayButton
    get stakeIndex() {
        return this._stakeIndex
    }
    init(width: number, height: number) {
        this.buttonStart = this.addChild(new StartButton())
        this.buttonStart.position.set(width / 2 + 70, 510)
        this.stakeContainer = this.addChild(new StakeChanger())
        this.stakeContainer.position.set(width / 2 - 100, 510)
        this.sideMenu = this.addChild(new SideMenu())
        this.sideMenu.position.set(width / 2 + 265 + 95, height / 2)
        this.autoPlayOpen = this.addChild(new AutoPlayButton('AutoPlay'))
        this.autoPlayOpen.position.set(width / 2 + 170, height / 2 + 205)
        this.autoPlayStop = this.addChild(new AutoPlayButton('Stop'))
        this.autoPlayStop.position = this.autoPlayOpen.position
        this.autoPlayStop.visible = false
        const turboModeOff = this.addChild(new AutoPlayButton('OFF'))
        turboModeOff.position.set(width / 2 + 240, height / 2 + 205)
        turboModeOff.visible === data.turboMode
        const turboModeOn = this.addChild(new AutoPlayButton('TurboMode'))
        turboModeOn.position = turboModeOff.position
        turboModeOn.visible !== data.turboMode
        const balance = this.addChild(new PIXI.Text(`Balance\n${getSpinResult().balance}`, textStyles.stakeStyle))
        balance.anchor.set(0.5)
        balance.position.set(width / 2 - 250, height / 2 + 200)
        const freeSpin = this.addChild(new PIXI.Text(`FreeSpins\n${getSpinResult().freeSpin.freeSpins}`, textStyles.stakeStyle))
        freeSpin.anchor.set(0.5)
        freeSpin.position.set(width / 2 - 250, height / 2 - 150)
        freeSpin.visible = false
        const fade = this.addChild(new Fade(width, height))
        this.autoPlayMenu = this.addChild(new AutoPlayMenu())
        this.autoPlayMenu.position.set(width / 2, height / 2)
        this.options = this.addChild(new Options())
        this.options.position.set(width / 2, height / 2)
        this.autoPlayOpen.on('pointerup', () => {
            eventEmitter.emit(Event.AutoPlayClicked)
            eventEmitter.emit(Event.OpenFade)
        })
        this.buttonStart.on('pointerup', () => {
            eventEmitter.emit(Event.PlayerPressedStart)
        })
        this.autoPlayStop.on('pointerup', () => eventEmitter.emit(Event.AutoPlayStopped))
        eventEmitter.on(Event.AutoPlayStarted, () => {
            this.autoPlayVisibility(true)
        })
        turboModeOff.on('pointerup', () => {
            data.turboMode = false
            turboModeOff.visible = false
            turboModeOn.visible = true
        })
        turboModeOn.on('pointerup', () => {
            data.turboMode = true
            turboModeOn.visible = false
            turboModeOff.visible = true
        })
        eventEmitter.on(Event.BalanceChanged, () => balance.text = `Balance\n${getSpinResult().balance}`)
        stateMachine.onStateChange(async state => {
            if (state === State.Idle) {
                freeSpin.visible = false
            }
            if (state === State.Spinning) {
                freeSpin.visible = getSpinResult().freeSpin.freeSpins !== 0
                freeSpin.text = `FreeSpins\n${getSpinResult().freeSpin.freeSpins - 1}`
            }
            if (state === State.Animation) {
                freeSpin.visible = getSpinResult().freeSpin.freeSpins ? true : false
                freeSpin.text = `FreeSpins\n${getSpinResult().freeSpin.freeSpins}`
            }
            turboModeOff.disabled = state !== State.Idle
            turboModeOn.disabled = state !== State.Idle
            this.buttonStart.disabled = state !== State.Idle
            this.autoPlayOpen.disabled = state === State.Spinning || state === State.Animation
            if ((userController.autoPlay && state !== State.Idle) !== this.autoPlayStop.visible) {
                this.autoPlayVisibility(userController.autoPlay && state !== State.Idle)
            }
        })
    }
    private autoPlayVisibility(value: boolean) {
        this.autoPlayStop.visible = value
        this.autoPlayOpen.visible = !value
    }
}