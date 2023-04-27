export function getSpinResult(): TSpinResult {
    return {
        table: [
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
        ],
        balance: 50,
        /* win: {
            sum: 50,
            lines: [
                { id: 7, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 9, reels: [0, 1, 2, 3, 4], sum: 40 },
                { id: 2, reels: [0, 1, 2, 3, 4], sum: 40 }
            ]
        } */
    }
}
type TSpinResult = {
    table: number[][], balance: number, win?: {
        sum: number,
        lines: {
            id: number,
            reels: number[],
            sum: number,
        }[]
    }
}