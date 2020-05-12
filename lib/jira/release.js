// https://docs.atlassian.com/software/jira/docs/api/REST/8.1.0/
module.exports = function () {
  var request = require('superagent');

  var moment = require('moment');

  var config = require('../../lib/config');

  var release = {
    query: null,
    table: null,
    create: function (version, options) {
      this.query = 'rest/api/2/version';
      var releaseDate = moment().format('YYYY-MM-DD');
      request.post(config.auth.url + this.query).send({
        "name": version,
        "project": options.project,
        "released": options.released,
        "releaseDate": releaseDate,
        "description": options.description
      }).set('Content-Type', 'application/json').set('Authorization', 'Basic ' + config.auth.token).end((err, res) => {
        if (!res.ok) {
          return console.log((res.body.errorMessages || [res.error]).join('\n'));
        }

        console.log('ReleaseId=' + res.body.id);
        console.log('ProjectId=' + res.body.projectId);
        return;
      });
    }
  };
  return release;
}();