
/**
 * Service to call HTTP request via Axios
 */
const JikanService = {
  init() {
    
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource) {
    return new Promise((resolve) => {
      var request = require('request');
      request(resource, function (error, response, body) {
        resolve(JSON.parse(body))
      });
    });
  },
}
export default JikanService;
