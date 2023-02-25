import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { Reels } from "./Reels"
import { State } from "./State"
import { getLinesDict } from "./linesDict"
import { getSpinResult } from "./spinResult"
import { app, delay } from '.'
import { Emitter, EmitterConfigV3, upgradeConfig } from '@pixi/particle-emitter'
export const emitterXY = {
    x: 0,
    y: 0
}