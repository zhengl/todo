import React from 'react';
import TodoActions from '../../actions/TodoActions';

import './styles.css';
import removeIcon from 'material-design-icons/content/svg/production/ic_clear_24px.svg';
import confirmIcon from 'material-design-icons/action/svg/production/ic_done_24px.svg';

export default class Todo extends React.Component {
  static propTypes = {
    todo: React.PropTypes.shape({
      id: React.PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      content: props.todo.content,
      isEditing: false,
    };
    this.previousContent = props.todo.content;
  }

  componentDidUpdate() {
    if (this.state.isEditing) {
      this.refs.input.focus();
      this.refs.input.value = this.refs.input.value;
    }
  }

  onChangeContent = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    TodoActions.change({
      id: this.props.todo.id,
      content: this.state.content,
    });
    this.setState({
      isEditing: false,
    });
  }

  handleRemove = () => {
    TodoActions.remove(this.props.todo);
  }

  changeToEditMode = () => {
    this.previousContent = this.state.content;
    this.setState({
      isEditing: true,
    });
  }

  changeToNormalMode = () => {
    this.setState({
      content: this.previousContent,
      isEditing: false,
    });
  }

  render() {
    const { content } = this.state;
    if (this.state.isEditing) {
      return (
        <li className="todo">
          <div className="todo__backdrop" onClick={ this.changeToNormalMode }></div>
          <form className="todo__edit" onSubmit={ this.handleChange }>
            <input className="todo__edit__input" value={ content } onChange={ this.onChangeContent } ref="input" />
            <button className="todo__edit__confirm" type="submit" dangerouslySetInnerHTML={{__html: confirmIcon}}></button>
          </form>
        </li>
      );
    }

    return (
      <li className="todo" onDoubleClick={ this.changeToEditMode }>
        <span className="todo__content">{ content }</span>
        <button className="todo__remove" onClick={ this.handleRemove } dangerouslySetInnerHTML={{__html: removeIcon}}></button>
      </li>
    );
  }
}
