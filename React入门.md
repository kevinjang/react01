# React入门

1. 安装一个脚手架

   npm install create-react-app -g

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

17. 

### 后续展望

1. 组件设计思想
2. 聪明组件（包含state） VS傻瓜组件（function定义的组件）
3. 高阶组件
4. ant.design
5. 如何设计一个react组件
6. suspense 内测中
7. hooks 内测中
8. react 的新生命周期