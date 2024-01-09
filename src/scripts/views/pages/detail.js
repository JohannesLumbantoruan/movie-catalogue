import TheMovieDbSource from '../../data/themoviedb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { createLikeButtonTemplate, createMovieDetailTemplate } from '../templates/template-creator';

const Detail = {
    async render() {
        return `
           <div id="movie" class="movie"></div>
           <div id="likeButtonContainer"></div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWIthoutCombiner();
        const movie = await TheMovieDbSource.detailMovie(url.id);
        const moviesContainer = document.querySelector('#movie');
        moviesContainer.innerHTML = createMovieDetailTemplate(movie);

        // const likeButtonContainer = document.querySelector('#likeButtonContainer');
        // likeButtonContainer.innerHTML = createLikeButtonTemplate();

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            movie
        });
    }
};

export default Detail;