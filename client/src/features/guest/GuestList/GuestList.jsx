import React, { Component } from 'react';
import { Table, Menu, Icon, Button, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchGuests, deleteGuests } from '../guestActions';
import LoadingIndicater from '../../../app/layout/LoadingIndicater';
import './style.css';
import { openModal } from '../../models/modalActions';
import { withRouter } from 'react-router-dom';
class GuestList extends Component {
  state = {
    pages: 10,
    currentPage: 1,
    selectedGuests: [],
    allSelected: false,
    deleteButtonDisabled: true
  };

  handlePageChange = page => {
    this.props.fetchGuests(page);
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    this.props.fetchGuests(1);
  }

  openEditForm = id => {
    this.props.history.push(`/guests/${id}/edit`);
  };

  handleSelect = selectedGuest => {
    this.props.guests.map(guest => {
      if (selectedGuest._id === guest._id) {
        guest.selected = !guest.selected;
      }

      return guest;
    });
    this.forceUpdate();
    this.checkDeleteButtonState();
  };

  toggleSelectAll() {
    this.setState(prvState => ({
      allSelected: !prvState.allSelected
    }));

    this.props.guests.map(guest => {
      guest.selected = !this.state.allSelected;

      return guest;
    });
    this.checkDeleteButtonState();
  }

  checkDeleteButtonState() {
    let count = 0;
    this.props.guests.forEach(guest => {
      if (guest.selected) {
        count++;
      }
    });

    this.setState({
      deleteButtonDisabled: count === 0
    });
  }

  onDeleteClick = () => {
    const { guests, deleteGuests } = this.props;
    const ids = [];

    guests.forEach(guest => {
      if (guest.selected) {
        ids.push(guest._id);
      }
    });
    console.log(ids);
    deleteGuests(ids);
  }

  render() {
    const PageList = () => {
      const pages = [];
      for (let i = 1; i <= this.state.pages; i++) {
        pages.push(
          <Menu.Item
            key={i}
            as={Button}
            active={this.state.currentPage === i}
            onClick={() => this.handlePageChange(i)}
          >
            {i}
          </Menu.Item>
        );
      }
      return pages;
    };

    if (this.props.loading) return <LoadingIndicater inverted={true} />;

    const { allSelected, deleteButtonDisabled } = this.state;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='actions' textAlign='center'>
              <Checkbox
                fitted
                name='selectAll'
                checked={allSelected}
                onChange={e => this.toggleSelectAll(e, true)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell className='invitation'>
              Invitation Sent
            </Table.HeaderCell>
            <Table.HeaderCell className='rsvp'>RSVP</Table.HeaderCell>
            <Table.HeaderCell className='actions'></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.guests && this.props.guests.map(guest => (
            <Table.Row key={guest._id}>
              <Table.Cell textAlign='center'>
                <Checkbox
                  fitted
                  name='guests[]'
                  checked={guest.selected}
                  onChange={e => this.handleSelect(guest)}
                />
              </Table.Cell>
              <Table.Cell>{guest.name}</Table.Cell>
              <Table.Cell>{guest.email}</Table.Cell>
              <Table.Cell>{guest.phone}</Table.Cell>
              <Table.Cell className='invitation'>
                <span
                  className={
                    guest.invitationSent ? 'invitation yes' : 'invitation no'
                  }
                >
                  {guest.invitationSent ? 'Yes' : 'No'}
                </span>
              </Table.Cell>
              <Table.Cell className='rsvp'>
                {guest.rsvp && (
                  <span className={guest.rsvp ? 'rsvp yes' : 'rsvp no'}>
                    {guest.rsvp ? 'Yes' : 'No'}
                  </span>
                )}
                {!guest.rsvp && <span className='rsvp pending'>Pending</span>}
              </Table.Cell>
              <Table.Cell className='actions'>
                <Button
                  onClick={() => this.openEditForm(guest._id)}
                  secondary
                  icon='edit'
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>
              <Button
                disabled={deleteButtonDisabled}
                color='red'
                icon='trash alternate outline'
                onClick={this.onDeleteClick}
              />
            </Table.HeaderCell>
            <Table.HeaderCell colSpan='6'>
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
  guests: state.guests.list,
  loading: state.async.loading
});

const actions = {
  fetchGuests,
  openModal,
  deleteGuests
};

export default connect(mapState, actions)(withRouter(GuestList));
