import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 9;

  state = {
    progress : 0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress}  key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
            <Route path='/general' element={<News setProgress={this.setProgress}  key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
            <Route path='/bussiness' element={<News setProgress={this.setProgress}  key='bussiness' pageSize={this.pageSize} country='in' category='bussiness' />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress}  key='entertainment' pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={this.setProgress}  key='health' pageSize={this.pageSize} country='in' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={this.setProgress}  key='science' pageSize={this.pageSize} country='in' category='science' />}></Route>
            <Route path='/sport' element={<News setProgress={this.setProgress}  key='sport' pageSize={this.pageSize} country='in' category='sport' />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress}  key='technology' pageSize={this.pageSize} country='in' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}