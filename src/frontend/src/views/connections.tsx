import React, { Fragment, useEffect } from 'react';
import { View } from '@/library/types';
import { PaginatedConnections, state } from '@/library/api';
import ConnectProviderModal from '@/components/connect-provider-modal';
import { Reference } from '@/library/context';
import DisconnectProviderButton from '@/components/disconnect-provider-button';
import CarrierBadge from '@/components/carrier-badge';

interface ConnectionsView extends View {
  connections?: PaginatedConnections;
}

const Connections: React.FC<ConnectionsView> = ({ connections }) => {
  useEffect(() => { if (connections === undefined) state.fetchConnections(); }, []);

  return (
    <Fragment>

      <header className="px-2 pt-1 pb-6">
        <span className="subtitle is-4">Carrier Connections</span>
        <ConnectProviderModal className="button is-success is-pulled-right">
          <span>Connect a Carrier</span>
        </ConnectProviderModal>
      </header>

      {(connections?.count == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>No carriers have been connected yet.</p>
          <p>Use the <strong>Connect a Carrier</strong> button above to add a new connection</p>
        </div>

      </div>}

      <div className="table-container">
        <table className="table is-fullwidth">

          <tbody className="connections-table">
            {connections?.results.map((connection) => (

              <tr key={connection.id}>
                <td className="carrier">
                  <CarrierBadge name={connection.carrier_name as string} className="box has-text-weight-bold" />
                </td>
                <td className="mode is-vcentered">
                  {connection.test ? <span className="tag is-warning is-centered">Test</span> : <></>}
                </td>
                <td className="details">
                  <div className="content is-small">
                    <ul>
                      <li>carrier id: <span className="tag is-info is-light" title="carrier nickname">{connection.carrier_id}</span></li>
                    </ul>
                  </div>
                </td>
                <td className="action is-vcentered">
                  <div className="buttons is-centered">
                    <ConnectProviderModal className="button" connection={connection}>
                      <span className="icon is-small">
                        <i className="fas fa-pen"></i>
                      </span>
                    </ConnectProviderModal>
                    <DisconnectProviderButton connection={connection}>
                      <span className="icon is-small">
                        <i className="fas fa-trash"></i>
                      </span>
                    </DisconnectProviderButton>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>

        </table>
      </div>

    </Fragment>
  );
}

export default Connections;