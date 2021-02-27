import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlEpisodes } from '../js/config'
import './episodes.scss'

export const Episodes = () => {
    const { itemsList, fetchData, nextPage, setItemsList } = useContext(Context)
    const [currentUrl, setCurrentUrl] = useState(urlEpisodes)

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
            <h1>Episodes</h1>
            <div className="episodes-items">
                {itemsList.map((item, i) => {
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}