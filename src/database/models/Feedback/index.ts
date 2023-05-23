// model/Post.js
import {Model, Q} from '@nozbe/watermelondb';
import {
  date,
  immutableRelation,
  lazy,
  readonly,
  text,
} from '@nozbe/watermelondb/decorators';

export default class Feedback extends Model {
  static table = 'feedback';

  static associations = {
    images: {type: 'has_many', foreignKey: 'feedback_id'},
  } as const;

  @lazy
  images = this.collections
    .get('image')
    .query(Q.where('external_id', Q.eq(this.id)));

  @text('value') value: any;
  @text('session_id') session_id?: any;
  @text('competence_id') competence_id?: any;
  @immutableRelation('competence', 'competence_id') competence: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
