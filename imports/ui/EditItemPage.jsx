import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import ons from 'onsenui';
import { Input, Dialog, Button, Row, Col, Page, Toolbar, BackButton } from 'react-onsenui';
import { Tasks } from '../api/tasks.js';
import LogList from './LogList';

const EditItemPage = ({task, navigator}) => {

    const renderToolbar = () => {
        return (
            <Toolbar>
                <div className='left'>
                    <BackButton onClick={() => navigator.popPage()}>
                        <span className="back-button__label">Back</span>
                    </BackButton>
                </div>
                <div className="center">Edit Item</div>
            </Toolbar>
        );
    };

    const handleUpdateItemClick = () => {
        ons.notification.alert({
            title: 'Update',
            message: 'Do you want to update this?.',
            cancelable: true
        }).then(updateItem);
    };

    const updateItem = () => {
        const id = Number(document.getElementById('editid').value);
        const group = document.getElementById('editgroup').value;
        const text  = document.getElementById('editname').value;
        const note = document.getElementById('editnote').value;
        if((id != task.id)   &&   (0 < Tasks.find({ id:  id }).count())){
                ons.notification.alert('ID must be unique!!');
        }else if (group!=="" && text!=="") {
            Tasks.update(task._id, {
                $set: {id, text, group, note }
            });
            ons.notification.alert('Edit Success!');
        } else {
            ons.notification.alert('You must provide all inputs!');
        }
    };

    const handleDeleteItemClick = () => {
        ons.notification.alert({
            title: 'Delete',
            message: 'Do you want to Delete this?.',
            cancelable: true
        }).then(deleteItem);
    };

    const deleteItem = () => {
        Tasks.remove({_id : task._id});
        navigator.popPage();
    };

    return (
        <Page renderToolbar={renderToolbar} >
            <div className="center" style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                <Row>　</Row>
                <Row >
                    <Col >　ID</Col>
                    <Col>
                        <Input
                            type='number'
                            float
                            disable
                            inputId='editid'
                            modifier='underbar'
                            value={task.id} />
                    </Col>
                </Row>
                <Row>　</Row>
                <Row>
                    <Col>　種別</Col>
                    <Col>
                        <Input
                            type="text"
                            float
                            inputId='editgroup'
                            modifier='underbar'
                            value={task.group}
                            placeholder='例: コンピュータ' />
                    </Col>
                </Row>
                <Row>　</Row>
                <Row>
                    <Col>　備品名</Col>
                    <Col>
                        <Input
                            type="text"
                            float
                            inputId='editname'
                            modifier='underbar'
                            value={task.text}
                            placeholder='例: MacBook Pro' />
                    </Col>
                </Row>
                <Row>　</Row>
                <Row>
                    <Col>　備考</Col>
                    <Col>
                        <textarea
                            className="textarea"
                            id="editnote"
                            defaultValue={task.note}
                            style={{
                                height: '100px'
                            }}/>
                    </Col>
                </Row>
                <section style={{margin: '16px'}}>
                    <Button onClick={handleUpdateItemClick} modifier='large--cta'>Update</Button>
                </section>
            </div>
            <section style={{margin: '16px'}}>
                <Button onClick={handleDeleteItemClick} modifier='light'>Delete</Button>
            </section>
            <LogList task={task}/>
        </Page>
    );
};

EditItemPage.propTypes = {
    task: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
};

export default createContainer(() => {
    return {

    };
}, EditItemPage);