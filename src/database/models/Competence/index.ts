// model/Post.js
import {Model, Q} from '@nozbe/watermelondb';
import {
  date,
  lazy,
  readonly,
  relation,
  text,
} from '@nozbe/watermelondb/decorators';

export default class Competence extends Model {
  static table = 'competence';

  static associations = {
    question: {type: 'has_many', foreignKey: 'competence_id'},
  } as const;

  @lazy
  questions = this.collections
    .get('question')
    .query(Q.where('competence_id', this.id));

  @text('title') title: any;
  @relation('guide', 'guide_id') guide: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
