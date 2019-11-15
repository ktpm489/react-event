"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventRegister = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = require('type-detect');

var EventRegister =
/*#__PURE__*/
function () {
  function EventRegister() {
    _classCallCheck(this, EventRegister);
  }

  _createClass(EventRegister, null, [{
    key: "addEventListener",
    value: function addEventListener(eventName, callback) {
      if (type(eventName) === 'string' && type(callback) === 'function') {
        EventRegister.listeners.count++;
        var eventId = 'id' + EventRegister.listeners.count;
        EventRegister.listeners.refs[eventId] = {
          name: eventName,
          callback: callback
        };
        return eventId;
      }

      return false;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(id) {
      if (type(id) === 'string') {
        return delete EventRegister.listeners.refs[id];
      }

      return false;
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      var removeError = false;
      Object.keys(EventRegister.listeners.refs).forEach(function (id) {
        var removedSuccess = delete EventRegister.listeners.refs[id];
        removeError = !removeError ? !removedSuccess : removeError;
      });
      return !removeError;
    }
  }, {
    key: "emitEvent",
    value: function emitEvent(eventName, data) {
      Object.keys(EventRegister.listeners.refs).forEach(function (id) {
        if (EventRegister.listeners.refs[id] && eventName === EventRegister.listeners.refs[id].name) {
          EventRegister.listeners.refs[id].callback(data);
        }
      });
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      return EventRegister.addEventListener(eventName, callback);
    }
  }, {
    key: "rm",
    value: function rm(eventName) {
      return EventRegister.removeEventListener(eventName);
    }
  }, {
    key: "rmAll",
    value: function rmAll() {
      return EventRegister.removeAllListeners();
    }
  }, {
    key: "emit",
    value: function emit(eventName, data) {
      EventRegister.emitEvent(eventName, data);
    }
  }]);

  return EventRegister;
}();

exports.EventRegister = EventRegister;

_defineProperty(EventRegister, "listeners", {
  count: 0,
  refs: {}
});