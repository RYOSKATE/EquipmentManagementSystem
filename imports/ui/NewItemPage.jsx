import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { Input, Dialog, Button, Row, Col, Page, Toolbar, BackButton } from 'react-onsenui';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';

const NewItemPage = ({navigator}) => {

    const renderToolbar = () => {
        return (
            <Toolbar>
                <div className='left'>
                    <BackButton onClick={() => navigator.popPage()}>
                        <span className="back-button__label">Todos</span>
                    </BackButton>
                </div>
                <div className="center">Task Details</div>
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
                            value={Tasks.find({}).count()+1} />
                    </Col>
                </Row>
                <Row>
                    <Col>　種別</Col>
                    <Col>
                        <Input
                            type="text"
                            float
                            inputId={`input-group`}
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
                            inputId={`input-name`}
                            modifier='underbar'
                            placeholder='例: MacBook Pro' />
                    </Col>
                </Row>
                <Row>
                    <Col>　追加日</Col>
                    <Col>
                        <Input
                            type="date"
                            float
                            inputId={`input-date`}
                            modifier='underbar'
                            value={formattedDate} />
                    </Col>
                </Row>
                <section style={{margin: '16px'}}>
                        <Button modifier='large--cta'>Add This Item</Button>
                </section>
            </div>
        </Page>
    );
};

NewItemPage.propTypes = {
    task: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
};

export default NewItemPage;