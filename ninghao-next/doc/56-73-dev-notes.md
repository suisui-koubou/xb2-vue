# 56 - 73 React and Next.js 

Next.js now is the default built-tool for React. 

`npx create-react-app` is deprecated. 

## React Basics 

React uses JSX (JavaScript XML) by default, and XML looks like HTML. 


### Create Element in Plain JavaScript 

To create a root in HTML and render it, 

```jsx
import ReactDOM from 'react-dom/client'; 

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement, 
);

root.render(<h1>Hello World</h1>); 
```

Add a new element to the root, 

```jsx
import React from 'react'; 
import ReactDOM from 'react-dom/client'; 

const root = ReactDOM.createRoot(
    document.getElementById('rooot') as HTMLElement, 
); 

const element = React.createElement('h1', null, 'Hello World')

root.render(); 
```

add a new element with properties and child element, 

```jsx
import React from 'react'; 
import ReactDOM from 'react-dom/client'; 

const root = ReactDOM.createRoot(
    document.getElementById('rooot') as HTMLElement, 
); 

const element = React.createElement(
    'div', 
    {className: 'container'}, 
    React.createElement('h1', {className: 'title'}, 'Hello World')
)

root.render(); 
```

### Create Element in JSX

```jsx
import React from 'react'; 
import ReactDOM from 'react-dom/client'; 

const root = ReactDOM.createRoot(
    document.getElementById('rooot') as HTMLElement, 
); 

const element = <h1 className='title'>Hello World</h1>;

root.render(); 
```

or 

```jsx
import React from 'react'; 
import ReactDOM from 'react-dom/client'; 

const root = ReactDOM.createRoot(
    document.getElementById('rooot') as HTMLElement, 
); 

const name = 'Hello World'; 
const element = <h1 className='title'> {name} </h1>;

root.render(); 
```

Wrap into a container

```jsx
import React from 'react'; 
import ReactDOM from 'react-dom/client'; 

const root = ReactDOM.createRoot(
    document.getElementById('rooot') as HTMLElement, 
); 

const name = 'Hello World'; 
const element = 
    <div className='container'>
        <h1 className='title'{name}></h1>
    </div>;

root.render(); 
```

### Component in React 

Components in React can be either a function or a class, 

#### Function Components 

```jsx
const App = () => {
    const name = 'Hello World'; 
    const element = (
        <div className='container'>
            <h1 className='title'>{name}</h1>
        </div>
    ); 
    return element; 
}

export default App; 
```

To use this compoennt in App, 

```jsx
import App from './app/app'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement, 
);

root.render(<App />);
```


#### Function Components with Properties 

The app page

```javascript
import App from './app/app'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement, 
);

root.render(<App />);
```

The app component, 

```jsx
const App = () => {
    const element = (
        <div className='container'>
            <AppHeader name='Hello'/> 
        </div>
    ); 
    return element; 
}

export default App; 
```

The appheader compoennt, 

```jsx
type AppHeaderProps = {
    name: string; 
}; 

const AppHeader = (props: AppHeaderProps) => {
    const { name } = props; 

    return (
        <div className="app-header">
            <h1 className='title'>{ name }</h1>
        </div>
    ); 
}; 

// 此时 AppHeader组件的 name 属性是可选的。
AppHeader.defaultProps = {
    name: 'NULL' 
}

export default AppHeader; 
```

#### Class Component 

In the AppHeader component, 

```jsx
import { Component } from 'react'; 

type AppHeaderProps = {
    name: string; 
}; 

class AppHeader extends Component<AppHeaderProps> {
    // class是不能直接添加属性，但可以通过static添加共有的资源。
    static defaultProps = { name: 'NULL' }; 

    render() {
        const {name} = this.props;  // 新建的组件一般是实例，
        return (
            <div className='app-header'>
                <h1 className='title'> {name} </h1>
            </div>
        )
    }
} 
```

set states in a class, 

```javascript
import { Component } from 'react'; 

type AppHeaderProps = {
    name: string; 
}; 

type AppHeaderState = {
    emoji: string; 
}; 

class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    
    constructor(props: AppHeaderProps){
        super(props); 
        this.state = {
            emoji: '🌲', 
        }; 
    }


    // class是不能直接添加属性，但可以通过static添加共有的资源。
    static defaultProps = { name: 'NULL' }; 

    render() {
        const {name} = this.props;  // 新建的组件一般是实例，
        const {emoji} = this.state; 

        return (
            <div className='app-header'>
                <h1 className='title'>
                    {name} {emoji} 
                </h1>
            </div>
        )
    }
} 
```

Or 


