import React, { Fragment, useContext, useEffect } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlLocations } from '../js/config'
import './locations.scss'

export const Locations = () => {
    const { itemsList, fetchData } = useContext(Context)
    
    useEffect(() => fetchData(urlLocations), [])
    
    if(!itemsList) return null

    return (
        <Fragment>
            <h1>Locations</h1>
            <div className="locations-items">
                {itemsList.map((item, i) => {
                    console.log(item)
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}