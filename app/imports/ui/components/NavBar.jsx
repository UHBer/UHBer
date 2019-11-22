import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Grid, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#024731' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>

        {this.props.currentUser ? (
            [<Menu.Item position="left" as={NavLink} activeClassName="active" exact to="/add" key='add'>
              <Icon name='plus square outline' size='large'/>Create Ride</Menu.Item>,
              <Menu.Item position="left" as={NavLink} activeClassName="active" exact to="/list" key='list'>
                <Icon name='car' size='large'/>Available Rides</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}

        <Grid textAlign='center' container padded>
          <Menu.Item position="center" as={NavLink} activeClassName="" exact to="/">
            <Image size="small" src="/images/UHber.png" />
          </Menu.Item>
        </Grid>

        {this.props.currentUser ? (
            [<Menu.Item position="right" icon={'calendar alternate outline'}
                        as={NavLink} activeClassName="active" exact to="/" key=''>
              <Icon name={'calendar alternate outline'} size='large'/>Calendar</Menu.Item>]
        ) : ''}

        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'caret down'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign-in" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="address card" text="Profile" as={NavLink} exact to="" />
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
