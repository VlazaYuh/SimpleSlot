import { Reels } from "../Reels"
import { State } from "../State"
import { getLines } from "../lines"
import { getSpinResult } from "../spinResult"
import { Controller } from "./Controller"
export class AnimationController extends Controller {
    private reels: Reels
    constructor(reels: Reels) {
        super()
        this.reels = reels
    }
    protected async stateChangeCallback(state: State): Promise<void> {
        if (state === State.Animation) {
            const promiseArray: Promise<void>[] = []
            for (let column = 0; column < this.reels.columns; column++) {
                for (let row = 1; row <= this.reels.rows; row++) {
                    promiseArray.push(this.reels.getSymbol(column,row).animate(this.isWinSymbol(getLines().line5,column,row)?'win':'lose'))
                }
            }
            await Promise.all(promiseArray)
        }
        this.stateCompleted()
    }
    private isWinSymbol(lines: number[], column,row) {
        return lines[column]===row
    } 
}
/* for (let column = 0; column < this.reels.columns; column++) {
    for (let row = 1; row <= this.reels.rows; row++) {
        promiseArray.push(this.reels.getSymbol(column, row).animate(this.isWinSymbol(row, column) ?'win':'lose'))
    }
}
await Promise.all(promiseArray) */
/* private isWinSymbol(row: number, column: number) {
    return getSpinResult().win.lines.some(line => line.line === row && line.reels.includes(column))
} */