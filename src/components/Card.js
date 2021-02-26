import React, { useContext } from 'react'
import App from '../App'
import { Context } from '../App'
import './card.scss'

export default function Card(data) {
    const {item} = data
    // console.log(item)
    return (
        <div className="card-body">
            <h6 className="card-title">{item.name}</h6>
            <img className="card-img" src={item.image} />
        </div>
    )
}