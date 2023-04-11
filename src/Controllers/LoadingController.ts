import { loadingGraphics } from ".."
import { State } from "../State"
import { Controller } from "./Controller"
import * as PIXI from 'pixi.js'

export class LoadingController extends Controller {
    progress: number
    protected async stateChangeCallback(state: State) {
        if (state === State.Loading) {
            PIXI.Loader.shared.add('assets/fruits.json')
            PIXI.Loader.shared.add('assets/star.png')
            PIXI.Loader.shared.add('assets/arrow.png')
            PIXI.Loader.shared.add('assets/startButton.png')
            PIXI.Loader.shared.add('assets/options.png')
            PIXI.Loader.shared.add('assets/sideMenu.png')
            PIXI.Loader.shared.add('assets/optionsMenu.png')
            PIXI.Loader.shared.add('assets/check.png')
            PIXI.Loader.shared.add('assets/checkbox.png')
            PIXI.Loader.shared.add('assets/BackgroundMusic.mp3')
            PIXI.Loader.shared.add('assets/Click.mp3')
            PIXI.Loader.shared.add('assets/ReelsSpin.mp3')
            PIXI.Loader.shared.add('assets/ReelsAllEnd.mp3')
            PIXI.Loader.shared.add('assets/BigWin.mp3')
            PIXI.Loader.shared.add('assets/ReelsSpinEnd.mp3')
            PIXI.Loader.shared.add('assets/particles.json')
            PIXI.Loader.shared.add('assets/blrrpixs016.ttf')
            PIXI.Ticker.shared.add(this.loading)
            PIXI.Loader.shared.onComplete.add(() => this.stateCompleted())
            PIXI.Loader.shared.load()
            return
        }
        this.stateCompleted()
    }
    private async loading() {
        this.progress = PIXI.Loader.shared.progress
        PIXI.Loader.shared.onProgress.add(() => {
            loadingGraphics.drawRectProgress(this.progress)
        })
        if (this.progress === 100) {
            loadingGraphics.visible = false
        }
        PIXI.Ticker.shared.remove(this.loading)
        return
    }
}