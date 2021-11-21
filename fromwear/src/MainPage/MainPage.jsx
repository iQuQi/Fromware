import {Component} from 'react';
import './MainPage.css';
import BANNER from './img/Main_banner.png'
import PROFILE from './img/profile.png'

import Header from '../Header/Header'

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import Stack from '@mui/material/Stack';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

class MainPage extends Component {
	constructor() {
		super();

		this.state = {
			postlist_0: [],
			postlist_1: [],
			postlist_2: [],
		};
	}

	componentWillMount(){
		for (let i = 0; i < 3; i++) {
			this.getPosts(i);	
		}
	}

	getPosts = (i) => {
		API.graphql({ query: listPosts, variables: { filter: {board_type: {eq: i}}  }})
		.then( res => {
			if(i==0) this.setState({ postlist_0: res.data.listPosts.items });
			else if(i==1) this.setState({ postlist_1: res.data.listPosts.items.sort(function(a,b){return b.urgent_user_num-a.urgent_user_num}) });
			else if(i==2) {
				this.setState({ postlist_2: res.data.listPosts.items.sort(function(a,b){return b.like_user_num-a.like_user_num}) });
				this.setState({ postlist_0: [...this.state.postlist_0, ...this.state.postlist_2].sort(function(a,b){return b.like_user_num-a.like_user_num})});
			}
		})
		.catch( e => console.log(e));
	}


	render(){

		console.log(this.state.postlist_1);
		
		const best_post_0 = this.state.postlist_0.slice(0,5);
		const best_post_1 = this.state.postlist_1.slice(0,5);
		const best_post_2 = this.state.postlist_2.slice(0,5);
		

		return <div id = 'main_page'>
			<div className = 'banner'>
				<img src = {BANNER} alt = 'Main Banner' style={{margin:'60px'}}/>
			</div>

			<div className='contents'>
				<div id = 'today_post' className = 'collection'>
					<h3 className = 'title'>오늘의 착장</h3>
					<a className = 'seemore' href='/todayboard'>둘러보기</a>
					
					<ImageList cols={5} gap={8} style={{clear: 'left'}}>
						{best_post_0.map((item) => (
							<ImageListItem key={item.img} className='weekly_image_list_item'ls
							>
								<img style={{borderRadius:16}}
									src={`${item.img}?w=248&fit=crop&auto=format`}
									srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.id}
									loading="lazy"
								/>

								<a href='/post'> 
									<span className='dimmed_layer'>	</span>
								</a>

								<Stack direction="row" spacing={0} justifyContent="space-between">
									<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
									<p style={{margin: '16px 0px'}}>{item.user.name}</p>
									<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
									<p style={{margin: '16px 0px'}}>{item.like_user_num}</p>
									<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
								</Stack>				
							</ImageListItem>
						))}
					</ImageList>
				
				</div>

				<div id = 'help_post' className = 'collection'>
					<h3 className = 'title'>도움이 필요해</h3>
					<a className = 'seemore' href=''>둘러보기</a>

					<ImageList cols={5} gap={8}>
						{best_post_1.map((item) => (
							<ImageListItem key={item.img} className='weekly_image_list_item'>
								<img style={{borderRadius:16 }}
									src={`${item.img}?w=248&fit=crop&auto=format`}
									srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.id}
									loading="lazy"
								/>

								<a href='/post'> 
									<span className='dimmed_layer'>	</span>
								</a>

								<Stack direction="row" spacing={0} justifyContent="space-between">
									<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
									<p style={{margin: '16px 0px'}}>{item.user.name}</p>
									<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
									<p style={{margin: '16px 0px'}}>{item.urgent_user_num}</p>
									<MoodBadIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
								</Stack>				
							</ImageListItem>
						))}
					</ImageList>
				</div>

				<div id = 'weekly_best' className = 'collection'>
					<h3 className = 'title'>이번주 태그 랭킹</h3>
					<a className = 'seemore' href='/weeklytag'>둘러보기</a>
					
					<ImageList cols={5} gap={8}>
						{best_post_2.map((item) => (
							<ImageListItem key={item.img} className='weekly_image_list_item'>
								<img style={{borderRadius:16 }}
									src={`${item.img}?w=248&fit=crop&auto=format`}
									srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.user}
									loading="lazy"
								/>

								<a href='/post'> 
									<span className='dimmed_layer'>	</span>
								</a>

								<Stack direction="row" spacing={0} justifyContent="space-between">
									<img src={PROFILE} style={{margin: '7px 3px', width:'20px', height:'20px'}}/>
									<p style={{margin: '16px 0px'}}>{item.user.name}</p>
									<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
									<p style={{margin: '16px 0px'}}>{item.like_user_num}</p>
									<FavoriteBorderIcon style={{margin: '7px 3px', color:'#000000'}} sx={{fontSize: '1.1rem'}}/>
								</Stack>			
							</ImageListItem>
						))}
					</ImageList>
				</div>
			</div>

		</div>
	}

	
	
}

export default MainPage;
