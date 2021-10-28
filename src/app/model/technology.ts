import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export class Technology {

    id!: number;
    name!: string;
    color!: string;

    constructor (id: number, name: string, color: string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}
