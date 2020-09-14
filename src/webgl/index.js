import * as React from 'react'
import GLInit from './GLInit'
import GLRender from './GLRender'

export default class WebGL extends React.Component {

    componentDidMount() {
        GLInit();
    }

    update = () => {
        // GLRender();
    }

    render() {
        return <canvas id="webgl" style={{ height: '100%', border: '1px solid black' }}> </canvas>
    }
}