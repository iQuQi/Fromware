import { Component } from 'react';
import '../MyPage/MyPage.css';
import Header from '../Header/Header';


import { API } from 'aws-amplify';
import { getUser } from '../graphql/queries.js';

import OtherUserProfile from './OtherUserProfile';
import MyPostBoard from '../MyPage/MyPostBoard';


class UserPage extends Component {
    constructor(props) {
		super();

		this.state = {
			now_user_id: '',
			now_user: {},
            user_id: props.userid,
			user: {},
		};
	}

	componentDidUpdate(){
		if(this.state.user_id!=this.props.userid){
			API.graphql({ query: getUser, variables: { id: this.props.userid} })
			.then( res => {
				this.setState({
					user_id: this.props.userid,
					user: res.data.getUser,
				})
			})
			.catch( e => console.log(e));		
		}
	}

    componentDidMount(){
		console.log(this.state.user_id);
		console.log(this.props.userid);
		API.graphql({ query: getUser, variables: { id: this.props.userid} })
		.then( res => {
			this.set_user(res.data.getUser);
			console.log(res.data.getUser);
		})
		.catch( e => console.log(e));	
    }

	set_user = (user) => {
		this.setState({ user: user });
	}

	handle_user_info = (user) => {
		this.setState({ now_user: user });
	}


    render(){
		console.log(this.state.user);
		console.log(this.state.now_user);
		let {now_user, user} = this.state;

		
        return <div id = 'my_page'>
			<Header handle_user_info={this.handle_user_info}/>
			
			<div className='mypage_contents'>

				<div id = 'profile' className = 'mypage_profile'>
					
				</div>
				
				<OtherUserProfile now_user={now_user} user={user}/>

				<div id = 'tab' className = 'mypage_collection'>
					<MyPostBoard user={user} board={20}/>
				</div>

				

				
            </div>

			
        </div>
    }
}


export default UserPage;