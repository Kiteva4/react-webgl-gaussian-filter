import * as React from 'react'
import GLInit from './GLInit'

export default class WebGL extends React.Component {

    componentDidMount(){
        GLInit();
    }

    render() {
        return <canvas id="webgl" style={{ height: '100%', border: '1px solid black' }}> </canvas>
    }
}