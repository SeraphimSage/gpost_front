import React from "react";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		};
	}

	handleTitle = (event) => {
		this.setState({ title: event.target.value });
	};

	handleBR = (event) => {
		this.setState({ boast_roast: event.target.value });
	};

	getPosts = (event) => {
		fetch("http://127.0.0.1:8000/api/posts/")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ posts: data });
			});
	};

	getBoasts = (event) => {
		fetch("http://127.0.0.1:8000/api/posts/boast/")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ posts: data });
			});
	};

	getRoasts = (event) => {
		fetch("http://127.0.0.1:8000/api/posts/roast/")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ posts: data });
			});
	};

	getPopular = (event) => {
		fetch("http://127.0.0.1:8000/api/posts/popular/")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ posts: data });
			});
	};

	createPost = (event) => {
		const requestBody = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				type_of_post: this.state.type_of_post,
				title: this.state.title,
				body: this.state.body,
			}),
		};
		fetch("http://localhost:8000/api/posts/", requestBody)
			.then((response) => response.json())
			.then(this.setState({ title: "", body: "", type_of_post: "" }))
			.then(this.getPosts());
	};

	getUpVote = (id, post) => {
		fetch(`http://127.0.0.1:8000/api/posts/${id}/up_vote/`, { method: "POST" })
			.then((res) => res.json())
			.then((data) => {
				this.getPosts();
			});
	};

	getDownVote = (id, post) => {
		fetch(`http://127.0.0.1:8000/api/posts/${id}/down_vote/`, {
			method: "POST",
		})
			.then((res) => res.json())
			.then((data) => {
				this.getPosts();
			});
	};

	render() {
		return (
			<div>
				<h2>Welcome to the Ghost Board</h2>
				<button onClick={this.getPosts}>Get all Posts</button>
				<button onClick={this.getBoasts}>Get only Boasts</button>
				<button onClick={this.getRoasts}>Get only Roasts</button>
				<button onClick={this.getPopular}>Sort by Popularity</button>
				<form onSubmit={() => this.createPost()}>
					<input
						placeholder="B or R"
						onChange={(event) => this.handleBR(event)}></input>
					<input
						placeholder="Title?"
						onChange={(event) => this.handleTitle(event)}></input>
					<input type="submit" value="Submit Post"></input>
				</form>
				<ul>
					{this.state.posts.map((p) => (
						<div key={p.id}>
							<li>Title: {p.title} </li>
							<li>{p.boast_roast}</li>
							<li>Up Votes: {p.up_field}</li>
							<li>Down Votes: {p.down_field}</li>
							<li>Popularity: {p.votes}</li>
							<li>Posted: {p.post_date}</li>
							<button onClick={() => this.getUpVote(p.id)}>Love it</button>
							<button onClick={() => this.getDownVote(p.id)}>Hate it</button>
							<br />
						</div>
					))}
				</ul>
			</div>
		);
	}
}
export default App;
