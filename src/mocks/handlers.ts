import { rest } from 'msw'

const baseFetchUrl = "http://localhost:4000"
const movie = {
    id: 123,
    title: "movie title",
    tagline: "movie tagline",
    vote_average: 0,
    vote_count: 1,
    release_date: "movie release_date",
    poster_path: "movie poster_path",
    overview: "movie overview",
    budget: 2,
    revenue: 3,
    runtime: 4,
    genres: ["Action"],
};

export const handlers = [
    rest.get(`${baseFetchUrl}/movies`, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json({
            data: [movie]
        })
    )),
    rest.get(`${baseFetchUrl}/movies/123`, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json(movie)
    )),
];