# React入门

1. 安装一个脚手架

   npm install create-react-app -g.

2. 创建一个项目

   create-react-app react01

3. react的api比较少，核心是js 的功力

4. 老师搭建的学习网站

   http://react.shengxinjing.cn/

5. 第一行代码

   ```javascript
   // index.js
   // 负责UI渲染,渲染，把UI描述层做好
   import React from 'react'
   // 与浏览器相关的所有操作，就是渲染到具体的浏览器中的专门进行了抽离，为了实现多端共享，如果使用native开发，下面的引入删除即可
   import ReactDom from 'react-dom'
   
   class App extends React.Component{
       render(){
           return <button>hello</button>
       }
   }
   // check public/index.html for the element identified as root
   ReactDOM.render(<App />,
                  document.querySelector('#root'))
   
   ```

6. JSX(虚拟DOM)

7. state(组件内定义变量且用于页面渲染时)和setState（修改state内变量用）——单向数据流

   1. state类似vue里的data(){}
   2. 当组件内变量不会用于页面渲染时，就可以在组件内的任意地方定义

8. mountNode: 应用的容器

9. 外部数据传递——props，不要改

10. 事件监听：

  ```javascript
  // 1 easiest
  onClick={()=>this.handleClick(data)}
  // 2
  
  ```

11. 当给页面的button挂载事件处理方法时，会出现this指向问题，解决方案：

    1. constructor中this.handleChange = this.handleChange.bind(this)

    2. jsx中onClick={(e)=>{this.handleChange(data)}}

    3. onClick={this.handleChange.bind(this)}

       **每渲染一次都要挂载一次，对于效率影响非常大，不推荐 **

    4. 推荐：

       ```javascript
       // 定义部分
       handleChange = (e)=>{
           //通过箭头函数的方式确保作用域为当前组件
           this.setState({
               text: e.target.value
           })
       }
       // jsx部分
       onClick={this.handleChange}
       ```

12. 只做数据渲染的特殊组件

    不需要定义class

13. 时间旅行

14. 虚拟DOM

    >

15. 生命周期

    1. componentWillMount
    2. componentDidMount
    3. componnetWillReceiveProps(props){}
    4. shouldComponentUpdate(props){}
    5. componentDidUpdate

16. 错误捕捉的生命周期函数（catch边界）

    1. componentDidCatch(error,info){}

17. react组件化

    react没有vue那么多API，基本全部都是组件，react的开发模式，

    ```javascript
    UI = F(state)
    ```

