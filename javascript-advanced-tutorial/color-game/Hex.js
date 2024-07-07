import {randomNumber, generateNumber} from './helper.js'
import {DIFFICULTY_TOLERANCE} from './config.js'
import {times } from 'lodash/fp'
import Rgb from './rgb.js'

const MAX_RGB_VALUE = 255;

export default class Hex extends Rgb{
    css() {
        const hexR = decimalToHex(this.r)
        const hexG = decimalToHex(this.g)
        const hexB = decimalToHex(this.b)
        return `#${hexR}${hexG}${hexG}`
    }
}

function decimalToHex(decimal) {
    return decimal.toString(16)
}