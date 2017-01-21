import VALIDATION_CONST from './validation-const';
import _ from 'lodash';

const ranks = VALIDATION_CONST.STATUS_RANKS;

const validationService = {
    /**
     * Return the most severe status given a list of validation
     * messages.
     * @param messages
     * @returns {*}
     */
    getMostSevereStatus (messages) {
        const message = _.head(
            _.sortBy(messages, message => message.rank)
        );
        if (message) return message.status;
    },
    /**
     * Determine if a given status is more severe than another.
     * Lower ranks are more severe than higher ranks
     * @param status
     * @param overallStatus
     * @returns {boolean}
     */
    isMoreSevereStatus (status, overallStatus) {
        return ranks[status] < ranks[overallStatus];
    },
    isError (status) {
        return status === VALIDATION_CONST.STATUS.ERROR;
    }
};

export default validationService;
