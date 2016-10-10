import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div class="container">
        <div>
            <router-outlet></router-outlet>
        </div>
</div>  `
})

export class AppComponent {}