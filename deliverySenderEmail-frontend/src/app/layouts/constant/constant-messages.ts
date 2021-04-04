export const DIALOG = {
    CONFIRM: {
        DELETE: {
            title: 'Are you sure you want to delete?',
            content: 'All data will be inactive and will not be available for use.',
            actionConfirm: 'Delete',
            actionCancel: 'Cancel'
        },
        UPDATE: {
            title: 'Are you sure you want to update?',
            content: 'The changed information is reflected in other parts of the system.',
            actionConfirm: 'Update',
            actionCancel: 'Cancel'
        }
    }
};

export const TOAST = {
    SUCCESS: {
        SAVE: {
            message: 'Registration saved successfully!',
            action: 'Close',
            type: 'success-snackbar'
        },
        DELETE: {
            message: 'Record deleted!',
            action: 'Close',
            type: 'success-snackbar'
        },
        UPDATE: {
            message: 'Registration updated!',
            action: 'Close',
            type: 'success-snackbar'
        },
        WELCOME: {
            message: 'Welcome to Delivery Sender Email !',
            action: 'Close',
            type: 'success-snackbar'
        }
    },

    ERROR: {
        message: 'Oops! There was a problem with this record!',
        action: 'Close',
        type: 'error-snackbar'
    },

    ERROR_LOGIN: {
        message: 'Invalid Credentials!',
        action: 'Close',
        type: 'error-snackbar'
    },

    WARNING: {
        message: 'Heads up!',
        action: 'Close',
        type: 'error-snackbar'
    }
};
