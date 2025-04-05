import { Schema, model, Document } from "mongoose";

interface IEmoji extends Document {
  emojiText: string;
  emojiDescription: string;
  emojiAuthor: Schema.Types.ObjectId;
  createdAt: Date;
}

const EmojiSchema = new Schema(
  {
    emojiText: { type: String, required: true },
    emojiDescription: { type: String, required: true },
    emojiAuthor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true }, // Ensure virtuals are included in JSON output
    toObject: { virtuals: true }, // Ensure virtuals are included in Object output
  }
);
//work added by me//

EmojiSchema.virtual("wordCount").get(function (this: IEmoji) {
  return this.emojiDescription.split(" ").length;
});

const Emoji = model<IEmoji>("Emoji", EmojiSchema);

export default Emoji;
