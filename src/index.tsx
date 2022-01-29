import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  models: {
    transaction: Model, 
  },

  seeds(server) {
    server.db.loadData({
      transactions: []
    });
  },
  routes() {
    this.namespace = 'api';


    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, req) => {
      const data = JSON.parse(req.requestBody);
      
      return schema.create('transaction', data);
    });

    this.delete('/transactions/:id', (schema, req) => {
      const data = JSON.parse(req.requestBody);
      const transaction = schema.find('transaction', data.id);


      return transaction;
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
