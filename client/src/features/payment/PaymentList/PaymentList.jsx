import React, { Component } from 'react'
import { fetchPayments } from '../paymentActions';
import { connect } from 'react-redux';
import LoadingIndicater from '../../../app/layout/LoadingIndicater';

class PaymentList extends Component {
    componentWillMount(){
        this.props.fetchPayments();
    }

    render() {
        const { payments, loading } = this.props;
        console.log(payments);
        if(loading)
            return <LoadingIndicater />
        return (
            <div>
                <h1>Payment list</h1>
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    return {
        payments: state.payments.list,
        loading: state.async.loading
    }
}

const actions = {
    fetchPayments
};

export default connect(mapState, actions)(PaymentList);