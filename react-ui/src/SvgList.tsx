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
        this.api.add({
            name: "dummyName",
            description: "dummyDescription"
        })
            .then(() => console.info(`Created new dummy SVG`))
            .then(this.refresh);
    }

    showDetails = (id: string) => {
        console.debug(`Show details for SVG with id ${id}`);
        this.api.get(id).then(descriptor => console.info(`Details for SVG : ${JSON.stringify(descriptor)}`))
    }

    remove = (id: string) => {
        console.debug(`Removing SVG with id ${id}`);
        this.api.remove(id)
            .then(() => console.info(`Removed SVG with id ${id}`))
            .then(this.refresh)
        ;
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
                    <li key={svgDescriptor.id} >
                        <div className="SvgList-row">
                            <div onClick={() => this.showDetails(svgDescriptor.id)}>{svgDescriptor.name} - {svgDescriptor.description}</div>
                            <div className="SvgList-spacer"/>
                            <Button icon="delete" onClick={() => this.remove(svgDescriptor.id)}/>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    }
}