import * as React from 'react';

import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import ActionsPanel from 'src/components/ActionsPanel';

import ThemeDecorator from '../../utilities/storybookDecorators';
import ConfirmationDialog from './ConfirmationDialog';

class Example extends React.Component {
  state = { open: false };

  toggle = (open: boolean) => this.setState({ open });

  decline = (e: React.MouseEvent<any>) => {
    this.toggle(false);
    action('declined')(e);
  }

  confirm = (e: React.MouseEvent<any>) => {
    this.toggle(false);
    action('confirmed')(e);
  }

  renderActions = () => {
    return (
      <React.Fragment>
        <ActionsPanel>
          <Button onClick={this.decline} data-qa-dialog-cancel>Cancel</Button>
          <Button onClick={this.confirm} data-qa-dialog-confirm>Continue</Button>
        </ActionsPanel>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={() => { this.setState({ open: true }); }}
          data-qa-dialog-button
        >
          Do something!
        </Button>
        <ConfirmationDialog
          open={this.state.open}
          onClose={() => { this.setState({ open: false }); }}
          title="Are you sure you wanna?"
          actions={this.renderActions}
        >
          <div>
            stuff stuff stuff
          </div>
        </ConfirmationDialog>
      </React.Fragment>
    );
  }
}
storiesOf('Dialogs', module)
  .addDecorator(ThemeDecorator)
  .add('Simple Confirmation', () => (<Example />));
