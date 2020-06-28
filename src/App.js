import React from 'react';
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
	JIRA API Key:
	<input type='password' onChange={props.handleApiKeyChange} />
	</label>
	</form>
      </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {subdomain: '', apiKey: ''}
  }

  handleApiKeyChange = (e) => {
    this.setState({apiKey: e.target.value})
  }
  handleSubdomainChange = (e) => {
    this.setState({subdomain: e.target.value})
  }

  render() {
    return (
	<div className="App">
	<ConfigForm
      handleApiKeyChange={this.handleApiKeyChange}
      handleChange={this.handleSubdomainChange} />
	</div>
    );
  }
}

export default App;