18. antd组件库使用

    ```bash
    npm install antd --save
    ```

    https://ant.design

    其他扩展组件：

    > 1. 配置按需加载：安装react-app-rewired取代react-scripts，可以扩展webpack的配置，类似vue.config.js
    >
    >    ```bash
    >    npm install react-app-rewired@2.0.2-next.0 babel-plugin-import --save
    >    ```
    >
    > 2. 容器组件VS展示组件
    >
    > 3. 纯净组件PureComponent - memo函数式实现纯净组件的功能（>=React.v16）
    >
    >    ```javascript
    >    class PureComponent extends React.Component {
    >        shouldComponentUpdate(nextProps,nextState){
    >            // 定制shouldComponentUpdate生命周期，如果props没变化，阻止渲染
    >            // 如果nextProps的内容等于this.props，nextState的内容等于this.state,则
    >            return false
    >        }
    >    }
    >    ```
    >
    >    具体作用：判断内容是否发生了改变，是否需要更新页面
    >
    >    ```javascript
    >    class TitleDisplay extends React.Component{
    >        render(){
    >            console.log('title更新了')
    >            return <div>
    >                {this.props.title}
    >                </div>
    >        }
    >    }
    >    
    >    class CounterDisplay extends React.Component{
    >        render(){
    >            console.log('counter更新了')
    >            return <div>
    >                {this.props.num}
    >                </div>
    >        }
    >    }
    >    
    >    class App extends React.Component{
    >        state = {
    >            count: 0,
    >            title: '开课吧'
    >        }
    >    	componentDidMount(){
    >            setInterval(()=>{
    >                this.setState({
    >                    count: this.state.count+1
    >                })
    >            },1000)
    >    	}
    >        render(){
    >            return <div>
    >                <TitleDisplay title={this.state.title}></TitleDisplay>
    >            	<CounterDisplay num={this.state.count}></CounterDisplay>
    >                </div>
    >        }
    >    }
    >    
    >    export default App
    >    // 当componentDidMount生命周期函数执行的时候，可以看到明明只有count发生了变化，但是连带title也被触发了渲染，这对于效率而言是有很大影响的，而纯净组件可以阻止这一情况的发生，见下
    >    ```
    >
    >    ```javascript
    >    // 使用纯洁组件阻止不必要的页面渲染
    >    class TitleDisplay extends React.PureComponent{
    >        render(){
    >            return <div>
    >                {this.props.title}
    >                </div>
    >        }
    >    }
    >    
    >    class CounterDisplay extends React.PureComponent{
    >        render(){
    >            return <div>
    >                {this.props.count}
    >                </div>
    >        }
    >    }
    >    
    >    class App extends React.Component{
    >        state = {
    >            count: 0,
    >            title: '开课吧'
    >        }
    >        componentDidMount(){
    >            setInterval(()=>{
    >                this.setState({
    >                    count: this.state.count+1
    >                })
    >            },1000)
    >        }
    >        render(){
    >            return <div>
    >                <TitleDisplay title={this.state.title}></TitleDisplay>
    >                <CounterDisplay num={this.state.count}></CounterDisplay>
    >                </div>
    >        }
    >    }
    >    ```
    >
    >    ```javascript
    >    // 函数式使用React.memo() (react.version>=16)实现
    >    const TitleDisplay = React.memo(({title})=>{
    >        return <div>
    >            {title}
    >            </div>
    >    })
    >    
    >    class CounterDisplay extends React.PureComponent{
    >        render(){
    >            return <div>
    >                {this.props.num}
    >                </div>
    >        }
    >    }
    >    
    >    class App extends React.Component{
    >        state = {
    >            count: 0,
    >            title: '开课吧'
    >        }
    >        componentDidMount(){
    >            setInterval(()=>{
    >                this.setState({
    >                    count: this.state.count + 1
    >                })
    >            })
    >        }
    >        render(){
    >            return <div>
    >                <TitleDisplay title={this.state.title}></TitleDisplay>
    >            	<CounterDisplay num={this.state.count}></CounterDisplay> 
    >                </div>
    >        }
    >    }
    >    ```
    >
    >    **纯净组件在componentDidMount中执行了一个shallowCompare，从名字可见，浅对比，对于state 和props中定义和传递的对象，只会做第一层的查找，结构层次较深的对象的改变无法被监测到。**
    >
    > 4. 高阶组件-一个返回另一个组件的组件，可以对生命周期进行定制
    >
    >    ```javascript
    >    import React from 'react'
    >    
    >    const withKaikeba = (Component)=>{
    >        const newComp = props => {
    >            return <Component {...props} name="开课吧高阶组件测试"></Component>
    >        }
    >        
    >        return newComp;
    >    }
    >    
    >    class withLog extends React.Component{
    >        componentWillMount(){
    >            console.time(`组件${Component.name}准备渲染了`)
    >        }
    >        render(){
    >            return <Component {...this.props} ></Component>
    >        }
    >        componentDidMount(){
    >            console.timeEnd(`组件${Component.name}渲染完毕了`)
    >        }
    >    }
    >    
    >    class App extends React.Component{
    >        render(){
    >            return <div>
    >                	<h1>xxx</h1>
    >            		<h2>{this.props.name}</h2>
    >                </div>
    >        }
    >    }
    >    export default withLog(withKaikeba(app))
    >    
    >    ```
    >
    > 5. 高阶组件的装饰器模式
    >
    >    1. 安装插件：npm i --save-dev babel-plugin-transform-decorators-legacy
    >    2. 
    >
    > 6. 

19. 组件通信

    1. context（只讲新版的） 

       ```javascript
       // App.js
       // 1.通过React.createContext()创建包含Provider和Consumer的上下文
       // 2.使用Provider包裹实际的组件，给组件提供一个上下文提供者，Provider组件通过value 属性传入需要给实际组件的参数信息
       // 3.实际组件通过包裹一个Consumer组件来使用父组件通过Provider组件传入的数据信息
       // 4.Consumer组件中需要是一个函数，返回JSX
       // 5.实际开发中，推荐使用redux、mobx、dva（redux封装）
       import React from 'react'
       import {Button} from 'antd'
       import {store} from './store'
       
       const {Provider,Consumer} = React.createContext()
       
       class Demo extends React.Component{
           render(){
               return <Consumer >
                   {
                       store=>{
                   		return <Button type="primary">{store.name}</Button>
                       }
               	}
                   </Consumer>
           }
       }
       
       class App extends React.Component{
           render(){
               return <Provider value={store}>
                   	<Demo></Demo>
                   </Provider>
           }
       }
       ```

       ```javascript
       // store.js
       let store = {
           name: '开课吧',
           sayHi(){
               console.log(this.name)
           }
       }
       
       export {store}
       ```

20. 组件的多个模式

### 后续展望

1. 组件设计思想

2. 聪明组件（包含state） VS傻瓜组件（function定义的组件）

3. 高阶组件

4. ant.design

5. 如何设计一个react组件

6. suspense 内测中

   npm i --save react-cache

7. hooks 内测中

   npm install --save react@16.7.0-alpha react-dom@16.7.0-alpha

   useState

   useEffect

8. react 的新生命周期