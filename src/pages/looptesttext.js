import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TopSum, BottomSum, TitleLedger } from '../common/text';
import styles from './style'


const data = [{
  "date":"Jul 1, 2016",
  "sum": "$2,577.51",
  "source": "Earnings",
  "total": "$0.14"
},{
  "date":"Jul 1, 2016",
  "sum": "$2,577.51",
  "source": "Earnings",
  "total": "$0.14"
}];


export default class Details extends Component {
  state = {};
  render() {
    const rows = this.props.data;
    const dataRow = rows.map(row => {
            return (
              <View style={styles.operation}>
                <View style={styles.topSum}>
                  <TopSum label={row.date} />
                  <TopSum label={row.sum} />
                </View>
                <View style={styles.bottomSum}>
                  <BottomSum label={row.source} />
                  <BottomSum label={row.total} />
                </View>
              </View>
            )
          })
    return (              
         <View title="BALANCE" style={styles.content}>
          {dataRow}
         </View>      
    );
  }
}

render() {

    const rows = data;      //here

    const dataRow = rows.map(row => {
        ....
    }

    return(
        ....
    )
}