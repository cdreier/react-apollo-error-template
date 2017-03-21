import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { networkInterface } from './graphql/networkInterface';
import App from './App';

import configureStore from './config/store'

const client = new ApolloClient({ networkInterface });
const store = configureStore(client, {})

ReactDOM.render(
  <ApolloProvider client={client} store={store} ><App /></ApolloProvider>,
  document.getElementById('root'),
);
