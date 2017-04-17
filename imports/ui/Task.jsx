import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { Button, Row, Col, ListItem, Input, Icon } from 'react-onsenui';
import ons from 'onsenui';
import { Tasks } from '../api/tasks.js';
import { RentalLogs } from '../api/rentallogs.js';

const Task = ({task, onClick}) => {
    const handleRentalButton = () => {
        ons.notification.prompt({
            title: '備品貸出申請',
            message: '使用者の名前を入力してください',
            placeholder: '例; 早稲田　太郎',
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

    return (
        <ListItem modifier="longdivider" tappable>
            <div className="center">
                <Col onClick={onClick}>{task.id}</Col>
                <Col onClick={onClick}>{task.group}</Col>
                <Col onClick={onClick}>{task.text}</Col>
                <Col onClick={onClick}>{isUsed()}</Col>
                <Col >{
                    isUsed()!=="" ?
                        (<Button onClick={handleReturnButton} modifier={"material"}>
                            返却申請
                        </Button>) :
                        (<Button onClick={handleRentalButton} modifier={"outline"}>
                            貸出申請
                        </Button>)
                }</Col>
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
        logs: RentalLogs.find({}).fetch()
    };
}, Task);