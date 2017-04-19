import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';

import { RentalLogs } from '../api/rentallogs.js';
import { Row, Col, List, ListHeader, ListItem } from 'react-onsenui';
import { Meteor } from 'meteor/meteor';

const LogList = ({currentUser, task, logs}) => {

    const _renderHeader = () => {
        return(
            <ListHeader>
                <div className="center">
                    <Row >
                        <Col width="27px">#</Col>
                        <Col>user</Col>
                        <Col>from</Col>
                        <Col>to</Col>
                    </Row>
                </div>
            </ListHeader>
        );
    };

    const formattedDate = date => {
        if(date == null){
            return "";
        }
        const y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        const w = date.getDay();
        const wNames = ['日', '月', '火', '水', '木', '金', '土'];

        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }

        // フォーマット整形済みの文字列を戻り値にする
        return y + '/' + m + '/' + d;
    };

    const renderLog = (log, index) => {
        return (
            <ListItem modifier="longdivider" tappable>
                <div className="center"  style={{padding: "2px 1px 2px 1px"}}>
                    <Col width="27px">{String(log.id).trim()}</Col>
                    <Col>{log.user}</Col>
                    <Col>{formattedDate(log.createdAt)}</Col>
                    <Col>{formattedDate(log.returnedAt)}</Col>
                </div>
            </ListItem>
        );
    };

    return (
        <List
            modifier="inset"
            dataSource={RentalLogs.find({ item_id: task.id  }, { sort: { createdAt: -1 } }).fetch()}
            renderHeader={_renderHeader}
            renderRow={renderLog}
            //renderHeader={() => <ListHeader> </ListHeader> }
        />
    );
};

LogList.propTypes = {
};

export default createContainer(() => {
    return {
        logs: RentalLogs.find({}).fetch(),
        currentUser: Meteor.user()
    };
}, LogList);
