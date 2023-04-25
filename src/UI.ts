import * as PIXI from 'pixi.js'
import { eventEmitter, stateMachine } from '.'
import { State } from './State'
import { StartButton } from './StartButton'
import { StakeChanger } from './StakeChanger'
import { Event } from './Event'
import { SideMenuButton } from './SideMenuButton'
import { SideMenu } from './SideMenu'
import { Options } from './Options'
import { AutoPlay } from './AutoPlay'
import { Fade } from './Fade'
import { AutoPlayButton } from './AutoPlayButton'

export class UI extends PIXI.Container {
    openSideMenuButton: SideMenuButton
    private buttonStart: StartButton
    private stakeContainer: StakeChanger
    private _stakeIndex: number = 0
    private sideMenu: SideMenu
    private options: Options
    private autoPlay: AutoPlay
    private autoPlayOpen: AutoPlayButton
    private autoPlayStop: AutoPlayButton
    private fade: Fade
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
        this.fade = this.addChild(new Fade(width, height))
        this.autoPlay = this.addChild(new AutoPlay())
        this.autoPlay.position.set(width / 2, height / 2)
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
            this.autoPlayStop.visible = true
            this.autoPlayOpen.visible = false
        })
        eventEmitter.on(Event.AutoPlayStopped, () => {
            this.autoPlayStop.visible = false
            this.autoPlayOpen.visible = true
        })
        stateMachine.onStateChange(async state => {
            this.buttonStart.disabled = state !== State.Idle
        })
    }
    optionsShow() {
        this.options.visible = true
    }
}