import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { Button, Row, Col, ListItem, Input, Icon } from 'react-onsenui';
import ons from 'onsenui';
import { Meteor } from 'meteor/meteor';
import { RentalLogs } from '../api/rentallogs.js';

const Task = ({currentUser, task, onClick}) => {
    const handleRentalButton = () => {
        ons.notification.prompt({
            title: '備品貸出申請',
            message: '使用者の名前を入力してください',
            placeholder: '例: 早稲田　太郎',
            defaultValue: (currentUser ? currentUser.username : ""),
            cancelable: true,
            buttonLabel: 'この備品を借りる'
        }).then(saveRentalLog);
    };


    const saveRentalLog = inputValue => {
        const user = inputValue.trim();

        if (user) {
            RentalLogs.insert({
                id: RentalLogs.find({}).count()+1,
                user,
                item_id: task.id,
                item_name: task.name,
                createdAt: new Date(),
            });

        } else {
            ons.notification.alert('名前を入力してください')
        }
    };

    const handleReturnButton = () => {
        ons.notification.confirm({
            title: '返却申請',
            message: 'この備品を返却しますか？',
            cancelable: true,
            buttonLabel: 'はい'
        }).then(updateReturn);
    };

    const updateReturn = () => {
        const _id = RentalLogs.findOne({ $and: [
            { item_id  : task.id },
            { returned : {$exists : false} }
        ] })._id;

        RentalLogs.update(_id, {
            $set: { returned: true, returnedAt: new Date() }
        });
    };

    const isUsed = () => {
        return 0 < RentalLogs.find({ $and: [
            { item_id  : task.id },
            { returned : { $exists:false } }
        ] }).count() ? RentalLogs.findOne({ $and: [
            { item_id  : task.id },
            { returned : { $exists:false } }
        ] }).user : "";
    };

    const formattedDate = date => {
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

    const usedFrom = () => {
        return 0 < RentalLogs.find({ $and: [
            { item_id  : task.id },
            { returned : { $exists:false } }
        ] }).count() ? formattedDate(RentalLogs.findOne({ $and: [
            { item_id  : task.id },
            { returned : { $exists:false } }
        ] }).createdAt) : "";
    };

    return (
        <ListItem modifier="longdivider" tappable>
            <div className="center" style={{height: '25px'}}>
                <Col witdh="20%">{
                    isUsed()!=="" ?
                        (<Button onClick={handleReturnButton} modifier={"material"}>
                            返却申請
                        </Button>) :
                        (<Button onClick={handleRentalButton} modifier={"outline"}>
                            貸出申請
                        </Button>)
                }</Col>

                <Col witdh="15%" onClick={onClick}>{task.id}</Col>

                {ons.orientation.isLandscape() ?
                    (<Col onClick={onClick}>{task.group}</Col>):null
                }

                <Col onClick={onClick}>{task.text}</Col>

                {ons.orientation.isLandscape() ?
                    (<Col onClick={onClick}>{isUsed()}</Col>):null
                }

                {ons.orientation.isLandscape() ?
                    (<Col onClick={onClick}>{usedFrom()}</Col>):null
                }
            </div>
        </ListItem>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default createContainer(() => {
    return {
        logs: RentalLogs.find({}).fetch(),
        currentUser: Meteor.user()
    };
}, Task);