import { Reels } from "../Reels"
import { State } from "../State"
import { getSpinResult } from "../spinResult"
import { Controller } from "./Controller"
export class AnimationController extends Controller {
    private reels: Reels
    constructor(reels: Reels) {
        super()
        this.reels = reels
    }
    protected stateChangeCallback(state: State): void {
        if (state === State.Animation) {
            const spinResult = getSpinResult()
            const promiseArray: Promise<void>[] = []
            for (let column = 0; column < this.reels.columns; column++) {
                for (let row = 1; row <= this.reels.rows; row++) {
                   /*  this.reels.getSymbol(row,column).animate('win') */
                     if(this.isWinSymbol(row,column)){
                        this.reels.getSymbol(column,row).animate('win')
                    }else{
                        this.reels.getSymbol(column,row).animate('lose')
                    } 
                } 
            }
        }
        this.stateCompleted()
    }
    private isWinSymbol(row: number, column: number) {
        return getSpinResult().win.lines.some(line => line.line === row && line.reels.includes(column))
    }
}