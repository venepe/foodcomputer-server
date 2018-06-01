import mongoose from 'mongoose';

const SnapshotSchema = new mongoose.Schema({
  uri: String,
  createdAt: Date,
});

SnapshotSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

SnapshotSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});


export default mongoose.model('Snapshot', SnapshotSchema);
