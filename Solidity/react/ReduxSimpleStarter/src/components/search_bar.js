import React, {Component} from 'react';

class SearchBar extends Component{
    constructor (props)
    {
        super(props);

        this.state = {term : ""};
    }

    render(){
        return (
            <div className= "search-bar">
                <input onChange={(event) => this.onInputChange(event.target.value)} placeholder='Search here' />
                {/* Value entered: {this.state.term} */}
            </div>
        );
    }
    
    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

// const SearchBar = () =>{
//     return <input />;
// }

export default SearchBar;