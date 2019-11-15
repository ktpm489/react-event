var type = require('type-detect');
class EventRegister {
    static listeners = {
        count : 0,
        refs : {}
    }
    static addEventListener(eventName , callback) {
        if (type(eventName) === 'string' && type(callback) === 'function' ){
            EventRegister.listeners.count++
            const eventId = 'id'+ EventRegister.listeners.count
            EventRegister.listeners.refs[eventId]= {
                name : eventName,
                callback
            }
            return eventId
        }
        return false
    }
    static removeEventListener(id) {
        if (type(id) ==='string') {
            return delete EventRegister.listeners.refs[id]
        }
        return false
    }
    static removeAllListeners() {
        let removeError = false
        Object.keys(EventRegister.listeners.refs).forEach(id => {
            const removedSuccess = delete EventRegister.listeners.refs[id]
            removeError = (!removeError) ? !removedSuccess : removeError
        })
        return !removeError
    }

    static emitEvent(eventName, data) {
        Object.keys(EventRegister.listeners.refs).forEach(id => { 
            if (EventRegister.listeners.refs[id] && eventName === EventRegister.listeners.refs[id].name) {
                EventRegister.listeners.refs[id].callback(data)
            }           
        })
    }

    static on(eventName, callback) {
        return EventRegister.addEventListener(eventName, callback)
    }
    static rm(eventName) {
        return EventRegister.removeEventListener(eventName)
    }
    static rmAll() {
        return EventRegister.removeAllListeners()
    }
    static emit(eventName, data) {
        EventRegister.emitEvent(eventName,data)
    }
}
export { EventRegister }

