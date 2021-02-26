import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { urlCharacters } from './js/config';
import { getData } from './js/controller';
import { Characters } from './pages/Characters';
import { Episodes } from './pages/Episodes';
import { Locations } from './pages/Locations';

export const Context = React.createContext()

function App() {
  const [itemsList, setItemsList] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [currentUrl, setCurrentUrl] = useState(urlCharacters)
  
  async function fetchData(currentUrl) {
    const {info, results} = await getData(currentUrl)
    console.log(info)
    console.log(results)
    console.log(info.next)
    setItemsList(results)
    setPrevPage(info.prev)
    setNextPage(info.next)
  }

  return (
    <Context.Provider value={{ itemsList, fetchData, prevPage, nextPage, currentUrl, setCurrentUrl }}>
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
