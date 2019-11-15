# React Event Listeners


## Why

In some very specific cases it can be charming to have a simple global event listener. While working with global event listeners **you don't have to pass touch events through the component tree** into other components or can **bypass easily the redux architecture** for example.

## Installation

```
npm install --save react-event-listeners
```

or

```
yarn add react-event-listeners
```

## Usage Example

*Hint: The event listeners also work across different files. You only have to import the ```EventRegister``` in every file you need to send or receive your events.*

```javascript
import { EventRegister } from 'react-event-listeners'

/*
 * RECEIVER COMPONENT
 */
class Receiver extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data: 'no data',
        }
    }
    
    componentWillMount() {
        this.listener = EventRegister.addEventListener('myDemoEvent', (data) => {
            this.setState({
                data,
            })
        })
    }
    
    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }
    
    render() {
        return <Text>{this.state.data}</Text>
    }
}

/*
 * SENDER COMPONENT
 */
const Sender = (props) => (
    <TouchableHighlight
        onPress={() => {
            EventRegister.emit('myDemoEvent', 'it works!!!')
        })
    ><Text>Send Event</Text></TouchableHighlight>
)


| static method       | return value      | description                                                    |
| :------------------ | :---------------- | :------------------------------------------------------------- |
| addEventListener    | string \| boolean | return value is the id of the event listener or false on error |
| removeEventListener | boolean           | true on success or otherwise false                             |
| removeAllListeners  | boolean           | true on success or otherwise false                             |
| emitEvent           | void              | no return value                                                |
| on                  | string \| boolean | shortsyntax for addEventListener                               |
| rm                  | boolean           | shortsyntax for removeEventListener                            |
| rmAll               | boolean           | shortsyntax for removeAllListeners                             |
| emit                | void              | shortsyntax for emitEvent                                      |
