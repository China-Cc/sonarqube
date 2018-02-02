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
import ActionsDropdown, {
  ActionsDropdownItem,
  ActionsDropdownDivider
} from '../../../components/controls/ActionsDropdown';
import CreateWebhookForm from './CreateWebhookForm';
import { translate } from '../../../helpers/l10n';
import { Webhook } from '../../../app/types';

interface Props {
  refreshWebhooks: () => Promise<void>;
  webhook: Webhook;
}

interface State {
  deleting: boolean;
  updating: boolean;
}

export default class WebhookActions extends React.PureComponent<Props, State> {
  mounted: boolean;
  state: State = { deleting: false, updating: false };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleDeleteClick = () => this.setState({ deleting: true });

  handleDeletingStop = () => this.setState({ deleting: false });

  handleUpdateClick = () => this.setState({ updating: true });

  handleUpdatingStop = () => this.setState({ updating: false });

  render() {
    return (
      <td className="thin nowrap text-right">
        <ActionsDropdown className="ig-spacer-left">
          <ActionsDropdownItem className="js-webhook-update" onClick={this.handleUpdateClick}>
            {translate('update_verb')}
          </ActionsDropdownItem>
          <ActionsDropdownDivider />
          <ActionsDropdownItem
            className="js-webhook-delete"
            destructive={true}
            onClick={this.handleDeleteClick}>
            {translate('delete')}
          </ActionsDropdownItem>
        </ActionsDropdown>

        {this.state.updating && (
          <CreateWebhookForm
            onClose={this.handleUpdatingStop}
            onDone={this.props.refreshWebhooks}
            webhook={this.props.webhook}
          />
        )}

        {/*this.state.deleting && (
          <DeleteBranchModal
            branch={branch}
            component={component}
            onClose={this.handleDeletingStop}
            onDelete={this.handleChange}
          />
        )*/}
      </td>
    );
  }
}
