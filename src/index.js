import React, { Component } from "react";
import ReactDOM from "react-dom";
import { fetchlinks, getData, fetchrandomlink } from "./api";
import "./styles.css";

class App extends Component {
  state = {
    limit: 10,
    data: "",
    search: "",
    loading: ""
  };

  onChange = e => {
    this.setState({
      search: e.target.value,
      //loading:true
      data: ""
    });
  };
  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    //get the data
    const links = await fetchlinks(this.state.limit, this.state.search);
    //console.log({ links });
    this.setState({ data: getData(links), loading: false }, () =>
      console.log(this.state.data)
    );
  };
  randomSearch = async e => {
    console.log(e);
    //random serach
    e.persist();
    const randlink = await fetchrandomlink();
    console.log({ randlink });
    const url = `https://en.wikipedia.org/wiki/${randlink}`;
    window.open(url);
  };
  render() {
    return (
      <div className="App">
        <header>Wikipedia Search</header>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="search"
            onChange={this.onChange}
            placeholder="enter the search item..."
          />
          <input id="submit" type="submit" name="submit" />
        </form>
        <span>or</span>
        <button id="random" onClick={this.randomSearch} style={{}}>
          random page
        </button>
        {this.state.data &&
          this.state.data.map(({ title, snippet }, idx) => (
            <div key={idx} id="wrapper">
              <div id="title_wrapper">
                <a href={`https://en.wikipedia.org/wiki/${title}`}>{title}</a>
              </div>
              <div id="result" dangerouslySetInnerHTML={{ __html: snippet }} />
            </div>
          ))}
        {!this.state.data && !this.state.loading && <p>no search result</p>}
        {this.state.loading && <p>loading...</p>}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
