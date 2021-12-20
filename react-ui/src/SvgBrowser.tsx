import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import './SvgBrowser.css';
import svgLogo from './SVG_Logo.svg';
import {SvgList} from "./SvgList";

export type Config = {
    backendUrl : string
}

const config : Config = {
    backendUrl : "http://localhost:8080/api"
}

function SvgBrowser() {

    return (
        <div className="SvgBrowser">
            <header className="SvgBrowser-header">
                <img src={svgLogo} className="SvgBrowser-logo" alt="SVG Logo" />
                <h1>SVG Browser</h1>
            </header>
            <div className="SvgBrowser-main">
                <SvgList backendUrl={config.backendUrl}/>
            </div>
            <footer className="SvgBrowser-footer">
                <p>Tech playground for React, SVG, Spring Boot - witspirit</p>
            </footer>
        </div>
    );
}

export default SvgBrowser;