export class Upload {
    $key: number;
    file: File;
    url: string;

    constructor(file: File) {
        this.file = file;
    }
}
