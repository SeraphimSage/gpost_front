import React from "react";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		};
	}

	componentDidMount() {
		fetch("http://127.0.0.1:8000/api/posts/")
			.then((res) => res.json())
			.then((data) => this.setState({ posts: data }));
	}
	render() {
		return (
			<div>
				<h2>Welcome to the Ghost Board</h2>
				<ul>
					{this.state.posts.map((p) => (
						<div key={p.id}>
							<li>Title: {p.title} </li>
							<li>{p.boast_roast}</li>
							<li>Up Votes: {p.up_field}</li>
							<li>Down Votes: {p.down_field}</li>
							<li>Popularity: {p.votes}</li>
							<li>Posted: {p.post_date}</li>
							<br />
						</div>
					))}
				</ul>
			</div>
		);
	}
}
export default App;
