import mongoose from 'mongoose';

const TemperatureSchema = new mongoose.Schema({
  createdAt: Date,
  value: Number,
});

TemperatureSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TemperatureSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Temperature', TemperatureSchema);
