import React from 'react'
import { Route, Navigate, Routes as Switch } from 'react-router-dom';
import Results from './Results';

const Routes = ({ searchTream }) => {
    return (
        <div className="p-4  " >
            <Switch>
                <Route exact path="/" element={<Navigate to="/search" replace />}   >
                </Route>
                {["/search", "/image", "/video", "/news"].map((path, index) =>
                    <Route path={path} element={<Results searchTream={searchTream} />} key={index} />
                )}
            </Switch>

        </div>
    )
}

export default Routes;