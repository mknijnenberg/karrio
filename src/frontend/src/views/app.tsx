import React, { Fragment } from 'react';
import { Router } from "@reach/router";
import Shipments from '@/views/shipments';
import Providers from '@/views/providers';
import Settings from '@/views/settings';
import ExpandedSidebar from '@/components/sidebars/expanded-sidebar';
import Navbar from '@/components/navbar/navbar';
import '@/assets/scss/main.scss';
import '@/assets/custom.scss';
import { CarrierSettings, Shipment } from '@purplship/purplship/dist';
import { state, UserInfo } from '@/library/api';

const App: React.FC = () => {
    const user: UserInfo = state.user;
    const token: string = state.token;
    const shipments: Shipment[] = state.shipments;
    const carriers: CarrierSettings[] = state.carriers;
    
    return (
        <Fragment>
            <ExpandedSidebar user={user} />

            <div className="plex-wrapper">
                <div className="wrapper-inner">
                    <Navbar />

                    <div className="dashboard-content">
                        <Router>
                            <Shipments shipments={shipments} path="/" />
                            <Providers carriers={carriers} path="providers" />
                            <Settings token={token} user={user} path="settings" />
                        </Router>
                    </div>

                </div>
            </div>
        </Fragment>
    );
}

export default App;