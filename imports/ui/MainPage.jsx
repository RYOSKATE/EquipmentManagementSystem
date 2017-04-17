import React, { PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';
import ons from 'onsenui';
import { Row, Col, Page, Toolbar, Input, Fab, Icon, ToolbarButton } from 'react-onsenui';
import TaskList from './TaskList.jsx';
import NewItemPage from './NewItemPage.jsx';

const MainPage = ({navigator}) => {

    const handleNewTaskClick = () => {
        navigator.pushPage({
            component: NewItemPage,
            key: 'NEW_ITEM_PAGE',
        });
    };
    
    const renderToolbar = () => {
        return (
            <Toolbar>
                <div className="center">Washi Lab. Items</div>
                <div className="right">
                    {ons.platform.isAndroid() ? null :
                        (<ToolbarButton onClick={handleNewTaskClick} modifier="outline">
                            New
                        </ToolbarButton>)
                    }
                </div>
            </Toolbar>
        );
    };

    const renderFixed = () => {
        return ons.platform.isAndroid() ? (
            <Fab
                onClick={handleNewTaskClick}
                position='bottom right'
            >
                <Icon
                    icon='md-edit'
                />
            </Fab>
        )
            : null;
    };

    return (
        <Page
            renderToolbar={renderToolbar}
            renderFixed={renderFixed}
        >
            <div className="center"  >
                <Row>
                    <Col >Label</Col>
                    <Col >Group</Col>
                    <Col >Name</Col>
                    <Col >used by</Col>
                    <Col >　</Col>
                </Row>
            </div>
            <TaskList navigator={navigator}/>
        </Page>
    );
};

MainPage.propTypes = {
    navigator: PropTypes.object
};

export default MainPage;
