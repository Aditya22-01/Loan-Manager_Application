import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'registerUser'(email, role) {
    // Validate email and role
    check(email, String);
    check(role, String);
    if (!['borrower', 'lender', 'admin'].includes(role)) {
      throw new Meteor.Error('invalid-role', 'Invalid user role');
    }

    // Generate a secure random password
    const defaultPassword = Random.secret();
    
    const userId = Accounts.createUser({
      email: email,
      password: defaultPassword,
      profile: {
        role: role,
        name: email.split('@')[0],
        loans: [],
      },
    });

    return userId;
  },

  'requestLoan'(amount) {
    // Validate amount
    check(amount, Number);
    
    const user = Meteor.user();
    if (!user || !user.profile || user.profile.role !== 'borrower') {
      throw new Meteor.Error('not-allowed', 'User not allowed to request a loan');
    }

    const loan = {
      amount: amount,
      status: 'pending',
    };

    Meteor.users.update(
      { _id: user._id },
      {
        $push: {
          'profile.loans': loan,
        },
      }
    );
  },
});
