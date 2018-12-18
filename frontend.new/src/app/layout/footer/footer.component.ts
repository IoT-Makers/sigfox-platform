import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../core/settings/settings.service';
import {AppSettingApi} from "../../shared/sdk/services/custom";

@Component({
    selector: '[app-footer]',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    appVersion: any;

    constructor(public settings: SettingsService,
                private appSettingApi: AppSettingApi) {
    }

    ngOnInit() {
        this.getAppVersion();
    }

    getAppVersion(): void {
        this.appSettingApi.getVersion().subscribe((result: any) => {
            this.appVersion = result;
        });
    }
}
