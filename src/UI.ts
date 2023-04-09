import * as PIXI from 'pixi.js'
import { eventEmitter, stateMachine } from '.'
import { State } from './State'
import { StartButton } from './StartButton'
import { StakeChanger } from './StakeChanger'
import { Event } from './Event'
import { SideMenuButton } from './SideMenuButton'
import { SideMenu } from './SideMenu'
import { OptionsMenu } from './OptionsMenu'

export class UI extends PIXI.Container {
    openSideMenuButton: SideMenuButton
    private buttonStart: StartButton
    private stakeContainer: StakeChanger
    private _stakeIndex: number = 0
    private sideMenu: SideMenu
    private optionsMenu: OptionsMenu
    get stakeIndex() {
        return this._stakeIndex
    }
    init(width: number, height: number) {
        this.buttonStart = this.addChild(new StartButton())
        this.buttonStart.position.set(width / 2 + 70, 510)
        this.stakeContainer = this.addChild(new StakeChanger())
        this.stakeContainer.position.set(width / 2 - 100, 510)
        this.optionsMenu = this.addChild(new OptionsMenu(width, height))
        this.optionsMenu.position.set(width/2,height/2)
        this.sideMenu = this.addChild(new SideMenu(this.optionsMenu))
        this.sideMenu.position.set(width / 2 + 265 + 95, height / 2)
        this.optionsMenu.zIndex=2
        this.sortChildren()
        this.buttonStart.on('pointerup', () => {
            eventEmitter.emit(Event.PlayerPressedStart)
        })
        stateMachine.onStateChange(async state => {
            this.buttonStart.disabled = state !== State.Idle
        })
    }
}