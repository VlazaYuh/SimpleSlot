import * as PIXI from 'pixi.js'
export const styles = {
    stakeStyle: new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    }),
    winStyle: new PIXI.TextStyle({
        fontFamily: 'Blrrpix',
        fontSize: 128,
        fill: ['#660000', '#ffffff']
    }),
    winStakeStyle: new PIXI.TextStyle({
        fontFamily: 'Blrrpix',
        fontSize: 36,
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    })
}