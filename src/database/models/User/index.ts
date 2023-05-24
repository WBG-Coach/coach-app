// model/Post.js
import {Model, Q} from '@nozbe/watermelondb';
import {
  date,
  immutableRelation,
  lazy,
  readonly,
  text,
} from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'user';

  static associations = {
    sessions: {type: 'has_many', foreignKey: 'session_id'},
  } as const;

  @lazy
  sessions = this.collections
    .get('session')
    .query(Q.where('coach_id', Q.eq(this.id)));

  @text('name') name: any;
  @text('image_id') image_id: any;
  @immutableRelation('image', 'image_id') image: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
