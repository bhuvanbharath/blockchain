import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from "./components/search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";
import VideoDetails from "./components/video_details"
const APIkey = "AIzaSyDm19Q_OUJteghsEUasrhC87-3Put9cQt8";
class App extends Component{
    constructor (props)
    {
        super(props);
        this.state = {
            videos : [],
            selectedVideo: null};
       this.videoSearch('onakka song')
    }
    
    videoSearch(term) {

        YTSearch({key: APIkey, term: term}, (data) =>
        {
            this.setState({
                videos : data,
                selectedVideo: data[0]});
        });
    }

    render(){

        const videoSearch = _.debounce((term) =>{this.videoSearch(term)}, 600);
        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetails video = {this.state.selectedVideo} />
                <VideoList
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo: selectedVideo})}
                    videos = {this.state.videos} />
            </div>
        );
    }
};

ReactDom.render(<App />, document.querySelector('.container'));