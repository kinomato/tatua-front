import React from 'react'
import ItemOrder from './itemOrder'
const UserOrderList = (props) => {
    const { orders } = props;
    if (orders.length === 0) {
        return (
            <div>
                không có gì hết
            </div>
        )
    }
    else {
        return (
            <div className="d-flex flex-column justify-content-center">
                {/* {orders.forEach(item => {
                    return (
                        <ItemOrder item={item} />
                    )
                })} */}
                {
                    orders.map(item => {
                        return(
                            <ItemOrder item={item}/>
                        )
                    })
                }
            </div>
        )
    }

}
export default UserOrderList