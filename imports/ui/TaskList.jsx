import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';
import ons from 'onsenui';
import { Row, Col, List, ListHeader } from 'react-onsenui';
import TaskDetailsPage from './TaskDetailsPage.jsx';
import EditItemPage from './EditItemPage.jsx';
import { Meteor } from 'meteor/meteor';
import Task from './Task.jsx';

const TaskList = ({currentUser, tasks, incompleteCount, navigator}) => {
    const taskClickHandler = index => {
        if(currentUser){
            navigator.pushPage({
                component: EditItemPage,
                key: 'EDIT_ITEM_PAGE',
                task: tasks[index],
                props: {
                    task: tasks[index]
                }
            });
        }else{
            navigator.pushPage({
                component: TaskDetailsPage,
                key: 'TASK_DETAILS_PAGE',
                task: tasks[index],
                props: {
                    task: tasks[index]
                }
            });
        }

    };


    const _renderHeader = () => {
        return(
            <ListHeader>
                <div className="center"  >
                    <Row >
                        <Col width="27px">No</Col>
                        <Col width="65px"> </Col>
                        { ons.orientation.isLandscape() ? (<Col >Group</Col>) : null }
                        <Col>Name</Col>
                        <Col>Used by</Col>
                    </Row>
                </div>
            </ListHeader>
        );
    };

    const renderTask = (task, index) => {
        return (
            <Task key={task._id} onClick={() => taskClickHandler(index)} task={task} />
        );
    };

    return (
        <List
            modifier="inset"
            dataSource={tasks}
            renderHeader={_renderHeader}
            renderRow={renderTask}
            //renderHeader={() => <ListHeader> </ListHeader> }
        />
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    navigator: PropTypes.object
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { id: 1 } }).fetch(),
        incompleteCount: Tasks.find({ used: { $ne: false } }).count(),
        currentUser: Meteor.user()
    };
}, TaskList);
