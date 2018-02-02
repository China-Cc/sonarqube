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
import { getJSON, post, postJSON } from '../helpers/request';
import throwGlobalError from '../app/utils/throwGlobalError';
import { Webhook } from '../app/types';

export function createWebhook(data: {
  organization: string | undefined;
  project?: string;
  name: string;
  url: string;
}): Promise<{ webhook: Webhook }> {
  return postJSON('/api/webhooks/create', data).catch(throwGlobalError);
}

export function deleteWebhook(data: { key: string }): Promise<void | Response> {
  return post('/api/webhooks/delete', data).catch(throwGlobalError);
}

export function searchWebhooks(data: {
  organization: string | undefined;
  project?: string;
}): Promise<{ webhooks: Webhook[] }> {
  return getJSON('/api/webhooks/search', data).catch(throwGlobalError);
}

export function updateWebhook(data: {
  key: string;
  name: string;
  url: string;
}): Promise<void | Response> {
  return post('/api/webhooks/update', data).catch(throwGlobalError);
}
