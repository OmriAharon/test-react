// Being able to debug only quality without a hosting app on "old" browsers.
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

ReactDOM.render(<App/>, document.getElementById('root'));
