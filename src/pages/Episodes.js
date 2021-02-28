import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlEpisodes } from '../js/config'
import './episodes.scss'

export const Episodes = () => {
    const { itemsList, fetchData, nextPage, setItemsList } = useContext(Context)
    const [currentUrl, setCurrentUrl] = useState(urlEpisodes)
    const [searchName, setSearchName] = useState('')
    const [searchEpisode, setSearchEpisode] = useState('')

    const handleScroll = () => {
        const currentPosition = window.pageYOffset
        const allWindowHeight = document.body.scrollHeight
        const clientWindowHeight = document.documentElement.clientHeight
        
        if (allWindowHeight === clientWindowHeight + currentPosition) {
            setCurrentUrl(nextPage)
        }
    }

    const handleChangeName = (event) => {
        setSearchName(event.target.value)
    }

    const handleChangeEpisode = (event) => {
        setSearchEpisode(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setItemsList([])
        setCurrentUrl(urlEpisodes + '?name=' + searchName + '&type=' + searchEpisode )
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
            <nav className="characters__search-bar bg-primary">
                <form className="characters__form" onSubmit={handleSubmit}>
                    <input className="form-control" onChange={handleChangeName} placeholder="name..."></input>
                    <input className="form-control" onChange={handleChangeEpisode} placeholder="episode..."></input>
                    <input className="btn btn-warning" type="submit" value="search" />
                </form>
            </nav>
            <h1 className="pt-1 pb-1">Episodes</h1>
            <div className="episodes-items">
                {itemsList.map((item, i) => {
                    console.log(item)
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}