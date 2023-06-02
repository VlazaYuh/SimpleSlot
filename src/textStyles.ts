import * as PIXI from 'pixi.js'
export const textStyles = {
    stakeStyle: new PIXI.TextStyle({
        fontFamily: 'Blrrpix',
        fontSize: 36,
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
        align: 'center'
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
    }),
    menuStyle: new PIXI.TextStyle({
        fontFamily: 'Blrrpix',
        fontSize: 11,
        fill: ['#660000', '#000000'],
        stroke: '#4a1850',
    }),
    autoPlayStyle: new PIXI.TextStyle({
        fontFamily: 'Blrrpix',
        fontSize: 40,
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    })
}