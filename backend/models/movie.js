const {Schema,model} = require("mongoose");
const genres = require("../utils/genres");
const movieSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    storyLine: {
      type: String,
      trim: true,
      required: true,
    },
    director: {
      type: Schema.Types.ObjectId,
      ref: "Actor",
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["public", "private"],
    },
    type: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
      enum: genres,
    },
    tags: {
      type: [String],
      required: true,
    },
    cast: [
      {
        actor: {
          type: Schema.Types.ObjectId,
          ref: "Actor",
        },
        roleAs: String,
        leadActor: Boolean,
      },
    ],
    writers: [
      {
        actor: { type: Schema.Types.ObjectId, ref: "Actor" },
        roleAs: String,
      },
    ],
    // poster: {
    //   type: Object,
    //   url: { type: String, required: true },
    //   public_id: { type: String, required: true },
    //   required: true,
    // },
    trailer: {
      type: Object,
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      required: true,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const movieModel=model('movies',movieSchema);
module.exports={
    movieModel
}
