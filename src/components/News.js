import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
   
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    constructor(props){
        super(props);
        this.state =  {
            articles : [],
            loading : false,
            page : 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - RajPatra`;
    }

    async componentDidMount(){
      this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=868f32344a3a4f9a98fdb2881ad6f221&page=1&pageSize=${this.props.pageSize}`;
        this.props.setProgress(10);
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles : parsedData.articles, 
          totalResults : parsedData.totalResults ,
          loading : false
        });
        this.props.setProgress(100)
    }

    // This code is for next and previous button operations 

    // handlePrevClick = async()=>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=868f32344a3a4f9a98fdb2881ad6f221&page= ${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         page: this.state.page-1,
    //         articles : parsedData.articles,
    //         loading : false
    //     })
    // }
    
    // handleNextClick = async ()=>{
    //     if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=868f32344a3a4f9a98fdb2881ad6f221&page= ${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         page: this.state.page+1,
    //         articles : parsedData.articles,
    //         loading : false
    //     })
    //    }
    // }

    fetchMoreData = async() => {
        this.setState({page : this.state.page+1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=868f32344a3a4f9a98fdb2881ad6f221&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
          articles : this.state.articles.concat(parsedData.articles), 
          totalResults : parsedData.totalResults
        })
    };

  render() {
    return (
      <>
        <h1 className="text-center" style = {{margin:'35px 0px' , marginTop : '90px'}}>RajPatra - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container-mx-3">
            <div className="row my-3">
                {this.state.articles.map((element)=>{
                return <div className="col-md-4" key = {element.url}>
                <Newsitem title = {element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt}/>
                </div>
            })}
            </div>
          </div>
        </InfiniteScroll>

        {/* This code is for button defining     */}

        {/* <div className="conatiner d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous Page</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next Page &rarr;</button>
        </div> */}


      </>
    )
  }
}

export default News
