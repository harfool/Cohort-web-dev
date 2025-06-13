const App = ()=>{
    return React.createElement(
        "div",
        {className : "Core-react"},
        React.createElement(
            "h1",
            {},
            "i'm use react through CDN"
        )
    )
}

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App))
