/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as theia from '@theia/plugin';
import { Disposable } from './types-impl';
import {
    AuthenticationExt,
    AuthenticationMain,
    PLUGIN_RPC_CONTEXT
} from '../common/plugin-api-rpc';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { Emitter, Event } from '@theia/core/lib/common';

export class AuthenticationExtImpl implements AuthenticationExt {
    private proxy: AuthenticationMain;
    private onDidChangeAuthenticationProvidersEmitter = new Emitter<theia.AuthenticationProvidersChangeEvent>();
    readonly onDidChangeAuthenticationProviders: Event<theia.AuthenticationProvidersChangeEvent> = this.onDidChangeAuthenticationProvidersEmitter.event;

    private onDidChangeSessionsEmitter = new Emitter<{ [providerId: string]: theia.AuthenticationSessionsChangeEvent }>();
    readonly onDidChangeSessions: Event<{ [providerId: string]: theia.AuthenticationSessionsChangeEvent }> = this.onDidChangeSessionsEmitter.event;

    constructor(rpc: RPCProtocol) {
        this.proxy = rpc.getProxy(PLUGIN_RPC_CONTEXT.AUTHENTICATION_MAIN);
    }

    registerAuthenticationProvider(provider: theia.AuthenticationProvider): Disposable {
        return Disposable.create(() => {
            this.proxy
        });
    }

    async getProviderIds(): Promise<ReadonlyArray<string>> {
        return [];
    }
    async hasSessions(providerId: string, scopes: string[]): Promise<boolean> {
        return true;
    }
    async logout(providerId: string, sessionId: string): Promise<void> {
    }
    getSession(providerId: string, scopes: string[], options: (theia.AuthenticationGetSessionOptions & { createIfNone: true }) | theia.AuthenticationGetSessionOptions): any {
    }
}
