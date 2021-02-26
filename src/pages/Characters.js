import React, { Fragment, useEffect, useContext, useState } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlCharacters } from '../js/config'
import './characters.scss'

export const Characters = () => {
    const { itemsList, fetchData, prevPage, nextPage } = useContext(Context)
    const [currentUrl, setCurrentUrl] = useState(urlCharacters)
    console.log(nextPage)
    console.log(prevPage)

    const handleScroll = () => {
        const currentPosition = window.pageYOffset
        const allWindowHeight = document.body.scrollHeight
        const clientWindowHeight = document.documentElement.clientHeight
        if (allWindowHeight === clientWindowHeight + currentPosition) {
            // setCurrentUrl(nextPage)
            console.log('this is the end')
            // console.log(nextPage)
            // console.log(prevPage)
            // console.log(currentUrl)
            // setCurrentUrl(nextPage)
            setCurrentUrl(nextPage)
        }
    }

    // useEffect(() => fetchData(urlCharacters), [])
    useEffect(() => {
        fetchData(currentUrl ?? urlCharacters)
        window.addEventListener('scroll', handleScroll, {passive: true})

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [currentUrl, nextPage])
    
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