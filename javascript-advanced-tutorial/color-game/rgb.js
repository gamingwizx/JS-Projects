import {randomNumber, generateNumber} from './helper.js'
import {DIFFICULTY_TOLERANCE} from './config.js'
import {times } from 'lodash/fp'

const MAX_RGB_VALUE = 255;

export default class Rgb {
    constructor(r,g,b, correctTile) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.correctTile = correctTile
    }

    static generateCorrectTile() {
        return new this(
            randomNumber({max: MAX_RGB_VALUE}),
            randomNumber({max: MAX_RGB_VALUE}),
            randomNumber({max: MAX_RGB_VALUE}),
            true
        )
    }

    generateRandomColor(NUMBER_RGB_TILES, difficulty) {
        return new this.constructor(
            generateNumber({
                number: this.r,
                tolerance: DIFFICULTY_TOLERANCE[difficulty],
                MAX_CUTOFF: MAX_RGB_VALUE
            }),
            generateNumber({
                number: this.g,
                tolerance: DIFFICULTY_TOLERANCE[difficulty],
                MAX_CUTOFF: MAX_RGB_VALUE
            }),
            generateNumber({
                number: this.b,
                tolerance: DIFFICULTY_TOLERANCE[difficulty],
                MAX_CUTOFF: MAX_RGB_VALUE
            }),
            false
        )
}
    css() {
        return `rgb(${this.r},${this.g},${this.b})`
    }
}