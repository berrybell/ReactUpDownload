import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = { 
      selectedFile: null, 
      response: '' 
    }
  }

  componentDidMount() {
    // Check that server is live and running
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

    callApi = async () => {
      const response = await fetch('/api/hello');
      const body = await response.json();

      if (response.status !== 200) throw Error(body.message);

      return body;
    }

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]});
  }
  
  uploadHandler = () => { 
    const formData = new FormData();
    formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('/upload', formData).then(alert('File uploaded'));
  }

  downloadHandler = () => {
    axios({
      url: '/download',
      method: 'GET',
      responseType: 'blob',
    }).then((res) => {
      // Getting file name
      var str = res.headers['content-disposition'];
      const fileName = str.split('"')[1];

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName.toString());
      link.click();
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Upload and Download UI Component</h1>
        </header>
        <div className="App-body">
          <p>{this.state.response}</p>
          <form method='post' action='/upload'>   
            <input type='file' onChange={this.fileChangedHandler} />
            <input type='button' onClick={this.uploadHandler} value='Submit'/>
            <input type='button' onClick={this.downloadHandler} value='Retrieve'/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
