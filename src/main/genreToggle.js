import RadioToggle from "../shared/radioToggle";
import './genreToggle.css'

const GenreToggle = () => (
    <div className="genre-toggle">
        <RadioToggle values={['All', 'Documentary', 'Comedy', 'Horror', 'Crime']} name="genres" initialValue="All"/>
    </div>
);

export default GenreToggle;