import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import { Dialog, Button, Row, Col, Page, Toolbar, BackButton } from 'react-onsenui';

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
        const date = new Date(task.createdAt);
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
        return y + '年' + m + '月' + d + '日 (' + wNames[w] + ')';
    };

    return (
        <Page renderToolbar={renderToolbar} >
            <div className="center" style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                <Row>
                    <Col >　ID</Col><Col>{task.id}</Col>
                </Row>
                <Row>
                    <Col>　種別</Col><Col>{task.group}</Col>
                </Row>
                <Row>
                    <Col>　備品名</Col><Col>{task.text}</Col>
                </Row>
                <Row>
                    <Col>　追加日</Col><Col>{formattedDate()}</Col>
                </Row>
                <Row>
                    <Col></Col>

                    <Col></Col>
                </Row>
            </div>
        </Page>
    );
};

NewItemPage.propTypes = {
    task: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
};

export default NewItemPage;