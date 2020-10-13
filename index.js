/**
 developer: Dennis Muthuyia  
 email:  dmuthuyia@gmail.com
 */

import {AppRegistry} from 'react-native';
import App from './App';
//import App from "./src/heyj/App";

//import Livestream from "./src/pages/livestream";
//import WPReact from "./src/pages/noflatlist";
//import Looptest from "./src/pages/comments";
//import Lsnavigator from "./src/components/lsnavigator";

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
