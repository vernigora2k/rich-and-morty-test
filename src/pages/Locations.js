import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlLocations } from '../js/config'
import './locations.scss'

export const Locations = () => {
    const { itemsList, fetchData, nextPage, setItemsList } = useContext(Context)
    const [currentUrl, setCurrentUrl] = useState(urlLocations)
    const [searchName, setSearchName] = useState('')
    const [searchType, setSearchType] = useState('')
    const [searchDimension, setSearchDimension] = useState('')

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

    const handleChangeType = (event) => {
        setSearchType(event.target.value)
    }

    const handleChangeDimension = (event) => {
        setSearchDimension(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setItemsList([])
        setCurrentUrl(urlLocations + '?name=' + searchName + '&type=' + searchType + '&dimension=' + searchDimension )
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
                    <input className="form-control" onChange={handleChangeType} placeholder="type..."></input>
                    <input className="form-control" onChange={handleChangeDimension} placeholder="dimension..."></input>
                    <input className="btn btn-warning" type="submit" value="search" />
                </form>
            </nav>
            <h1 className="pt-1 pb-1">Locations</h1>
            <div className="locations-items">
                {itemsList.map((item, i) => {
                    console.log(item)
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}