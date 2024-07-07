import {randomNumber, generateNumber} from './helper.js'
import {DIFFICULTY_TOLERANCE} from './config.js'
import {times } from 'lodash/fp'

const MAX_HSL_VALUE = 100;

export default class Hsl {
    constructor(r,g,b, correctTile) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.correctTile = correctTile
    }

    static generateCorrectTile() {
        return new this(
            randomNumber({max: MAX_HSL_VALUE}),
            randomNumber({max: MAX_HSL_VALUE}),
            randomNumber({max: MAX_HSL_VALUE}),
            true
        )
    }

    generateRandomColor(NUMBER_RGB_TILES, difficulty) {
        return new this.constructor(
            generateNumber({
                number: this.r,
                tolerance: DIFFICULTY_TOLERANCE[difficulty],
                MAX_CUTOFF: MAX_HSL_VALUE
            }),
            generateNumber({
                number: this.g,
                tolerance: DIFFICULTY_TOLERANCE[difficulty],
                MAX_CUTOFF: MAX_HSL_VALUE
            }),
            generateNumber({
                number: this.b,
                tolerance: DIFFICULTY_TOLERANCE[difficulty],
                MAX_CUTOFF: MAX_HSL_VALUE
            }),
            false
        )
}
    css() {
        return `hsl(${this.r}%,${this.g}%,${this.b}%)`
    }
}