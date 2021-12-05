import {Component} from "react";
import {Config} from "./SvgBrowser";
import {api, BackendApi, SvgDescriptor} from "./SvgBackendApi";

type SvgListState = {
    items: SvgDescriptor[]
}


export class SvgList extends Component<Config, SvgListState> {
    private api: BackendApi;

    constructor(config : Config) {
        super(config)
        this.api = api(config);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.api.list().then(result => this.setState({ items: result}));
    }

    render() {
        return <ul>
            {this.state.items.map(svgDescriptor =>
                <li key={svgDescriptor.id}>
                    {svgDescriptor.name} - {svgDescriptor.description}
                </li>
            )}
        </ul>
    }
}