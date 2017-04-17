import React, { PropTypes } from 'react';
import { Row, Col, ListItem, Input, Icon } from 'react-onsenui';

import { Tasks } from '../api/tasks.js';

const Task = ({task, onClick}) => {
    const toggleChecked = () => {
        Tasks.update(task._id, {
            $set: { checked: !task.checked }
        });
    };

    const deleteThisTask = () => {
        Tasks.remove(task._id);
    };

    return (
        <ListItem modifier="longdivider" tappable>
                <div
                    className="center"
                    onClick={onClick}
                >
                    <Col >{task.id}</Col>
                    <Col >{task.group}</Col>
                    <Col >{task.text}</Col>
                    <Col >{task.user}</Col>
                </div>

            <label className="right">
                <Icon
                    icon={{default: 'ion-ios-trash-outline', material: 'md-delete'}}
                    onClick={deleteThisTask}
                />
            </label>
        </ListItem>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default Task;
