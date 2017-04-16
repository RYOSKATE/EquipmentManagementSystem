import React, { PropTypes } from 'react';
import ons from 'onsenui';
import { Dialog, Button, Row, Col, Page, Toolbar, BackButton } from 'react-onsenui';
import { RentalLogs } from '../api/rentallogs.js';

const TaskDetailsPage = ({task, navigator}) => {
    const handleRentalButton = () => {
        ons.notification.prompt({
            title: '備品貸出申請',
            message: '使用者の名前を入力してください',
            placeholder: '早稲田　太郎',
            cancelable: true,
            buttonLabel: 'この備品を借りる'
        }).then(saveRentalLog);
    };

    const saveRentalLog = inputValue => {
        const user = inputValue.trim();

        if (text) {
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
        const id = RentalLogs.find({ $and: [
            { item_id  : task.id },
            { returned : false }
        ] })._id;
        
        RentalLogs.update(id, {
            $set: { returned: true }
        });
    };

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

    const isUsed = () => {
        return RentalLogs.find({ $and: [
            { item_id  : task.id },
            { returned : false }
        ] }).count();
    };

    const userName = () => {
        return RentalLogs.find({ $and: [
            { item_id  : task.id },
            { returned : false }
        ] }).user;
    };

    return (
        <Page renderToolbar={renderToolbar} >
            <Row>
                <Col>　ID</Col><Col>{task.id}</Col>
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
                {
                    {isUsed} ?
                        <Button onClick={handleReturnButton} modifier={"large"}>返却申請(現在の使用者:{userName()})</Button>
                        :
                        <Button onClick={handleRentalButton} modifier={"large"}>貸出申請</Button>
                }
                <Col></Col>
            </Row>

        </Page>
    );
};

TaskDetailsPage.propTypes = {
    task: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
};

export default TaskDetailsPage;
