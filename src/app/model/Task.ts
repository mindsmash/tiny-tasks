
export class Task {
    priority: number;
    title: string;
    schedule: string;
    status: boolean;

    constructor(title:string) {
        this.title = title;
    }
}