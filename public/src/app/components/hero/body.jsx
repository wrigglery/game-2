var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var debug = require('debug')('game:components:hero:body');

var HeroListenerMixin = require('./mixins/hero-listener');

var ThingSlot = require('./body/thing-slot');
var ImageSlot = require('./body/image-slot');

var HeroApi = require('../../utils/hero-api');

var Paper = mui.Paper;

var HeroBody = React.createClass({
  propTypes: {
    actions: React.PropTypes.bool
  },
  mixins: [HeroListenerMixin],
  render: function() {
    var hero = this.state.hero;

    if (_.isEmpty(hero)) return null;

    var style;
    var position = {};
    var width = 70;
    var height = 75;
    var offset = 6;
    var pullRigth = (3 * width) + (4 * offset);
    var fullHeight;
    var elixir;
    var ring;

    var things = hero.things.filter(thing => thing.dressed);

    var getThing = function(type) {
      return _.find(things, function(thing) {
        return thing.thing.type === type;
      });
    };

    // TODO do refactoring with body and slots proporties
    position.gloves = {
      left: offset,
      top: offset
    };

    position.helmet = {
      left: width + 2 * offset,
      top: offset
    };

    position.amulet = {
      left: 2 * width + 3 * offset,
      top: offset
    };

    position.treetops = {
      left: pullRigth,
      top: offset
    };

    position.arms = {
      height: 85,
      left: offset,
      top: height + 2 * offset
    };

    position.armor = {
      height: 90,
      left: offset,
      top: position.arms.top + position.arms.height + offset
    };

    position.pants = {
      height: 110,
      left: offset,
      top: position.armor.top + position.armor.height + offset
    };

    fullHeight = height + position.arms.height +
      position.armor.height + position.pants.height + 5 * offset;

    position.elixir = {};
    elixir = position.elixir;
    elixir.height = 32;
    elixir.width = elixir.height;
    elixir.left = width + (2 * offset);
    elixir.top = fullHeight - elixir.height - offset;

    position.elixir1 = {
      left: elixir.left + offset + elixir.width,
      top: elixir.top
    };
    position.elixir2 = {
      left: elixir.left + offset * 2 + elixir.width * 2,
      top: elixir.top
    };
    position.elixir3 = {
      left: elixir.left + 3 * offset + 3 * elixir.width,
      top: elixir.top
    };

    position.shield = {
      height: 85,
      left: pullRigth,
      top: height + (2 * offset)
    };

    position.ring = {};
    ring = position.ring;
    ring.height = 32;
    ring.width = ring.height;
    ring.left = pullRigth;
    ring.top = position.shield.top + position.shield.height + offset;

    position.ring1 = {
      left: ring.left + offset + ring.width,
      top: ring.top
    };
    position.ring2 = {
      left: ring.left,
      top: ring.top + offset + ring.height
    };
    position.ring3 = {
      left: ring.left + offset + ring.width,
      top: ring.top + offset + ring.height
    };

    position.belt = {
      height: 50,
      left: pullRigth,
      top: position.ring.top + 2 * position.ring.height + 2 * offset
    };

    position.boots = {
      left: pullRigth,
      top: position.belt.top + position.belt.height + offset
    };

    _.forEach(position, function(pos) {
      pos.position = 'absolute';
    });

    style = {
      position: 'relative',
      width: (width * 4) + (offset * 5),
      height: fullHeight
    };

    debug('render');

    var thingsSlots = [
      'gloves', 'helmet', 'amulet', 'treetops',
      'arms', 'armor', 'shield', 'pants', 'belt', 'boots',
      'ring', 'ring1', 'ring2', 'ring3',
      'elixir', 'elixir1', 'elixir2', 'elixir3'
    ].map(function(type, index) {
      var orgType = type.replace(/\d+/g, '');
      var thing = getThing(orgType);
      var undressHandler;

      if (thing && this.props.actions) {
        undressHandler = this._onUndress.bind(null, thing._id);
      }

      return (
        <div
          onClick={undressHandler}
          key={index}
          style={position[type]}>
          <ThingSlot
            thing={thing}
            type={orgType} />
        </div>
      );
    }.bind(this));

    return (
      <div className="hero-body">
        <Paper zDepth={2} style={style}>
          <ImageSlot
            left={width + 2 * offset}
            top={height + 2 * offset}
            width={146}
            height={259}
            image={hero.image} />

          {thingsSlots}
        </Paper>
      </div>
    );
  },
  _onUndress: function(id) {
    HeroApi.undressThing(id);
  }
});

module.exports = HeroBody;
