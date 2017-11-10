/**
 * Main exporter file for the TBDb wrapper.
 */

module.exports = {
    find: require('./find').find,
    details: require('./details'),
    discover: require('./discover'),
    search: require('./search').search
}
