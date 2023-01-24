export function getSpinResult(){
    return {
        table: [[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4]],
        balance: 50,
        win: {sum: 50, lines: [{line: 1, reels:[0,1,2], sum: 10}, {line: 3, reels:[0,1,2,3,4], sum: 40}]}
    }
}