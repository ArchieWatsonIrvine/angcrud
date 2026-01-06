import { App } from "./app";
import {Routes} from '@angular/router';

const routeConfig: Routes = [
    {
            path: '',
            title: 'CRUD Application',
            component: App,
            data: { breadcrumb: 'Home' }
    },
];
export const routes: Routes = routeConfig;