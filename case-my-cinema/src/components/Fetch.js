import {
    useState,
    useEffect
} from "react";

export default function Fetch() {

    const [movies,
        setMovies
    ] = useState({});

    const [searchQuery,
        setSearchQuery
    ] = useState({});

    const [input,
        setInput
    ] = useState({});

    function stringify(data) {
        return JSON.stringify(data);
    }

    // TODO use this for later?
    // function parse(data) {
    //     return JSON.parse(data);
    // }

    useEffect(() => {
        fetch('https://api.tvmaze.com/search/shows?q=' + searchQuery)
        .then(resp => resp.json())
        .then(data => {
            if (data.length === 0) {
                throw "Sorry, no movies found :(";
            }
            setMovies(data)})
        .catch(err => console.log(err))
    }, [searchQuery])

    useEffect(() => {
        // DO something with the stuff you fetched...
        console.log("your list of movies:", movies);
    }, [movies]);

    function handleQuery(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({...values, [name]: value}))
    }

    function alterQuery(event) {
        event.preventDefault();
        const stringifiedQuery = stringify(input.movie);
        setSearchQuery(stringifiedQuery);
    }

    return (
        <main>
            <h1>Fetch me some movies! (To console)</h1>
            <form onSubmit={alterQuery}>
                    <label>Enter your movie:
                        <input 
                        type="text" 
                        name="movie"
                        value={input.movieValue}
                        onChange={handleQuery}
                        />
                    </label>
                <input type="submit" />
            </form>
        </main>
    )
}