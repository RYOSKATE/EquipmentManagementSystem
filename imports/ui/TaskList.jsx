import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';

import { Col, List, ListHeader } from 'react-onsenui';
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

    const renderTask = (task, index) => {
        return (
            <Task key={task._id} onClick={() => taskClickHandler(index)} task={task} />
        );
    };

    return (
        <List
            modifier="inset"
            dataSource={tasks}
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
