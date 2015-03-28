var React = require('react');
var mui = require('material-ui');

var debug = require('debug')('game:components:hero:info:information');

var Paper = mui.Paper;

var HeroInfoInformation = React.createClass({
  render: function() {
    var props = this.props;
    var style = {
      width: 205,
      height: 140
    };

    debug('render');

    return (
      <Paper
        style={style}
        rounded={false}
        zDepth={1}
        className="block information-block">
        <div className="mui-font-style-subhead-1">Information</div>
        <dl className="dl-horizontal">
          <dt>Number of wins</dt>
          <dd>{props.numberOfWins}</dd>
          <dt>Number of losses</dt>
          <dd>{props.numberOfLosses}</dd>
          <dt>Number of draws</dt>
          <dd>{props.numberOfDraws}</dd>
          <dt className="experience">Experience</dt>
          <dd>{props.experience}/{props.nextLevelExperience}</dd>
        </dl>
      </Paper>
    );
  }
});

module.exports = HeroInfoInformation;
