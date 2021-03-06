/**
 * Created by Mo Chen on 4/25/2018.
 */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Layout, Menu, Icon, Dropdown, Breadcrumb, Button, Avatar} from 'antd';
import {localeEN, localeZH, handleToggle, handleSignOut, handleProfile} from "../redux/actions";
import {baseURL} from '../config/url';
import utils from "../libs/utils";
import history from "../libs/history";
import '../assets/css/layoutHasSidebar.less';

const mapStateToProps = (state) => {
    return {
        locale: state.localeReducer.locale,
        msgs: state.localeReducer.msgs,
        collapsed: state.toggleReducer.collapsed,
        profile: state.profileReducer.profile,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        localeZH: () => dispatch(localeZH()),
        localeEN: () => dispatch(localeEN()),
        handleToggle: () => dispatch(handleToggle()),
        handleSignOut: () => dispatch(handleSignOut()),
        handleProfile: () => dispatch(handleProfile()),
    }
};

const { Header, Content, Sider, Footer } = Layout;

const navBar = [
    {linkTo: 'home', name: 'home', icon: 'home'},
    {linkTo: 'products', name: 'products', icon: 'book'},
];

class LayoutWithSidebar extends React.Component {

    handleClick = () => {
        if (this.props.locale === 'zh-CN') {
            this.props.localeEN();
        } else if (this.props.locale === 'en-US') {
            this.props.localeZH();
        }
    };

    handleSignOut = () => {
        const {logoutSuccess, logoutFail} = this.props.msgs.messages;
        this.props.handleSignOut().then(res => {
            res === -1 ? utils.nMessage.error(logoutFail) : utils.nMessage.success(logoutSuccess);
        }).catch(err => {
            utils.nMessage.error(logoutFail)
        })
    };

    componentDidMount() {
        this.props.handleProfile();
    };

    render() {
        const {navItem, userMenu} = this.props.msgs;
        const {name, avatar} = this.props.profile;
        const menu = (
            <Menu className="header_menu">
                <Menu.Item key="0" onClick={() => history.push('/profile')}>{userMenu.profile}</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" onClick={this.handleSignOut}>{userMenu.signout}</Menu.Item>
            </Menu>
        );
        return (
            <Layout className="outer_layout">
                <Sider
                    theme="dark"
                    trigger={null}
                    collapsible
                    collapsed={this.props.collapsed}
                    className="nav_bar"
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        selectedKeys={
                            navBar.map((item) => {
                                if (this.props.location.pathname.split('/')[1] === item.linkTo) {
                                    return item.name
                                }
                                return null
                            })
                        }
                        mode="inline"
                        className="menu_items"
                    >
                        {
                            navBar.map((item, index) => (
                                <Menu.Item key={item.name}>
                                    <NavLink to={`/${item.linkTo}`}>
                                        <Icon type={item.icon} />
                                        <span>{navItem[item.name]}</span>
                                    </NavLink>
                                </Menu.Item>
                            ))
                        }
                    </Menu>

                </Sider>
                <Layout className="inner_layout">
                    <Header className="header_bar">
                        <div className='toggle_wrapper'>
                            <Icon
                                className="trigger"
                                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.props.handleToggle}
                            />
                            <Button type='default' size='small' onClick={this.handleClick}>
                                {this.props.locale === 'zh-CN' ? 'EN' : '中文'}
                            </Button>
                        </div>
                        <div className="header_right">
                            <Dropdown overlay={menu} trigger={['hover']}>
                                <div className="user">
                                    <div className="name">{name}</div>
                                    {
                                        avatar ? <Avatar src={baseURL + avatar}/> : <Avatar>{name ? name.substr(0,1) : ''}</Avatar>
                                    }
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className="content_wrapper">
                        <Breadcrumb className="breadcrumb">
                            {
                                this.props.location.pathname.split('/').map((str, index) => (
                                    <Breadcrumb.Item key={index}>{navItem[str]}</Breadcrumb.Item>
                                ))
                            }
                            {
                                this.props.location.pathname.split('/')[1] === 'products' && this.props.location.pathname.split('/')[2] &&
                                <Breadcrumb.Item key='productDetails'>{navItem['productDetails']}</Breadcrumb.Item>
                            }
                        </Breadcrumb>
                        <div className="content">
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer className="footer">demo-react-admin @ https://github.com/mochen0505</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutWithSidebar));