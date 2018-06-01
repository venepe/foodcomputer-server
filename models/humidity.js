import mongoose from 'mongoose';

const HumiditySchema = new mongoose.Schema({
  createdAt: Date,
  value: Number,
});

HumiditySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

HumiditySchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Humidity', HumiditySchema);
