
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListings from './pages/UpdateListings'
import Listing from './pages/Listing'
import Search from './pages/Search'
function App() {
  

  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/sign-in" element={<SignIn/>}> </Route>
      <Route path="/sign-up" element={<SignUp/>}> </Route>
      <Route path="/about" element={<About/>}> </Route>
      <Route path="/search" element={<Search/>}> </Route>
      <Route path="/listing/:listingId" element={<Listing/>}> </Route>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}> </Route>
        <Route path="/create-listing" element={<CreateListing/>}> </Route>
        <Route path="/update-listing/:listingId" element={<UpdateListings/>}> </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
