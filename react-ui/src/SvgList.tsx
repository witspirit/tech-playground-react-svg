import {Component} from "react";
import {Config} from "./SvgBrowser";
import {api, BackendApi, SvgDescriptor} from "./SvgBackendApi";
import {Button, ButtonGroup} from "@blueprintjs/core";
import './SvgList.css';

type SvgListState = {
    items: SvgDescriptor[]
}


export class SvgList extends Component<Config, SvgListState> {
    private api: BackendApi;

    constructor(config: Config) {
        super(config)
        this.api = api(config);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        console.debug("Refreshing SVG list...");
        this.api.list().then(result => this.setState({items: result}));
    }

    add = () => {
        console.debug("Add new SVG triggered...");
    }

    showDetails = (id: string) => {
        console.debug(`Show details for SVG with id ${id}`);
    }

    render() {
        return <div>
            <div className="SvgList-row">
                <div>Available SVGs</div>
                <div className="SvgList-spacer"/>
                <ButtonGroup>
                    <Button icon="refresh" onClick={this.refresh}/>
                    <Button icon="add" onClick={this.add}/>
                </ButtonGroup>
            </div>
            <ul>
                {this.state.items.map(svgDescriptor =>
                    <li key={svgDescriptor.id} onClick={() => this.showDetails(svgDescriptor.id)}>
                        {svgDescriptor.name} - {svgDescriptor.description}
                    </li>
                )}
            </ul>
        </div>
    }
}