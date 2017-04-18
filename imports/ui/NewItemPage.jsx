import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import ons from 'onsenui';
import { Input, Dialog, Button, Row, Col, Page, Toolbar, BackButton } from 'react-onsenui';
import { Tasks } from '../api/tasks.js';

const NewItemPage = ({newItemId, navigator}) => {

    const renderToolbar = () => {
        return (
            <Toolbar>
                <div className='left'>
                    <BackButton onClick={() => navigator.popPage()}>
                        <span className="back-button__label">Back</span>
                    </BackButton>
                </div>
                <div className="center">Add New Item</div>
            </Toolbar>
        );
    };

    const formattedDate = () => {
        const date = new Date();
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
        return y + '-' + m + '-' + d;
    };

    const handleAddItemClick = () => {
        ons.notification.alert({
            title: 'Add Item',
            message: 'Do you want to add this?.',
            cancelable: true
        }).then(saveNewItem);
    };

    const saveNewItem = () => {
        const group = document.getElementById('inputgroup').value;
        const text  = document.getElementById('inputname').value;
        const note = document.getElementById('inputnote').value;
        if (group!=="" && text!=="") {
            Tasks.insert({
                id: Tasks.find({}).count()+1,
                text,
                group,
                note,
                createdAt: new Date()
            });

        } else {
            ons.notification.alert('You must provide all inputs!')
        }
    };

    return (
        <Page renderToolbar={renderToolbar} >
            <div className="center" style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                <Row >
                    <Col >　ID</Col>
                    <Col>
                        <Input
                            type='number'
                            float
                            disable
                            modifier='underbar'
                            value={newItemId+""} />
                    </Col>
                </Row>
                <Row>
                    <Col>　種別</Col>
                    <Col>
                        <Input
                            type="text"
                            float
                            //ref='inputgroup'
                            inputId='inputgroup'
                            modifier='underbar'
                            placeholder='例: コンピュータ' />
                    </Col>
                </Row>
                <Row>
                    <Col>　備品名</Col>
                    <Col>
                        <Input
                            type="text"
                            float
                            //ref='inputname'
                            inputId='inputname'
                            modifier='underbar'
                            placeholder='例: MacBook Pro' />
                    </Col>
                </Row>
                <Row>
                    <Col>備考</Col>
                    <Col>
                        <textarea
                            className="textarea"
                            id="inputnote"
                            style={{
                                height: '100px'
                            }}/>
                    </Col>
                </Row>
                {/*<Row>*/}
                    {/*<Col>　追加日</Col>*/}
                    {/*<Col>*/}
                        {/*<Input*/}
                            {/*type="date"*/}
                            {/*float*/}
                            {/*//ref='inputdate'*/}
                            {/*inputId='inputdate'*/}
                            {/*modifier='underbar'*/}
                            {/*value={formattedDate()} />*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                <section style={{margin: '16px'}}>
                        <Button onClick={handleAddItemClick} modifier='large--cta'>Add This Item</Button>
                </section>
            </div>
        </Page>
    );
};

NewItemPage.propTypes = {
    navigator: PropTypes.object.isRequired
};

export default createContainer(() => {
    return {
        newItemId: Tasks.find({}).count()+1
    };
}, NewItemPage);