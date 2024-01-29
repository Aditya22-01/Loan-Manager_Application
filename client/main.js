import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.dashboard.helpers({
  currentUser() {
    return Meteor.user();
  },
  isBorrower() {
    const user = Meteor.user();
    return user && user.profile && user.profile.role === 'borrower';
  },
  loans() {
    const user = Meteor.user();
    return user && user.profile && user.profile.loans;
  },
});

Template.userForm.events({
  'click button'(event) {
    const email = $('#email').val();
    const role = $('#role').val();
    Meteor.call('registerUser', email, role);
  },
});

Template.loanForm.events({
  'click button'(event) {
    const amount = $('#loanAmount').val();
    Meteor.call('requestLoan', amount);
  },
});

