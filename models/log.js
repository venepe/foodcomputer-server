import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  name: String,
  createdAt: Date,
  status: String,
  attribute: String,
  value: String,
  comment: String,
});

LogSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

LogSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Log', LogSchema);
