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
    list: () => Promise<SvgDescriptor[]>,
    add: (addRequest: SvgUploadRequest) => Promise<void>,
    get: (id: string) => Promise<SvgDescriptor | undefined>,
    remove: (id: string) => Promise<void>
}

// Just provide it as an alternative to select
// eslint-disable-next-line
const dummyApi = (config: Config): BackendApi => {
    let items: SvgDescriptor[] = [
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

    const list = (): Promise<SvgDescriptor[]> => {
        return new Promise<SvgDescriptor[]>((resolve, reject) => {
            resolve(items);
        });
    };

    const add = (addRequest: SvgUploadRequest): Promise<void> => {
        items.push({
            id: '' + idCounter++,
            name: addRequest.name,
            description: addRequest.description
        });
        return new Promise<void>((resolve, reject) => {
            resolve()
        });
    };

    const get = (id: string): Promise<SvgDescriptor | undefined> => {
        return new Promise<SvgDescriptor>((resolve, reject) => {
            let svgDescriptor = items.find((i) => i.id === id);
            svgDescriptor ? resolve(svgDescriptor) : reject(`Could not find descriptor for ${id}`);
        });
    };

    const remove = (id: string): Promise<void> => {
        return new Promise<void>( (resolve, reject) => {
            items = items.filter(item => item.id !== id)
            resolve()
        });
    };

    return {
        list: list,
        add: add,
        get: get,
        remove: remove
    }
}

// The real implementation - potentially unused as well, depending on our config
// eslint-disable-next-line
const realApi = (config: Config): BackendApi => {
    const list = (): Promise<SvgDescriptor[]> => {
        return fetch(`${config.backendUrl}/svgs`)
            .then(response => response.json());
    };

    const add = (addRequest: SvgUploadRequest): Promise<void> => {
        return fetch(`${config.backendUrl}/svgs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addRequest)
        }).then(response => console.info(response.status));
    };

    const get = (id: string): Promise<SvgDescriptor | undefined> => {
        return fetch(`${config.backendUrl}/svgs/${id}`)
            .then(response => response.json());
    };

    const remove = (id: string): Promise<void> => {
        return fetch(`${config.backendUrl}/svgs/${id}`, {
            method: 'delete'
        }).then(response => console.info(response.status));
    };

    return {
        list: list,
        add: add,
        get: get,
        remove: remove
    }
}


export const api = realApi;
