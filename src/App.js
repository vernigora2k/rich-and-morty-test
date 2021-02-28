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
  
  async function fetchData(currentUrl) {
    if (!currentUrl) return null
    const {info, results} = await getData(currentUrl)
    if (!info || !results) return
    setPrevPage(info.prev)
    setNextPage(info.next)
    setItemsList(prev =>  _.uniqBy([...prev, ...results], 'id'))
  }

  return (
    <Context.Provider value={{ itemsList, fetchData, prevPage, nextPage, setItemsList }}>
      <BrowserRouter>
        <Navbar />
        <div className="container pt-3">
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
