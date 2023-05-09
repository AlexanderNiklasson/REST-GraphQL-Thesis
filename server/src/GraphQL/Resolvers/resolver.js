const Movie = require('../../Database/models/movie').Movies;
const User = require('../../Database/models/user').Users;
const Review = require('../../Database/models/review').Reviews
const resolvers = {
    Query: {
        getMovies: async (parent, args) => {
            return Movie.find({}).populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            });
        },

        getMovie: async (parent, args) => {
            return Movie.findById(args.id).populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            });
        },
        getUsers: async (parent, args) => {
            return User.find({}).populate({
                path: 'reviews',
                populate: {
                    path: 'movie',
                    model: 'Movie'
                }
            });

        },
        getUser: async (parent, args) => {
            return User.findById(args.id).populate({
                path: 'reviews',
            });
        },
        getReviews: async (parent, args) => {
            return await Review.find({}).populate('user').populate('movie');
        },
        getReview: async (parent, args) => {
            return await Review.findById(args.id);
        }
    },
    Mutation: {
        addMovie: (parent, args) => {
            let movie = new Movie({
                name: args.name,
                producer: args.producer,
                rating: args.rating,
            });
            return movie.save();
        },
        updateMovie: (parent, args) => {
            if (!args.id) return;
            return Movie.findOneAndUpdate({
                _id: args.id
            }, {
                $set: {
                    name: args.name,
                    producer: args.producer,
                    rating: args.rating,
                }
            }, {
                new: true
            }, (err, Movie) => {
                if (err) {
                    console.log('Something went wrong when updating the movie');
                }
            });
        },
        deleteMovie: async (parent, { id }, { User, Movie, Review }) => {
            try {
                const removed_movie = await Movie.findOneAndUpdate(id);
                if (!removed_movie) {
                    return {
                        succsess: false, 
                        error: 'No such movie exists',
                    }
                }

                const review_ids = removed_movie.reviews;
                User.updateMany({ reviews: { $in: review_ids } }, { $pull: { reviews: { $in: review_ids } } });

                await Review.deleteMany({ _id: { $in: review_ids } });

                return {
                    seccsess: true,
                    message: ''
                }

            } catch (error) {

            }
        },
        addUser: (parent, args) => {
            let user = new User({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email
            });
            return user.save();
        },
        updateUser: (parentt, args) => {
            if (!args.id) {
                console.error('CCould not find user, status code 404');
                return;
            } 
            const { firstName, lastName, email} = args.body;
            return User.findOneAndUpdate({ _id: args.id }, { $set: { firstName, lastName, email } }, { new : true }, (err, User) => {
                if (err) {
                    console.error('Error ocurred whilst trying to update the user:', err)
                }
            });
        },
        deleteUser: async (parent, { id }, { User, Movie, Review }) => {
           try {
            const removed_user = await User.findByIdAndDelete(id);
            if (!removed_user) {
                return {
                    succsess: false,
                    error: 'No such user exists'
                };
            }

            const review_ids = removed_user.reviews;

            Movie.updateMany({ reviews: { $in: review_ids } }, { $pull: { reviews: { $in: review_ids } } });

            await Review.deleteMany({ _id: { $in : review_ids } });

            return {
                succsess: true,
                message: 'User and associated reviews removed succsessfully',
            }

            
           } catch (error) {
            console.error('Error deleting user: ', error);
            return {
                succsess: false,
                error: ' Internal server error',
            }
           }
            
        },
        addReview: (parent, args) => {
            let review = new Review({
                title: args.title,
                description: args.description,
                body: args.body,
                user: args.userID,
                movie: args.movieID

            })
            console.log(review)
            return review
                .save()
                .then(result => {
                    let arr = [];
                    arr.push(User.findByIdAndUpdate(result.user.toString()));
                    User.findById(result.user.toString())
                        .then(result => {
                            result.reviews.push(review);
                            result.save();
                        })

                    Movie.findByIdAndUpdate(result.movie.toString())
                        .then(result => {
                            result.reviews.push(review)
                            result.save();
                        })
                    arr.push(Movie.findById(result.movie.toString()));
                    return review
                })


        }, 
        updateReview: (parent, args) => {
            if (!args.id) {
                console.error('No such review. status code 404');
                return;
            }
            const { title, description, body } = args.body;
            Review.findOneAndUpdate({ _id: args.id}, { $set: { title, description, body } }, { new : true}, (err, Review) => {
                if (err) {
                    console.error('Error ocurred whilst trying to update the review:', err)
                }
            });
        },
        
    }
}

module.exports = {
    resolvers
};