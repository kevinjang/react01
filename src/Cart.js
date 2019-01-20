import React from 'react'
function Total({cart}){
    return <span>总价：{cart.reduce((sum,a)=>{
        return sum + a.price * a.count
    },0)}</span>
}
class Cart extends React.Component{
    render(){
        return <div>
            购物车
            <table>
                <tbody>
                <tr>
                    <th>商品名</th>
                    <th>价格</th>
                    <th>数量</th>
                    <th>总价</th>
                </tr>
                {this.props.data.map(good=>{
                        return <tr key={good.text}>
                            <td>{good.text}</td>
                            <td>{good.price}</td>
                            <td>{good.count}</td>
                            <td>{good.price * good.count}</td>
                        </tr>
                    })}
                    <tr>
                        <Total cart={this.props.data}></Total>
                    </tr>
                </tbody>
            </table>
            </div>
    }
}

export default Cart