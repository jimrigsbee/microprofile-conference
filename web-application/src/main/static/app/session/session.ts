//This is the same model our service emits
export class Session {
    id: string;
    abstract: string;
    code: string;
    title: string;
    type: string;
    viponly: boolean;
    speakers: string[];
    schedule: string;
    links: {[key: string]: string} = {};
}