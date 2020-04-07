import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = []
    }

    render() {
        return (
            <div>
                HI!
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));