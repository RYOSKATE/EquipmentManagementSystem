import { createContainer } from 'meteor/react-meteor-data';
import React, { PropTypes } from 'react';
import ons from 'onsenui';
import { Meteor } from 'meteor/meteor';
import { Dialog, Row, Col, Page, Toolbar, Input, Fab, Icon, ToolbarButton } from 'react-onsenui';
import TaskList from './TaskList.jsx';
import NewItemPage from './NewItemPage.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const MainPage = ({ currentUser, navigator}) => {

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
                    {currentUser ?
                        (<ToolbarButton onClick={handleNewTaskClick} modifier="outline">
                            New
                        </ToolbarButton>): null
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
            <TaskList navigator={navigator}/>
            <span>　<AccountsUIWrapper /></span>
        </Page>
    );
};

MainPage.propTypes = {
    navigator: PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, MainPage);