import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlLocations } from '../js/config'
import './locations.scss'

export const Locations = () => {
    const { itemsList, fetchData, nextPage, setItemsList } = useContext(Context)
    const [currentUrl, setCurrentUrl] = useState(urlLocations)

    const handleScroll = () => {
        const currentPosition = window.pageYOffset
        const allWindowHeight = document.body.scrollHeight
        const clientWindowHeight = document.documentElement.clientHeight
        
        if (allWindowHeight === clientWindowHeight + currentPosition) {
            setCurrentUrl(nextPage)
        }
    }

    useEffect(() => setItemsList([]),[])
    
    useEffect(() => {
        fetchData(currentUrl)
        window.addEventListener('wheel', handleScroll, {passive: true})
        
        return () => {
            window.removeEventListener('wheel', handleScroll)
        }
    }, [nextPage, currentUrl])
    
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