import React, { Fragment, useEffect, useContext } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlCharacters } from '../js/config'
import './characters.scss'

export const Characters = () => {
    const { itemsList, fetchData } = useContext(Context)

    useEffect(() => fetchData(urlCharacters), [])
    
    if(!itemsList) return null

    return (
        <Fragment>
            <h1>Characters</h1>
            <div className="characters-items">
                {itemsList.map((item, i) => {
                    console.log(item)
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}