import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import WasteFee from './pages/WasteFee/WasteFee';
import WasteOut from './pages/WasteOut';
import MyPosts from './pages/MyPosts/MyPosts';
import AllPosts from './pages/AllPosts';
import ViewByPost from './pages/ViewByPost';
import Payment from './components/Payment';
import SuccessPage from './pages/Success';
import FailPage from './pages/Fail';
import Footer from './components/Footer';
import './App.css'
const App = () => {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path='/login' />
                    <Route element={<Logout />} path='/logout' />
                    <Route element={<Signup />} path='/signup' />
                    <Route element={<MyPosts />} path='/myposts' />
                    <Route element={<WasteFee />} path='/wastefee' />
                    <Route element={<WasteOut />} path='/wasteout' />
                    <Route element={<AllPosts />} path='/allposts' />
                    <Route element={<ViewByPost />} path='/view-by-post/:postId' />
                    <Route element={<Payment />} path='/payment' />
                    <Route element={<SuccessPage />} path='/success' />
                    <Route element={<FailPage />} path='/fail' />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;