import React, { Component } from 'react'

export default class AccessDenied extends Component {
    render() {
        return (
            <div>
                <p style= {{fontSize:'10vh'}}>KHÔNG ĐƯỢC PHÉP</p>
                <sub style = {{fontSize:'3vh'}}>bạn không có quyền hoặc chưa đăng nhập, <strong style = {{fontSize:'5vh'}}>BE GONE HECK!</strong></sub>
            </div>
        )
    }
}
