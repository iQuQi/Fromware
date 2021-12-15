import {Component} from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import './comment.css';
import CheckIcon from '@mui/icons-material/Check';

export default class MyPageComments extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: props.user,
        }
    }

    componentDidMount(){
        
    }
    render(){
        let {user} = this.state;
        console.log(user.my_comment_list);
        return(
        <List sx={{ margin: '50px 30px', width: '100%', maxWidth: 840, bgcolor: 'background.paper' }}>
        
        {user.my_comment_list.items.map((item)=> (
            <div>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <a href={`../post/${item.post.id}`}>
                    <Avatar variant="square"
                        style={{width:'100px', height:'120px'}}
                        alt="Remy Sharp" src={'https://fromwear8eed5cfce497457294ec1e02e3cb17a2174201-dev.s3.ap-northeast-2.amazonaws.com/public/'+item.post.img} />
                </a>
              
            </ListItemAvatar>
            <ListItemText className='prewrap' sx={{marginLeft:'30px', marginTop:'30px'}}
              primary={`${item.post.user.name}님의 게시물`}
              secondary={`\n`}
              secondary={
                <React.Fragment>
                  {item.content}
                </React.Fragment>
              }
            />
            {item.adopted? 
                <CheckIcon sx={{marginTop:'40px', fontSize:'2.5em'}} style={{color:'lightgrey'}}/>
                : <p/>
            }
            
            
          </ListItem>
          <Divider />
          </div>
        ))}
        
        
      </List>
    )
    }
}




