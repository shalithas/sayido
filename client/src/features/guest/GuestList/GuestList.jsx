import React, { Component } from "react";
import { Table, Label, Menu, Icon, Button, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchGuests } from "../guestActions";
import LoadingIndicater from "../../../app/layout/LoadingIndicater";
import './style.css';
class GuestList extends Component {
  state = {
    pages: 10,
    currentPage: 1
  };

  handlePageChange = page => {
    this.props.fetchGuests(page);
    this.setState({ currentPage: page });
  }

  componentDidMount(){
    this.props.fetchGuests(1);
  }

  render() {

    const PageList = () => {
      const pages = [];
      for(let i = 1; i <= this.state.pages; i++){
        pages.push(<Menu.Item key={i} as={Button} active={this.state.currentPage === i} onClick={() => this.handlePageChange(i)}>{i}</Menu.Item>)
      }
      return pages;
    }

    if(this.props.loading) return <LoadingIndicater inverted={true} />;
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='actions'></Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell className='invitation'>Invitation Sent</Table.HeaderCell>
            <Table.HeaderCell className='rsvp'>RSVP</Table.HeaderCell>
            <Table.HeaderCell className='actions'></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.guests.map((guest) => (
            <Table.Row key={guest._id}>
              <Table.Cell><Checkbox name='guests[]' value={guest._id} /></Table.Cell>
              <Table.Cell>{guest.name}</Table.Cell>
              <Table.Cell>{guest.email}</Table.Cell>
              <Table.Cell>{guest.phone}</Table.Cell>
              <Table.Cell className='invitation'>
                <span className={ guest.invitationSent ? 'invitation yes' : 'invitation no'}>{guest.invitationSent ? 'Yes' : 'No' }</span>
              </Table.Cell>
              <Table.Cell className='rsvp'>
                {guest.rsvp && <span className={ guest.rsvp ? 'rsvp yes' : 'rsvp no' }>{guest.rsvp ? 'Yes' : 'No' }</span>}
                {!guest.rsvp && <span className='rsvp pending'>Pending</span>}
              </Table.Cell>
              <Table.Cell className='actions'>
                <Button secondary icon='edit' />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='7'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <PageList />
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

const mapState = state => ({
  guests: state.guests,
  loading: state.async.loading
});

const actions = {
  fetchGuests
};

export default connect(mapState, actions)(GuestList);
