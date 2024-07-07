module.exports =  function safeParseJSON(json) {
    try {
        return JSON.parse(json)
    } catch(e) {
        return 
    }
}