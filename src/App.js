import React from 'react';
import axios from 'axios'
import './App.css';

function ConfigForm(props) {
    return(
	<div>
	<form onSubmit={props.onSubmit}>
	<label>
	Subdomain:
	<input type='text' onChange={props.handleChange} />
	</label>
	<label>
	JIRA username:
	<input type='text' onChange={props.handleUsernameChange} />
	</label>
	<label>
	JIRA API Key:
	<input type='password' onChange={props.handleApiKeyChange} />
	</label>
	</form>
      </div>
    )
}

function GoToIssue(props) {
  return (
      <div>
      <form onSubmit={props.onSubmit} >
      <label>
      Issue ID: <input type='text' id='gotoissue' /></label>
      <input type='submit' value='Go' />
    </form>
      </div>
  )
}

class CurrentIssue extends React.Component {
  constructor(props) {
    super(props)
    this.state = { issue: {} }
  }

  fetchData = () => {
    axios.get(`https://${this.props.subdomain}.atlassian.net/rest/api/latest/issue/${this.props.issueId}`, {
      auth: {
	username: this.props.username,
	password: this.props.password
      }
    })
      .then(response => {
	console.log(`Got issue ${this.props.issueId}`)
	let json = JSON.parse(response.data)
	this.setState({issue: json})
	console.log('z1', json)
      })
      .catch(error => {
	console.log(error)
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.issueId === prevProps.issueId) {
      return false
    }

    this.fetchData()
  }

  render() {
    if (this.props.issueId === '') {
      return(
	  <div>
	  Please enter an issue ID.
	  </div>
      )
    }

    return(
	<div>
	{ JSON.stringify(this.state.issue) }
	</div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issueId: '',
      subdomain: '',
      username: '',
      apiKey: ''}
  }

  handleApiKeyChange = (e) => {
    this.setState({apiKey: e.target.value})
  }
  handleSubdomainChange = (e) => {
    this.setState({subdomain: e.target.value})
  }
  handleUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  handleGoToIssueSubmit = (e) => {
    e.preventDefault()
    let foo = document.getElementById('gotoissue').value
    console.log('z0', foo)
    this.setState({issueId: foo})
    console.log('z1', this.state)
  }

  render() {
    return (
	<div className="App">
	<ConfigForm
      handleUsernameChange={this.handleUsernameChange}
      handleApiKeyChange={this.handleApiKeyChange}
      handleChange={this.handleSubdomainChange} />
	<GoToIssue onSubmit={this.handleGoToIssueSubmit} />
	<CurrentIssue
      issueId={this.state.issueId}
      subdomain={this.state.subdomain}
      username={this.state.username}
      password={this.state.password} />
	</div>
    );
  }
}

export default App;
