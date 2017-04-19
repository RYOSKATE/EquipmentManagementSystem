import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
    ons.orientation.on("change", function(event) {
        render(<App />, document.getElementById('render-target'));
    });
  ons.ready(() => {
    render(<App />, document.getElementById('render-target'));
  });
});
