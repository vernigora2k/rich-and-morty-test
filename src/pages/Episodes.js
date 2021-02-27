import React, { Fragment, useContext, useEffect } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlEpisodes } from '../js/config'
import './episodes.scss'

export const Episodes = () => {
    const { itemsList, fetchData } = useContext(Context)
    
    useEffect(() => fetchData(urlEpisodes), [])
    
    if(!itemsList) return null

    return (
        <Fragment>
            <h1>Episodes</h1>
            <div className="episodes-items">
                {itemsList.map((item, i) => {
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}