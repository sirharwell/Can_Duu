import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import ScrollToTop from './components/ScrollToTop';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
