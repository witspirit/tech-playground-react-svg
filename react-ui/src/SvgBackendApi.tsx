import {Config} from "./SvgBrowser";

let idCounter = 100;

export type SvgDescriptor = {
    id: string,
    name: string,
    description?: string
}

export type SvgUploadRequest = {
    name: string,
    description?: string
}

export type BackendApi = {
    add: (addRequest: SvgUploadRequest) => void,
    list: () => Promise<SvgDescriptor[]>
}

export const api = (config: Config) : BackendApi => {
    let items : SvgDescriptor[] = [
        {
            id: "fake1",
            name: "Fake One",
            description: "Dummy Injected Data 1"
        },
        {
            id: "fake2",
            name: "Fake Two"
        },
        {
            id: "fake3",
            name: "Fake Three",
            description: "Dummy Injected Data 3"
        }
    ];

    const list = () : Promise<SvgDescriptor[]> => {
        return new Promise<SvgDescriptor[]>((resolve, reject) => {
            resolve(items);
        });
    };

    const add = (addRequest : SvgUploadRequest) : void => {
        items.push({
            id: ''+idCounter++,
            name: addRequest.name,
            description: addRequest.description
        });
    }

    return {
        list: list,
        add: add
    }
}