```javascript
import { Component } from 'react'; 

type AppHeaderProps = {
    name: string; 
}; 

type AppHeaderState = {
    emoji: string; 
}; 

class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    
    // constructor(props: AppHeaderProps){
    //     super(props); 
    //     this.state = {
    //         emoji: '🌲', 
    //     }; 
    // }

    state: AppHeaderState = {
        emoji: '🌲', 
    }

    // class是不能直接添加属性，但可以通过static添加共有的资源。
    static defaultProps = { name: 'NULL' }; 

    render() {
        const {name} = this.props;  // 新建的组件一般是实例，
        const {emoji} = this.state; 

        return (
            <div className='app-header'>
                <h1 className='title'>
                    {name} {emoji} 
                </h1>
            </div>
        )
    }
} 
```


to change the state of a react compoennt by `setState`

```javascript
import { Component } from 'react'; 

type AppHeaderProps = {
    name: string; 
}; 

type AppHeaderState = {
    emoji: string; 
}; 

class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    constructor(props: AppHeaderProps){
        super(props); 
        this.state = {
            emoji: '🌲', 
        }; 

        window.setInterval(() => this.changeEmoji(), 3000); 
    }

    // class是不能直接添加属性，但可以通过static添加共有的资源。
    static defaultProps = {
        name: 'NULL' 
    }; 

    changeEmoji(){
        this.setState({
            emoji: this.state.emoji === '🌲' ? '🍂' : '🌲'
        })
    }

    render() {
        const {name} = this.props;  // 新建的组件一般是实例，
        const {emoji} = this.state; 

        return (
            <div className='app-header'>
                <h1 className='title'>
                    {name} {emoji} 
                </h1>
            </div>
        )
    }
} 
```


Or provide the setState with a function 


```javascript
changeEmoji(){
    this.setState((state, _) => {
        return {
            emoji: state.emoji === '🌲' ? '🍂' : '🌲'; 
        }
    }); 
}
```

### Lifecycles in React Components 

- `constructor`
- `componentDidMount`
- `componentDidUpdate`
- `componentWillOnMount`


```javascript
class AppHeader {
    timer?: number; 

    compoenntDidMount(){
        this.timer = window.setInterval(() => this.changeEmoji(), 3000); 
    }

    compoenntWillUnmount(){
        window.clearInterval(this.timer); 
    }

    compoenntDidUpdate(){
        console.log('AppHeader: componentDidUpdate'); 
    }

}
```


## Add CSS Style to React Component

```javascript
<h1 className='title' style={{cursor: 'pointer', fontSize: '24px'}}>Hello World</h1>
```


or a css file 

The appheader file code 

```javascript
import './app-header.css'

class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    constructor(props: AppHeaderProps){
        super(props); 
        this.state = { emoji: '🌲', }; 
    }
    
    render() {
        const {name} = this.props;  // 新建的组件一般是实例，
        const {emoji} = this.state; 

        return (
            <div className='app-header'>
                <h1 className='title'>
                    {name} {emoji} 
                </h1>
                <div className='content'>
                    hello world!
                </div>
            </div>
        )
    }
} 
```

then the css file 

```css 
.app-header {
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    border-bottom: 1px solid #eaeaea; 
    margin-bottom: 24px; 
}

.app-header > .content {
    display: flex; 
    align-items: center; 
}

```





## Add Events to React Component

```javascript
<h1 onClick={this.changeEmoji}></h1>
```


The class should have a field like 

```javascript
class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    // class是不能直接添加属性，但可以通过static添加共有的资源。
    static defaultProps = {
        name: 'NULL' 
    }; 

    // 点击调用的函数应该是 () => {} 的函数。
    changeEmoji = (event: MouseEvent) => {
        console.log('点击鼠标');
        this.setState((state, _) => {
            return {
                emoji: this.state.emoji === '🌲' ? '🍂' : '🌲'; 
            }; 
        }); 
    }; 

    render() {
        const {name} = this.props;  // 新建的组件一般是实例，
        const {emoji} = this.state; 

        return (
            <div className='app-header'>
                <h1 className='title'>
                    {name} {emoji} 
                </h1>
            </div>
        )
    }
} 
```

## An Example of State

```javascript

type AppHeaderState = {
    darkTheme: boolean; 
}

class AppHeader extends Component<AppHeaderProps, AppHeaderState> {
    constructor(props: AppHeaderProps){
        super(props); 
        this.state = {
            darkTheme: false, 
        }; 
    }


    login() = () => {
        this.setState({darkTheme: true}); 
    }

    logout() = () => {
        this.setState({darkTheme: false}); 
    }

    render() {
        const {name} = this.props;  // 新建的组件一般是实例，
        const {emoji} = this.state; 

    const loginAction = <button onClick={this.login}>暗黑主题</button>
    const logoutAction = <button onClick={this.logout}>默认主题</button>

        return (
            <div className='app-header'>
                <h1 className='title'>
                    <div className='content'>
                        {darkTheme ? '暗黑' : '白色'}; 
                    </div>
                </h1>
            </div>
        )
    }
} 
```


看到 #58 8:33 创建 PostIndex 









