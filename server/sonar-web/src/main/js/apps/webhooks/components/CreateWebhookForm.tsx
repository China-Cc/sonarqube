/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import Modal from '../../../components/controls/Modal';
import { Webhook } from '../../../app/types';
import { translate } from '../../../helpers/l10n';

interface Props {
  onClose: () => void;
  onDone: (data: { name: string; url: string }) => Promise<void>;
  webhook?: Webhook;
}

interface State {
  name: string;
  submitting: boolean;
  url: string;
}

export default class CreateWebhookForm extends React.PureComponent<Props, State> {
  mounted: boolean;

  constructor(props: Props) {
    super(props);
    const { webhook } = props;
    this.state = {
      name: webhook ? webhook.name : '',
      url: webhook ? webhook.url : '',
      submitting: false
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleCancelClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
    this.props.onClose();
  };

  handleNameChange = (event: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ name: event.currentTarget.value });

  handleUrlChange = (event: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({ url: event.currentTarget.value });

  handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ submitting: true });
    this.props
      .onDone({ name: this.state.name, url: this.state.url })
      .then(this.props.onClose, () => {
        if (this.mounted) {
          this.setState({ submitting: false });
        }
      });
  };

  render() {
    const { submitting } = this.state;
    const isUpdate = !!this.props.webhook;
    const modalHeader = isUpdate ? translate('webhooks.update') : translate('webhooks.create');

    return (
      <Modal contentLabel={modalHeader} onRequestClose={this.props.onClose}>
        <form onSubmit={this.handleFormSubmit}>
          <div className="modal-head">
            <h2>{modalHeader}</h2>
          </div>

          <div className="modal-body">
            <div className="modal-field">
              <label htmlFor="webhook-name">
                {translate('name')}
                <em className="mandatory">*</em>
              </label>
              <input
                autoFocus={true}
                disabled={submitting}
                id="webhook-name"
                onChange={this.handleNameChange}
                minLength={2}
                name="name"
                required={true}
                type="text"
                value={this.state.name}
              />
            </div>
            <div className="modal-field">
              <label htmlFor="webhook-url">
                {translate('webhooks.url')}
                <em className="mandatory">*</em>
              </label>
              <input
                disabled={submitting}
                id="webhook-url"
                onChange={this.handleUrlChange}
                name="url"
                required={true}
                type="text"
                value={this.state.url}
              />
              <div className="modal-field-description">{translate('webhooks.url.description')}</div>
            </div>
          </div>

          <footer className="modal-foot">
            {submitting && <i className="spinner spacer-right" />}
            <button disabled={submitting} type="submit">
              {isUpdate ? translate('update_verb') : translate('create')}
            </button>
            <button
              className="button-link"
              disabled={submitting}
              onClick={this.handleCancelClick}
              type="reset">
              {translate('cancel')}
            </button>
          </footer>
        </form>
      </Modal>
    );
  }
}
