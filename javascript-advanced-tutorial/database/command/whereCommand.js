const {isMatch} = require("lodash")

class whereCommand {
    constructor(conditions) {
        this.conditions = conditions
    }
    
    perform(object) {
        if (this.conditions === undefined) return false
        return object.filter(object => {
            return isMatch(object, this.conditions)
        })
    }
}

module.exports = {
    whereCommand
}