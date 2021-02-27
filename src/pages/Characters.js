import React, { Fragment, useEffect, useContext, useState } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlCharacters } from '../js/config'
import './characters.scss'

export const Characters = () => {
    const { itemsList, fetchData, prevPage, nextPage, setItemsList } = useContext(Context)
    const [currentUrl, setCurrentUrl] = useState(urlCharacters)

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
            <h1>Characters</h1>
            <div className="characters-items">
                {itemsList.map((item, i) => {
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}