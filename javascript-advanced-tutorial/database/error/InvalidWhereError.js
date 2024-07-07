module.exports = class InvalidWhereError extends Error {
    constructor(tableName) {
        super(tableName)
        this.name = "InvalidWhereError"
    }
}