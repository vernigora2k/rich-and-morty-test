import { set } from 'lodash'
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { Context } from '../App'
import Card from '../components/Card'
import { urlCharacters } from '../js/config'
import './characters.scss'

export const Characters = () => {
    const { itemsList, fetchData, nextPage, setItemsList } = useContext(Context)
    const [currentUrl, setCurrentUrl] = useState(urlCharacters)
    const [searchName, setSearchName] = useState('')
    const [searchStatus, setSearchStatus] = useState('')
    const [searchSpecies, setSearchSpecies] = useState('')
    const [searchGender, setSearchGender] = useState('')

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

    const handleChangeStatus = (event) => {
        setSearchStatus(event.target.value)
    }

    const handleChangeSpecies = (event) => {
        setSearchSpecies(event.target.value)
    }

    const handleChangeGender = (event) => {
        setSearchGender(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setItemsList([])
        console.log(searchStatus)
        setCurrentUrl(urlCharacters + '?name=' + searchName + searchStatus + '&species=' + searchSpecies + searchGender)
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
                    <span>name: </span>
                    <input onChange={handleChangeName}></input>
                    <select id="select-status" onChange={handleChangeStatus}>
                        <option value="" selected disabled hidden>Choose status</option>
                        <option value="&status=alive">alive</option>
                        <option value="&status=dead">dead</option>
                        <option value="&status=unknown">unknown</option>
                    </select>
                    <input onChange={handleChangeSpecies}></input>
                    <select id="select-gender" onChange={handleChangeGender}>
                        <option value="" selected disabled hidden>Choose gender</option>
                        <option value="&gender=female">female</option>
                        <option value="&gender=male">male</option>
                        <option value="&gender=genderless">genderless</option>
                        <option value="&gender=unknown">unknown</option>
                    </select>
                    <input type="submit" value="search" />
                </form>
            </nav>
            <h1>Characters</h1>
            <div className="characters__items" id="characters__items">
                {itemsList.map((item, i) => {
                    return <Card item={item} key={i} />
                })}
            </div>
        </Fragment>
    )
}