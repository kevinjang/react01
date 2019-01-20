import React from 'react'
import Cart from './Cart'
import './index.css'

function Title({ title }) {
    return <h2>{title}</h2>
}

class Life extends React.Component {
    componentWillMount() {
        console.log('我准备渲染了')
    }
    render() {
        console.log('开始渲染')
        return <div>
            <h2>{this.props.num}</h2>
        </div>
    }

    componentDidMount() {
        console.log('渲染完了，可以搞一些异步操作')
    }

    componentWillReceiveProps(props) {
        // console.log(arguments)
        console.log('父组件要更新传进来的属性了', props)
    }
    shouldComponentUpdate(props) {
        // 返回一个值，确定是否要更新，返回true就更新，false 就不更新
        // console.log('shouldComponentUpdate:', arguments)
        if (props.num % 3 == 0)
            return true
        return false
    }
    componentDidUpdate(){
        console.log('更新完了')
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '开课吧',
            showTitle: true,
            text: '产品经理',
            title: 'Hello, it\'s me!',
            goods: [
                { text: 'web全栈架构师', price: 100, id: 1 },
                { text: '百万年薪架构师', price: 80, id: 2 },
                { text: 'python爬虫', price: 60, id: 3 }
            ],
            cart: [],
            cartHistory: [],
            life: '生命周期测试',
            num: 0
        }

        // setTimeout(() => {
        //     this.setState({
        //         name: 'react还不错',
        //         showTitle: false
        //     })
        // }, 2000)

        // setTimeout(()=>{
        //     this.setState({
        //         life: '生命周期测试修改'
        //     })
        // },2000)

        setInterval(() => {
            this.setState({
                num: this.state.num + 1
            })
        }, 1000)

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidCatch(error,info){
        console.log('出错了')
    }
    handleAdd() {
        // this.goods.push()
        this.setState({
            goods: [...this.state.goods,
            { text: this.state.text, id: 5 }
            ]
        })
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    handleAddCart(good) {
        let index
        const cartGood = this.state.cart.find((v, i) => {
            if (good.text === v.text) {
                index = i
                return true
            }
        })

        if (cartGood) {
            // this.setState({})
            // 不能直接修改数据
            let newCart = [...this.state.cart]
            newCart[index].count += 1
            this.setState({
                cart: newCart
            })
        } else {
            // console.log('good:',good)
            this.setState({
                cart: [...this.state.cart, {
                    text: good.text,
                    price: good.price,
                    count: 1
                }]
            })
        }
        this.setState({
            cartHistory: [...this.state.cartHistory, this.state.cart]
        })
    }

    resetCart(i) {
        this.setState({
            cart: this.state.cartHistory[i]
        })
    }

    render() {
        return <div>
            <Title title={this.state.title} />
            {/* {this.state.showTitle && <h2>
                {this.props.title}
            </h2>}
            {this.state.showTitle?
                <h2>
                {this.props.title}
                </h2>:null
            } 
            <div>
                <input 
                    type="text" 
                    value={this.state.text}
                    onChange={(e)=>this.handleChange(e)}/>
                <button onClick={()=>this.handleAdd()}>添加</button>
            </div>*/}
            <div>
                {this.state.cartHistory.length && <button>上一步</button>}
                {this.state.cartHistory.map((his, i) => {
                    return <button key={i} onClick={() => this.resetCart(i)}>
                        {i}
                    </button>
                })}
            </div>
            {/* 循环 */}
            <ul>
                {this.state.goods.map(good => {
                    return <li key={good.id}>
                        <span>{good.text}</span>
                        <span>{good.price}</span>
                        <button onClick={() => this.handleAddCart(good)}>添加购物车</button>
                    </li>
                })}
            </ul>

            <button>{this.state.name}</button>
            <Cart data={this.state.cart}></Cart>
            <Life title={this.state.life} num={this.state.num}></Life>
        </div>
    }

    // render(){
    //     return <div></div>
    // }
}

export default App