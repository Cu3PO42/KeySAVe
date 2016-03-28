import React from 'react';
import TextField from 'material-ui/lib/text-field';
import debounce from 'lodash.debounce';

export default class FormattingOptionsHandlebars extends React.Component {
  static propTypes = {
    updateFormat: React.PropTypes.func.isRequired,
    updateCurrentFormat: React.PropTypes.func.isRequired,
    format: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = props.format;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.props.updateFormat(this.props.index);
      this.flush.cancel();
    } else if (this.flushed) {
      this.setState(nextProps.format);
    }
  }

  updateFormat = (e) => {
    this.setState({ format: e.target.value });
    this.flushed = false;
    this.flush();
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
    this.flushed = false;
    this.flush();
  }

  flush = debounce(() => {
    this.props.updateCurrentFormat(this.state);
    this.flushed = true;
  }, 1000);

  flushed = true;

  render() {
    return (
      <div>
        <TextField value={this.state.title} onChange={this.updateTitle} />
        <TextField value={this.state.format} onChange={this.updateFormat} multiLine={true} />
      </div>
    );
  }
}
