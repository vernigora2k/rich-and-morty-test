import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { urlCharacters } from './js/config';
import { getData } from './js/controller';
import { Characters } from './pages/Characters';
import { Episodes } from './pages/Episodes';
import { Locations } from './pages/Locations';
var _ = require('lodash');

export const Context = React.createContext()

function App() {
  const [itemsList, setItemsList] = useState([])
  const [prevPage, setPrevPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [currentUrl, setCurrentUrl] = useState(urlCharacters)

    // const handleScroll = () => {
    //     const currentPosition = window.pageYOffset
    //     const allWindowHeight = document.body.scrollHeight
    //     const clientWindowHeight = document.documentElement.clientHeight
        
    //     if (allWindowHeight === clientWindowHeight + currentPosition) {
    //         setCurrentUrl(nextPage)
    //     }
    // }
  
  async function fetchData(currentUrl) {
    console.log('fetch')
    const {info, results} = await getData(currentUrl)
    setPrevPage(info.prev)
    setNextPage(info.next)
    // setItemsList(prev => { 
    //   if (!prev) return results
    //   return _.uniqBy([...prev, ...results], 'id')
    // })
    setItemsList(prev =>  _.uniqBy([...prev, ...results], 'id'))
  }

  return (
    <Context.Provider value={{ itemsList, fetchData, prevPage, nextPage, setItemsList }}>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-5">
          <Switch>
            <Route path={'/'} exact component={Characters}  />
            <Route path={'/locations'} component={Locations} />
            <Route path={'/episodes'} component={Episodes} />
          </Switch>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
