
var React = require('react/addons')
var PT = React.PropTypes
var api = require('./api')

var SettingsCheckbox = React.createClass({
  propTypes: {
    name: PT.string.isRequired,
    enableOptions: PT.object.isRequired,
    disableOptions: PT.object.isRequired,
    label: PT.string.isRequired,
    onClick: PT.func
  },

  getInitialState: function () {
    return {
      checked: true
    }
  },

  componentDidMount: function() {
    var name = this.props.name
    api.settings().then( (settings) => {
      var checked;
      if (!settings.options) {
        checked = false
      } else {
        checked = !!settings.options[name]
      }
      this.setState({checked: checked})
    })
  },

  handleChange: function(e) {
    var name = this.props.name
    var addedOptions = e.target.checked ? this.props.enableOptions
                                        : this.props.disableOptions
    var value = e.target.checked
    api.setSetting(name, value, addedOptions).then( (result) => {
      console.log(result.updated)
      this.setState({
        checked: result.settings.options[name]
      });
    });
  },

  render: function() {
    return (
      <p>
      <label>
          <input
            checked={this.state.checked}
            type="checkbox"
            onChange={this.handleChange}
            onClick={this.props.onClick}
          />
          &nbsp; {this.props.label}
        </label>
      </p>
    );
  }
});

module.exports = SettingsCheckbox
