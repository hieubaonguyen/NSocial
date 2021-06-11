import React, {Component} from 'react';
import { Header, Icon, Image } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  state = {
    values: []
  }
  componentDidMount(){
    axios.get('https://localhost:44383/weatherforecast')
      .then((response) => {
        this.setState({
          values: response.data
        })
      })
  }
  render(){
    return (
      <div className="App">
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>Friends</Header.Content>
        </Header>
        <Image
          centered
          size='large'
          src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png'
        />
      </div>
    );
  }
}

export default App;
