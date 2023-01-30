import { delay, init, loadingGraphics, stateMachine } from ".."
import { State } from "../State"
import { Controller } from "./Controller"
import * as PIXI from 'pixi.js'

export class LoadingController extends Controller {
    progress: number
    protected async stateChangeCallback(state: State) {
        if (state === State.Loading) {
            PIXI.Loader.shared.add('assets/fruits.json')
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