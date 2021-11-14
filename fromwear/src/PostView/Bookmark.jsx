import React, {Component} from 'react';
import './Bookmark.css';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

class Bookmark extends Component{

    state = {
        is_checked: false,
    };

    onClick = () => {
        this.state.is_checked?
        this.setState({
            is_checked: false,
        }) : 
        this.setState({
            is_checked: true,
        })
    }

    render() {
        return (
            <div className="icons_list">
                {
                    this.state.is_checked ?
                    <BookmarkIcon className="button bookmark_filled" onClick={this.onClick}/>
                    : <BookmarkBorderIcon className="button bookmark_outlined" onClick={this.onClick}/>
                }
                <div className="like_num">{this.state.notice}</div>
            </div>
        )
    }
}

export default Bookmark;